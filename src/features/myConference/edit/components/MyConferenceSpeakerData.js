import React from 'react'
import PropTypes from 'prop-types'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import tableStyles from 'assets/jss/components/tableStyle'
import { Checkbox, makeStyles } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import {  CheckBox } from '@material-ui/icons'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'

import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(tableStyles)

const MyConferenceSpeakerData = props => {
  const { speaker, dispatch, index } = props
  const classes = useStyles()
  const {t}=useTranslation()
  return (
    <Tr>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <Checkbox color='secondary' />
      </Td>
      <Td className={classes.tableContent}><DeleteButton title={t("General.Buttons.DeleteSpeaker")} size={'small'}></DeleteButton></Td>
    </Tr>
  )
}

MyConferenceSpeakerData.propTypes = {
  speaker: PropTypes.object,
  dispatch: PropTypes.func,
  index: PropTypes.number
}

export default MyConferenceSpeakerData
