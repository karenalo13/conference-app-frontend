import { gql } from '@apollo/client'
import conferenceFragment from 'features/conference/graphql/queries/fragments'
import CommonFragments from 'features/common/fragments/fragments'

export const DICTIONARIES_QUERY = gql`
  query getDictionaries {
    typeList {
      ...type
    }
    categoryList {
      ...category
    }
    countryList {
      ...country
    }
    countyList {
      ...county
    }
    cityList {
      ...city
    }
  }

 
  ${CommonFragments.category}
  ${CommonFragments.county}
  ${CommonFragments.country}
  ${CommonFragments.city}
  ${CommonFragments.type}
`
