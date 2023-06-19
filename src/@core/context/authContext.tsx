import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Spinner from '../components/spinner'
import {
  GetUserNotificationsQuery,
  useGetUserNotificationsLazyQuery,
  useLoginMutation,
  useMeLazyQuery
} from '../../graphql/api'
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
  notif: any
}

export const AuthContext = createContext<AuthContextType>({
  fetchMeLoading: true,
  isAuthenticated: false,
  isInitialized: false,
  handleLogin: async () => {},
  logout: async () => {},
  fetchMe: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  resetStore: () => {},
  notif: []
})

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)
  const [notif, setNotif] = useState<GetUserNotificationsQuery['getUserNotifications']>([])


  const router = useRouter()

  const resetStore = () => {
    setIsInitialized(true)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    removeCookies(authConfig.storageTokenKeyName)
    setIsAuthenticated(false)
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }
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

  const [fetchNotif] = useGetUserNotificationsLazyQuery({
    variables: {
      unreadOnly: false
    },
    onCompleted: data => {
      setNotif(data?.getUserNotifications)
    },
    fetchPolicy: 'cache-and-network'
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotif()
      const interval = setInterval(() => {
        fetchNotif()
      }, 60000)

      setPollingInterval(interval)
    } else {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [isAuthenticated])

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
      value={{ isInitialized, fetchMeLoading, fetchMe, isAuthenticated, handleLogin, logout, resetStore, notif }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
