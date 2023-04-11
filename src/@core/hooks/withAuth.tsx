import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { authConfig } from '../../configs/auth'
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const withAuth = (Component: React.ComponentType<any>) => {
  const Auth = () => {
    const [data, setData] = useState()
    const {isAuthenticated} = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
        toast.error("Please login before proceeding.")
      } else {
        const userData = window.localStorage.getItem(authConfig.storageTokenKeyName)
        setData(userData)
      }
    }, [])

    return Component
  }

  return Auth
}

export default withAuth
