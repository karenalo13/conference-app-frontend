import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { useTranslation } from 'react-i18next'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
const MyConferenceInfo = props => {
  const { types, categories } = props
  const { t } = useTranslation()
  return (
    <>
      <Grid container>
        <Grid container item lg={9} spacing={9} fullWidth={true}>
          <Grid item lg={4} sm={6} xs={12}>
            <CustomTextField fullWidth label={t('Conference.Name')}></CustomTextField>
          </Grid>
        </Grid>
        <Grid item lg={12} container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <DateTime label={t('Conference.StartDate')} showTime={true} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <DateTime label={t('Conference.EndDate')} showTime={true} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
                <Autocomplete label={t("Conference.Type")}
                fullWidth
                isClearable
                options={types}
                >

                </Autocomplete>
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
                <Autocomplete label={t("Conference.Category")}
                fullWidth
                isClearable
                options={categories}
                >

                </Autocomplete>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

MyConferenceInfo.propTypes = {
  types: PropTypes.array,
  categories: PropTypes.array
}

export default MyConferenceInfo
