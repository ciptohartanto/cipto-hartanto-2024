import { ApolloQueryResult, DocumentNode } from '@apollo/client'

import client from '@/apollo/client'

type ClientQueryProps = {
  query: DocumentNode
  variableObject: object
}

export default async function clientQuery<T>({
  query,
  variableObject,
}: ClientQueryProps): Promise<T> {
  const { data }: ApolloQueryResult<T> = await client.query({
    query,
    variables: { ...variableObject },
  })

  return data
}
