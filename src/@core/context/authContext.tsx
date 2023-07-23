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

// ** AuthContextType interface defining the structure of the AuthContext
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

// ** Create AuthContext with initial values
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

// ** AuthProvider component to wrap the children with AuthContext
export const AuthProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)
  const [notif, setNotif] = useState<GetUserNotificationsQuery['getUserNotifications']>([])


  const router = useRouter()

  // Function to reset the auth store
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

  // GraphQL Queries & Mutations
  const [fetchMe, { loading: fetchMeLoading }] = useMeLazyQuery({
    onCompleted: async data => {
      setIsAuthenticated(true)
      setIsInitialized(false)
      if (!window.localStorage.getItem('userData')) {
        await window.localStorage.setItem('userData', JSON.stringify(data?.me))
      }
    },
    onError: error => {
      router.push('/401') // Redirect to unauthorized page on error
      onError(error, undefined)
      resetStore()
    }
  })

  // Query to get user notifications
  const [fetchNotif] = useGetUserNotificationsLazyQuery({
    variables: {
      unreadOnly: false
    },
    onCompleted: data => {
      setNotif(data?.getUserNotifications)
    },
    fetchPolicy: 'cache-and-network'
  })

  // Mutation for user login
  const [login, { loading }] = useLoginMutation({
    onCompleted: data => {
      onCompleted(data.login, () => {
        if (data.login.success) {
          // Set user data and token to local storage and cookies on successful login
          window.localStorage.setItem(authConfig.storageTokenKeyName, data?.login?.token || '')
          window.localStorage.setItem('userData', JSON.stringify(data?.login?.user))
          setCookies(authConfig.storageTokenKeyName, `Bearer ${data?.login?.token}`)
          setIsAuthenticated(true)
          setIsInitialized(false)
          // Redirect users to different routes based on their userType
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

  // useEffect to check if user is authenticated on app load
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      // Check if token is stored in local storage, if yes, fetchMe() to authenticate the user
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      storedToken ? await fetchMe() : resetStore()
    }
    initAuth()
  }, [])

  // useEffect to fetch user notifications and set up polling
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

  // Function to handle user login
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

  // Function to handle user logout
  const logout = () => {
    // Call resetStore() to clear user data and redirect to home page
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

// Hook to use the AuthContext values in functional components
export const useAuth = () => useContext(AuthContext)
