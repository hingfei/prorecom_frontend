import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import toast from 'react-hot-toast'
import Spinner from '../components/spinner'

/**
 * HOC (Higher-Order Component) that provides authentication and authorization functionality.
 *
 * @template P - Generic type for props of the wrapped component.
 * @param {React.ComponentType<P>} Component - The component to be wrapped with authentication and authorization logic.
 * @param {string[]} allowedUserTypes - An array of allowed user types that have access to the wrapped component.
 * @returns {React.FC<P>} - The wrapped component with authentication and authorization checks.
 */
const withAuth = <P extends object>(Component: React.ComponentType<P>, allowedUserTypes: string[]) => {
  const Auth = (props: P) => {
    // ** State to track loading state while checking authentication and authorization
    const [isLoading, setIsLoading] = useState(true)

    // ** Get authentication-related data and methods from the AuthContext
    const { isAuthenticated, isInitialized, fetchMe } = useAuth()

    // ** Access the Next.js router to handle redirections
    const router = useRouter()

    useEffect(() => {
      /**
       * Function to check authentication and authorization.
       * If user is not authenticated or not authorized, the appropriate redirection occurs.
       */
      const checkAuth = async () => {
        if (isInitialized) {
          // ** Fetch user data if the authentication state is initialized
          await fetchMe()
          const data = window.localStorage.getItem('userData')
          let userData
          if (data) {
            userData = JSON.parse(data)
          }
          if (data && !allowedUserTypes.includes(userData.userType)) {
            // ** Redirect to 403 page if user is authenticated but not authorized
            router.push('/403')
            toast.error('Unauthorized access.')
          } else {
            // ** Set loading state to false if user is authenticated and authorized
            setIsLoading(false)
          }
        } else {
          const data = window.localStorage.getItem('userData')
          let userData
          if (data) {
            userData = JSON.parse(data)
          }
          if (!isAuthenticated) {
            // ** Redirect to 401 page if user is not authenticated
            router.push('/401')
            toast.error('Please login before proceeding.')
          } else if (data && !allowedUserTypes.includes(userData.userType)) {
            // ** Redirect to 403 page if user is authenticated but not authorized
            router.push('/403')
            toast.error('Unauthorized access.')
          } else {
            // ** Set loading state to false if user is authenticated and authorized
            setIsLoading(false)
          }
        }
      }

      // ** Call the authentication and authorization check function on component mount
      checkAuth()
    }, [])

    return isLoading ? <Spinner /> : <Component {...props} />
  }

  return Auth
}

export default withAuth
