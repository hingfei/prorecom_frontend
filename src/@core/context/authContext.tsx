import { createContext, ReactNode, useContext, useState } from 'react'
import Spinner from '../components/spinner'
import { useLoginMutation } from '../../graphql/api'
import { onCompleted, onError } from '../utils/response'
import { useRouter } from "next/router";
import { authConfig } from "../../configs/auth";

type AuthContextType = {
  isAuthenticated: boolean
  handleLogin: (userName: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLogin: async () => {},
  logout: async () => {}
})

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const [login, { loading }] = useLoginMutation({
    onCompleted: data => {
      onCompleted(data.login, () => {
        if (data.login.success) {
          window.localStorage.setItem(authConfig.storageTokenKeyName, JSON.stringify(data.login.user))
          setIsAuthenticated(true)
          router.push('/projects')
        }
      })
    },
    onError: error => {
      onError(error, undefined)
    }
  })

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

  const logout =  () => {
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/')
  }

  return <AuthContext.Provider value={{ isAuthenticated, handleLogin, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
