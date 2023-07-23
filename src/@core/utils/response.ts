import { ApolloError } from '@apollo/client'
import toast from 'react-hot-toast'
import { Maybe } from 'src/graphql/api'

/**
 * Function to handle the 'onCompleted' event after a successful Apollo GraphQL operation.
 *
 * @param {Maybe<any>} response - The response object from the Apollo GraphQL operation.
 * @param {(response: Maybe<any>) => void} callback - Optional callback function to be executed after handling the response.
 */
export const onCompleted = (response?: Maybe<any>, callback?: (response: Maybe<any>) => void) => {
  // If the response indicates success, execute the optional callback function (if provided) and display a success toast.
  if (response?.success) {
    !!callback && callback(response)
    toast.success(response?.message || 'Success', { duration: 3000 })
  }
  // If the response indicates failure, display an error toast.
  if (!response?.success) {
    toast.error(response?.message || 'Error', { duration: 3000 })
  }
}

/**
 * Function to handle errors during Apollo GraphQL operations.
 *
 * @param {ApolloError} error - The ApolloError object representing the GraphQL error.
 * @param {() => void} callback - Optional callback function to be executed after handling the error.
 * @param {(_1: any, _2: any) => void} setError - Optional function to set form errors in case of validation errors.
 */
export const onError = (error: ApolloError, callback?: () => void, setError?: (_1: any, _2: any) => void) => {
  // Execute the optional callback function (if provided).
  !!callback && callback()

  // Handle validation errors (if any) and set corresponding form errors using the 'setError' function.
  if (!!setError && error?.graphQLErrors[0]?.extensions?.validation) {
    const validation = (error?.graphQLErrors[0]?.extensions?.validation as object) || {}
    Object.entries(validation).forEach(([key, value]: [any, any]) => {
      setError(key, { message: value?.toString() || 'Invalid' })
    })

    return
  }

  // If there are no validation errors, display a general error message toast.
  const errorMessage = process.env.NEXT_PUBLIC_APP_ENV === 'local' ? error?.message : 'Something went wrong'
  toast.error(errorMessage)
}
