import { React, useState, useCallback, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import MyConferenceFilters from './MyConferenceFilters'
import conferences from 'utils/mooks/attendeeList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { generateDefaultFilters } from 'utils/functions'
import MyConferenceHeader from './MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { BrowserRouter } from 'react-router-dom'
import { useHistory } from 'react-router'
function MyConferenceListContainer() {
  const { data, loading } = { data: conferences, loading: false }
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [, setHeader] = useHeader()
  const { t } = useTranslation()
  const history= useHistory()
  useEffect(() => {
    //did mount

    return () => {
      //will unmount
      setHeader(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const HandleAddClick=useCallback(()=>{
history.push('myconferenceListContainer/new')
  },[history])

  useEffect(()=>{

    setHeader(<MyConferenceHeader
        title={t('NavBar.MyConferenceListContainer')}
        actions={<AddButton onClick={HandleAddClick} key='addButton' title={t("General.Buttons.AddConference")}
         />}
    />)
        
  },[setHeader, t])

  const handleApplyFilters = useCallback(value => {
    // we will do more stuff here
    setFilters(value)
  }, [])
  if (loading) {
    return <LoadingFakeText lines={10} />
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <MyConferenceList conferences={data} />
      </Grid>
    </Grid>
  )
}

export default MyConferenceListContainer
