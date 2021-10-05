import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'

const ConferenceList = props => {
  const { conferences, onAttend,onWithdraw } = props

  return (
    <Grid container spacing={2}>
      {conferences.map(conference => {
        return (
          <Grid item xs={12} lg={4} key={conference?.id}>
            <ConferenceItem conference={conference} onAttend={onAttend} onWithdraw={onWithdraw}/>
          </Grid>
        )
      })}
    </Grid>
  )
}

ConferenceList.propTypes = {
  conferences: PropTypes.array.isRequired,
  onAttend: PropTypes.func,
  onWithdraw:PropTypes.func
}

export default ConferenceList
