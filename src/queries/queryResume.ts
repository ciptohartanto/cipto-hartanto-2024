import { gql } from '@apollo/client'

const QUERY_RESUME = gql`
  query Resume($id: ID!) {
    resume(where: { id: $id }) {
      sectionResume {
        metaDescription
        resumeFile {
          url
        }
        content {
          ... on SubSection {
            title
            content {
              html
            }
          }
          ... on SubsectionExperienceItem {
            title
            experienceItem {
              title
              position
              location
              tags
              links {
                html
              }
              date
              content {
                html
              }
            }
          }
        }
      }
    }
  }
`

export default QUERY_RESUME
