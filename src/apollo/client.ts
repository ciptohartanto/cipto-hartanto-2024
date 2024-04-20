import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: process.env.HYGRAPH_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export default client
