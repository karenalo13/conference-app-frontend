import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import RoomIcon from '@material-ui/icons/Room';

const ConferenceSubtitle = props => {
  const { speaker, location } = props
  const { t } = useTranslation()

  return (
    <Grid container item lg={12}>
      <Grid item lg={1}>
        <PermIdentityIcon></PermIdentityIcon>
      </Grid>
      <Grid item lg={11}>
          <Typography>{t("ConferenceFilters.Speaker")}</Typography>
          <Typography>{speaker?.name}</Typography>
      </Grid>
      <Grid item lg={1}>
        <RoomIcon></RoomIcon>
      </Grid>
      <Grid item lg={11}>
          <Typography>{t("ConferenceFilters.Location")}</Typography>
          <Typography>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceSubtitle.propTypes = {
  speaker: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default ConferenceSubtitle
