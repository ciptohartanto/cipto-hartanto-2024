import { gql } from '@apollo/client'

const QUERY_WRITINGS = gql`
  query Writings($orderBy: WritingOrderByInput!) {
    writings(orderBy: $orderBy) {
      slug
      articleContent
      publishTime
    }
  }
`

export default QUERY_WRITINGS
