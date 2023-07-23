import { ApolloClient, ApolloLink, HttpLink, HttpOptions } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { NextPageContext } from 'next/types'
import { withApollo as createWithApollo } from 'next-apollo'
import { createUploadLink } from 'apollo-upload-client'
import { authConfig } from "../../configs/auth";

const isServer = () => typeof window === 'undefined'

export type CreateApolloClientOptions = {
  connectToDevTools?: boolean
  https: HttpOptions
  memoryCache?: {
    [key: string]: any
  }
}

/**
 * Function to create an Apollo Client for GraphQL queries and mutations.
 *
 * @param {CreateApolloClientOptions} options - Options to configure the Apollo Client.
 * @param {any} initialState - Initial state of the Apollo Client cache.
 *
 * @returns {ApolloClient} The configured Apollo Client instance.
 */
export const createApolloClient = (options: CreateApolloClientOptions, initialState: any = {}) => {
  // ===== HTTP LINK
  const httpLink = new HttpLink(options?.https)

  // ===== AUTH LINK
  const authLink = setContext(async (_, { headers }) => {
    const token = isServer() ? '' : window.localStorage.getItem(authConfig.storageTokenKeyName)
    const authprops = token ? { Authorization: `Bearer ${token}` } : {}

    return {
      headers: {
        ...headers,
        ...authprops
      }
    }
  })

  // ===== ERROR LINK
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: `, message, ' Location: ', locations, 'Path: ', path)
      )
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  // ===== UPLOAD LINK
  const uploadLink = createUploadLink(options?.https) as unknown as ApolloLink

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink, httpLink]),
    cache: new InMemoryCache(options.memoryCache).restore(initialState)
  })
}

// Create the default client instance for client-side rendering (CSR)
export const client = createApolloClient({
  https: {
    uri: isServer() ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT : '/api/graphql'
  }
})

/**
 * Function to create an Apollo Client with options for server-side rendering (SSR).
 *
 * @param {NextPageContext | undefined} ctx - Next.js page context containing information about the current request.
 *
 * @returns {ApolloClient} The configured Apollo Client instance with SSR options.
 */
export const createClient = (ctx: NextPageContext | undefined) => {
  // console.log('ctx?.req?.headers?.cookie', ctx?.req?.headers?.cookie)

  return createApolloClient({
    https: {
      uri: '/api/graphql',
      headers: {
        cookie: isServer() ? ctx?.req?.headers?.cookie : undefined
      }
    }
  })
}

/**
 * Function to wrap Next.js pages with the Apollo Client to enable server-side rendering (SSR) support.
 *
 * @param {NextPageContext | undefined} ctx - Next.js page context containing information about the current request.
 *
 * @returns {any} A Higher-Order Component (HOC) that wraps the Next.js pages with the Apollo Client.
 */
export const withApollo = createWithApollo(createClient)
