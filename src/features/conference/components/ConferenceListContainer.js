import React from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilters from './ConferenceFilters'
import conferences from 'utils/mooks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'

function ConferenceListContainer(){
    const {data ,loading}={data:conferences,loading:false}

    if (loading){ return (<LoadingFakeText lines={10}/>)}
    return(
    <Grid container>
       <Grid item xs={12}>
           <ConferenceFilters></ConferenceFilters>
           <ConferenceList conferences={data}/>
       </Grid>
    </Grid>
    )
}

export default ConferenceListContainer