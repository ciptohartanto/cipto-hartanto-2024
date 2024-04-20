import { gql } from '@apollo/client'

const QUERY_HOME = gql`
  query Home($id: ID!, $orderBy: WritingOrderByInput!) {
    home(where: { id: $id }) {
      metaDescription
      sectionAbout {
        title
        listOfIngredients {
          title
          content {
            html
          }
        }
      }
      sectionHero {
        subtitle
        caption
      }
      sectionProject {
        title
        listOfProjects {
          content
          projectUrl
          date
          tags
          thumbnail {
            url(transformation: { document: { output: { format: jpg } } })
          }
          title
        }
      }
      sectionWritings {
        title
      }
    }
    writings(orderBy: $orderBy) {
      slug
      title
      tags
      publishTime
      updatedAt
    }
  }
`

export default QUERY_HOME
