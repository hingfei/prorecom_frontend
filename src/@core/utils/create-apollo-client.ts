import { ApolloClient, ApolloLink, HttpLink, HttpOptions } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import authConfig from 'src/configs/auth'
import { NextPageContext } from 'next/types'
import { withApollo as createWithApollo } from 'next-apollo'
import { createUploadLink } from 'apollo-upload-client'

const isServer = () => typeof window === 'undefined'

export type CreateApolloClientOptions = {
  connectToDevTools?: boolean
  https: HttpOptions
  memoryCache?: {
    [key: string]: any
  }
}

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

  const uploadLink = createUploadLink(options?.https) as unknown as ApolloLink

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink, httpLink]),
    cache: new InMemoryCache(options.memoryCache).restore(initialState)
  })
}

export const client = createApolloClient({
  https: {
    uri: isServer() ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT : '/api/graphql'
  }
})

export const createClient = (ctx: NextPageContext | undefined) => {
  console.log('ctx?.req?.headers?.cookie', ctx?.req?.headers?.cookie)

  return createApolloClient({
    https: {
      uri: '/api/graphql',
      headers: {
        cookie: isServer() ? ctx?.req?.headers?.cookie : undefined
      }
    }
  })
}
export const withApollo = createWithApollo(createClient)
