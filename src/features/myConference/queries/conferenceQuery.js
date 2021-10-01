import { gql } from '@apollo/client'
import conferenceFragment from 'features/conference/graphql/queries/fragments'
import CommonFragments from 'features/common/fragments/fragments'

export const CONFERENCEID_LIST_QUERY = gql`
  query conferenceById($id: ID!) {
    conference(id: $id) {
      ...conference
      location {
        ...location
        country {
          ...country
        }
        county {
          ...county
        }
        city {
          ...city
        }
      }
      type {
        ...type
      }
      category {
        ...category
      }
      speakers {
        ...speaker
      }
    }
  }
  ${conferenceFragment.conference}
  ${conferenceFragment.speaker}
  ${conferenceFragment.location}
  ${CommonFragments.category}
  ${CommonFragments.county}
  ${CommonFragments.country}
  ${CommonFragments.city}
  ${CommonFragments.type}
`
