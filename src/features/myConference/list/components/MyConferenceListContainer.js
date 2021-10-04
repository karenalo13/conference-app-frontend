import { React, useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import MyConferenceFilters from './MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import MyConferenceHeader from './MyConferenceHeader'
import { useFooter, useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/graphql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/emailHook'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'

function MyConferenceListContainer() {
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [, setHeader] = useHeader()
  const { t } = useTranslation()
  const history = useHistory()
  const [ pager, setPager ] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const [email] = useEmail()
  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters: { ...filters, organizerEmail: email }, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })
  const [, setFooter] = useFooter()
  useEffect(() => {
    //did mount

    return () => {
      //will unmount
      setHeader(null)
      setFooter(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = useCallback(
    page => {
      setPager(state => ({ ...state, page }))
    },
    []
  )

  const HandleAddClick = useCallback(() => {
    history.push('myconferenceListContainer/new')
  }, [history])
  const handleRowsPerPageChange = useCallback(pageSize => setPager(state => ({ ...state, pageSize: parseInt(pageSize) })), [])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferenceListContainer')}
        actions={<AddButton onClick={HandleAddClick} key='addButton' title={t('General.Buttons.AddConference')} />}
      />
    )
  }, [HandleAddClick, setHeader, t])
  useEffect(
    () =>
      setFooter(
        <Pagination
          totalCount={pager.totalCount}
          page={pager.page}
          pageSize={pager.pageSize}
          rowsPerPageOptions={[3, 6, 9, 12, 24, 100]}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPageChange={handlePageChange}
          onRefresh={refetch}
        ></Pagination>
      ),
    [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter]
  )

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
        <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <MyConferenceList conferences={data?.conferenceList?.values} />
      </Grid>
    </Grid>
  )
}

export default MyConferenceListContainer
