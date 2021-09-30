import { gql } from '@apollo/client'
import conferenceFragment from './fragments'


export const CONFERENCE_LIST_QUERY = gql`
  query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $email: String!) {
    conferenceList(pager: $pager, filters: $filters) {
      values {
        ...conference
        type {
          id
          name
        }
        category {
          id
          name
        }
        location {
          id
          county {
            id
            name
          }
          country {
            id
            name
          }
          city {
            id
            name
          }
        }
        speakers {
          id
          name
          isMainSpeaker
        }
        status(userEmail: $email) {
          id
          name
        }
      }

      pagination(pager:$pager , filters:$filters){
      totalCount
      currentPage {
        page
        pageSize
      }
      }
    }
  }

  ${conferenceFragment.conference}
`
