import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Spinner from '../components/spinner'
import { useLoginMutation, useMeLazyQuery } from '../../graphql/api'
import { onCompleted, onError } from '../utils/response'
import { useRouter } from 'next/router'
import { authConfig } from '../../configs/auth'
import { removeCookies, setCookies } from 'cookies-next'

type AuthContextType = {
  fetchMeLoading: boolean
  isInitialized: boolean
  isAuthenticated: boolean
  handleLogin: (userName: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
  setIsInitialized: (value: boolean) => void
  resetStore: () => void
}

export const AuthContext = createContext<AuthContextType>({
  fetchMeLoading: true,
  isAuthenticated: false,
  isInitialized: false,
  handleLogin: async () => {},
  logout: async () => {},
  fetchMe: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  resetStore: () => {}
})

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const resetStore = () => {
    setIsInitialized(true)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    removeCookies(authConfig.storageTokenKeyName)
    setIsAuthenticated(false)
  }

  const [fetchMe, { loading: fetchMeLoading }] = useMeLazyQuery({
    onCompleted: async data => {
      setIsAuthenticated(true)
      setIsInitialized(false)
      if (!window.localStorage.getItem('userData')) {
        await window.localStorage.setItem('userData', JSON.stringify(data?.me))
      }
    },
    onError: error => {
      router.push('/401')
      onError(error, undefined)
      resetStore()
    }
  })

  const [login, { loading }] = useLoginMutation({
    onCompleted: data => {
      onCompleted(data.login, () => {
        if (data.login.success) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, data?.login?.token || '')
          window.localStorage.setItem('userData', JSON.stringify(data?.login?.user))
          setCookies(authConfig.storageTokenKeyName, `Bearer ${data?.login?.token}`)
          setIsAuthenticated(true)
          setIsInitialized(false)
          if (data?.login?.user?.userType === 'job_seekers') {
            router.push('/projects')
          } else {
            router.push('/company-dashboard')
          }
        }
      })
    },
    onError: error => {
      onError(error, undefined)
    }
  })

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      storedToken ? await fetchMe() : resetStore()
    }
    initAuth()
  }, [])

  const handleLogin = (userName: string, password: string) => {
    login({
      variables: {
        userName: userName,
        password: password
      }
    })
    if (loading) {
      return <Spinner />
    }
  }

  const logout = () => {
    resetStore()
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ isInitialized, fetchMeLoading, fetchMe, isAuthenticated, handleLogin, logout, resetStore }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
