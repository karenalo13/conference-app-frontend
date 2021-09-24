import {React} from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Button from '@bit/totalsoft_oss.react-mui.button'
import Typography from '@bit/totalsoft_oss.react-mui.typography'


const MyConferenceContent = props => {
  const { conference } = props
  const {  startDate, endDate, type, category } = conference
  

  const { t } = useTranslation()


  const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
  const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`${type?.name}, ${category?.name}`}</Typography>
      </Grid>
      <Grid container direction='row-reverse' justifyContent='flex-start' alignItems='flex-end'>
        <Grid item>
          <Button size='sm' color='danger'>{t("MyConferences.Delete")}</Button>
          <Button size='sm' color='info'>{t("MyConferences.Edit")}</Button>


        </Grid>
      </Grid>
    </Grid>
  )
}

MyConferenceContent.propTypes = {
  conference: PropTypes.object.isRequired
}

export default MyConferenceContent
