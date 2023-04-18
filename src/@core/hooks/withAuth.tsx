import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import toast from 'react-hot-toast'
import Spinner from '../components/spinner'

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const Auth = (props: P) => {
    const [isLoading, setIsLoading] = useState(true)
    const { isAuthenticated, isInitialized, fetchMe } = useAuth()
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        if (isInitialized) {
          await fetchMe()
          setIsLoading(false)
        } else {
          if (!isAuthenticated) {
            router.push('/401')
            toast.error('Please login before proceeding.')
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
