import React, { useState, useCallback } from 'react'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import Search from '@material-ui/icons/Search'

import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'

import Button from '@bit/totalsoft_oss.react-mui.button'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { generateDefaultFilters } from 'utils/functions'
function ConferenceFilters(props) {
  const { t } = useTranslation()
  const { filters, onApplyFilters } = props
  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleResetClick = useCallback(() => {
      const defaultFilters = generateDefaultFilters()
      setStartDate(defaultFilters.startDate)
      setEndDate(defaultFilters.endDate)
  }, [])
  return (
    <>
      <IconCard
        icon={Search}
        maxWidth='100%'
        content={
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Grid item container spacing={3}>
              <Grid item>
                <DateTime  label={t('ConferenceFilters.StartDate')} value={startDate} onChange={setStartDate} />
              </Grid>
              <Grid item>
                <DateTime  label={t('ConferenceFilters.EndDate')} value={endDate} onChange={setEndDate} />
              </Grid>
            </Grid>
          </Grid>
        }
      ></IconCard>
      <Grid container item direction='row' justifyContent='flex-end' alignItems='flex-end'>
        <Grid item>
          <Button color='theme'   onClick={handleResetClick}>{t('ConferenceFilters.ButtonText1')} </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleApplyClick} color='theme'>{t('ConferenceFilters.ButtonText2')} </Button>
        </Grid>
      </Grid>
    </>
  )
}

ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
