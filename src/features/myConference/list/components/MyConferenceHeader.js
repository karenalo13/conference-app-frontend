import Typography from '@bit/totalsoft_oss.react-mui.typography'
import { Grid ,makeStyles} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({ title: { ...theme.header.title, width: '100%' } }))


const MyConference = props => {
  const { title ,actions} = props
  const classes = useStyles()
  const { t } = useTranslation()
  
  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item container xs={6} sm={9} lg={9} justifyContent='flex-start'>
        <Typography variant='subtitle1' className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item container justifyContent='flex-end' xs={3} sm={3} lg={3} spacing={1}>
            {actions}
      </Grid>
    </Grid>
  )
}
MyConference.propTypes = {
  title: PropTypes.string,
  actions:PropTypes.node
}

export default MyConference
