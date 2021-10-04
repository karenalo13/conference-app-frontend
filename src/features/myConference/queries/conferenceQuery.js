import { gql } from '@apollo/client'
import conferenceFragment from 'features/conference/graphql/queries/fragments'
import CommonFragments from 'features/common/fragments/fragments'

export const CONFERENCEID_LIST_QUERY = gql`
  query conferenceById($id: ID!, $isNew:Boolean!) {
    conference(id: $id) @skip(if:$isNew) {
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

   
      typeList {
        id
        name
        code
      }
      categoryList {
        id
        name
        code
      }
      countryList {
        id
        name
        code
      }
      countyList {
        id
        name
        code
      }
      cityList {
        id
        name
        code
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
