import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import toast from 'react-hot-toast'
import Spinner from '../components/spinner'

const withAuth = <P extends object>(Component: React.ComponentType<P>, allowedUserTypes: string[]) => {
  const Auth = (props: P) => {
    const [isLoading, setIsLoading] = useState(true)
    const { isAuthenticated, isInitialized, fetchMe } = useAuth()
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        if (isInitialized) {
          await fetchMe()
          const data = window.localStorage.getItem('userData')
          let userData
          if (data) {
            userData = JSON.parse(data)
          }
          if (data && !allowedUserTypes.includes(userData.userType)) {
            router.push('/403')
            toast.error('Unauthorized access.')
          } else {
            setIsLoading(false)
          }
        } else {
          const data = window.localStorage.getItem('userData')
          let userData
          if (data) {
            userData = JSON.parse(data)
          }
          if (!isAuthenticated) {
            router.push('/401')
            toast.error('Please login before proceeding.')
          } else if (data && !allowedUserTypes.includes(userData.userType)) {
            router.push('/403')
            toast.error('Unauthorized access.')
          } else {
            setIsLoading(false)
          }
        }
      }

      checkAuth()
    }, [])

    return isLoading ? <Spinner /> : <Component {...props} />
  }

  return Auth
}

export default withAuth
