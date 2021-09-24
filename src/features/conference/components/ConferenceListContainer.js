import {React,useState,useCallback} from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilters from './ConferenceFilters'
import conferences from 'utils/mooks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { generateDefaultFilters } from 'utils/functions'


function ConferenceListContainer(){
    const {data ,loading}={data:conferences,loading:false}
    const [filters, setFilters] = useState(generateDefaultFilters())

    const handleApplyFilters = useCallback((value) => {
      // we will do more stuff here
      setFilters(value)
  }, [])
    if (loading){ return (<LoadingFakeText lines={10}/>)}
    return(
    <Grid container>
       <Grid item xs={12}>
       <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
           <ConferenceList conferences={data}/>
       </Grid>
    </Grid>
    )
}

export default ConferenceListContainer