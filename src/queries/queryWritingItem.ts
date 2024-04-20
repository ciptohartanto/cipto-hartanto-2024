import { gql } from '@apollo/client'

const QUERY_WRITING_ITEM = gql`
  query WritingArticleItem($slug: String!, $orderBy: WritingOrderByInput!) {
    writing(where: { slug: $slug }) {
      metaDescription
      tags
      articleContent
      publishTime
      title
      slug
    }
    writings(orderBy: $orderBy) {
      slug
      title
    }
  }
`

export default QUERY_WRITING_ITEM
