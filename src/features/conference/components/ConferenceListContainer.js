import { React, useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilters from './ConferenceFilters'
//import conferences from 'utils/mooks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from '../graphql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/emailHook'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE from '../graphql/mutation/AttendeeConference'
import { useError } from 'hooks/errorHandling'
import { DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core'
import ConferenceCodeModal from './ConferenceCodeModal'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'

function ConferenceListContainer() {
  const showError = useError()
  const [email] = useEmail()
  const addToast=useToast()
  const [code, setCode] = useState()
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(generateDefaultFilters())
  const {t}=useTranslation()

  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const [, setFooter] = useFooter()
  const handleRowsPerPageChange = useCallback(pageSize => setPager(state => ({ ...state, pageSize: parseInt(pageSize) })), [])

  const handlePageChange = useCallback(page => {
    setPager(state => ({ ...state, page }))
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setFooter(null), [])

  const [attend] = useMutation(ATTEND_CONFERENCE, {
    onError: showError,
    onCompleted: result => {
      if (result?.attend) {
        setCode(result?.attend)
        setOpen(true)
        addToast(t('SuccessfullyAttended',"success"))
      }
    }
  })


  const handleClose=useCallback(()=>{
    setOpen(false)
    setCode(emptyString)
    refetch()
  },[refetch])

  const handleAttend = useCallback(
    conferenceId => () => {
      attend({
        variables: {input:{
          conferenceId,
          attendeeEmail: email}
        }
      })
    },
    [attend, email]
  )
  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 9, 12, 24, 100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />
    )
  }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

  const handleApplyFilters = useCallback(value => {
    // we will do more stuff here
    setFilters(value)
  }, [])
  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} />
        <DialogDisplay open={open} onClose={handleClose} id='showQRCode' title={t('General.Congrulation')} content={<ConferenceCodeModal code={code} />}></DialogDisplay>
      </Grid>
    </Grid>
  )
}

export default ConferenceListContainer
