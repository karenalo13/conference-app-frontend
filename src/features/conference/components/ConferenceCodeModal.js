import React from 'react'

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'ramda'

const ConferenceCodeModal = ({ code, suggestedConferences,onAttend }) => {
  const { t } = useTranslation()
  const imgSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + code
  return (
    <>
      <Grid container>
        <Grid item>
          <img src={imgSrc} alt={imgSrc}></img>
        </Grid>
        <Grid item>
          <Typography variant={'subtitle1'}>{t('General.Congrulation', { code })}</Typography>
        </Grid>
      </Grid>
      {!isEmpty(suggestedConferences) && (
        <Grid container>
          <Grid item lg={12}>
            <Typography>{t('General.SuggestedConferences')}</Typography>
          </Grid>
          {suggestedConferences?.map(conference => (
            <Grid item key={conference.id}>
              <ConferenceItem conference={conference} onAttend={onAttend}></ConferenceItem>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )

  //t('General.Congrulation',{code})
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.string,
  suggestedConferences: PropTypes.array,
  onAttend:PropTypes.func
}

export default ConferenceCodeModal
