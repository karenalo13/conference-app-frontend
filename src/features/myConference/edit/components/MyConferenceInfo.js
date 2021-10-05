import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { useTranslation } from 'react-i18next'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'
const MyConferenceInfo = props => {
  const { types, categories, conference, dispatch } = props
  const { name, startDate, endDate, type, category } = conference
  const { t } = useTranslation()

  // const handleOnChange = useCallback(
  //   value => {
  //     dispatch({ type: 'name', payload: value })
  //   },
  //   [dispatch]
  // )

  const handleChange = type => value => dispatch({ type: type, payload: value })

  return (
    <>
      <Grid container>
        <Grid container item lg={9} spacing={9}>
          <Grid item lg={4} sm={6} xs={12}>
            <CustomTextField
              fullWidth
              label={t('Conference.Name')}
              onChange={onTextBoxChange(handleChange('name'))}
              value={name}
            ></CustomTextField>
          </Grid>
        </Grid>
        <Grid item lg={12} container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <DateTime label={t('Conference.StartDate')} views={['date','hours','minutes']} value={startDate} onChange={handleChange('startDate')} showTime={true} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <DateTime label={t('Conference.EndDate')} value={endDate} onChange={handleChange('endDate')} showTime={true} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Autocomplete
              label={t('Conference.Type')}
              value={type}
              onChange={handleChange('type')}
              fullWidth
              isClearable
              options={types}
            ></Autocomplete>
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <Autocomplete
              label={t('Conference.Category')}
              value={category}
              onChange={handleChange('category')}
              fullWidth
              isClearable
              options={categories}
            ></Autocomplete>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

MyConferenceInfo.propTypes = {
  types: PropTypes.array,
  categories: PropTypes.array,
  conference: PropTypes.object,
  dispatch: PropTypes.func
}

export default MyConferenceInfo
