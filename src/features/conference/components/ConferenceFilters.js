import React, { useState, useCallback } from 'react'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import Search from '@material-ui/icons/Search'

import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Button from '@bit/totalsoft_oss.react-mui.button'
import { useTranslation } from 'react-i18next'
import { theme } from '@bit/totalsoft_oss.react-mui.themes.blue-theme'

function ConferenceFilters() {
  const { t } = useTranslation()
  return (
    <>
      <IconCard
        icon={Search}
        maxWidth='100%'
        content={
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Grid item container spacing={3}>
              <Grid item>
                <DateTime disableFuture label={t("ConferenceFilters.StartDate")} openTo='year' views={['year', 'month', 'day']} />
              </Grid>
              <Grid item>
                <DateTime disableFuture label={t("ConferenceFilters.EndDate")} openTo='year' views={['year', 'month', 'day']} />
              </Grid>
            </Grid>
            
          </Grid>
        }
      ></IconCard>
      <Grid container item direction='row' justifyContent='flex-end' alignItems='flex-end'>
              <Grid item>
                <Button color='theme'>{t('ConferenceFilters.ButtonText1')}</Button>
              </Grid>
              <Grid item>
                <Button color='theme'>{t('ConferenceFilters.ButtonText2')}</Button>
              </Grid>
            </Grid>
    </>
  )
}

export default ConferenceFilters
