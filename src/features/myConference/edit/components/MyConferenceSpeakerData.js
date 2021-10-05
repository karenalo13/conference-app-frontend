import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Tr, Td } from 'react-super-responsive-table'
import tableStyles from 'assets/jss/components/tableStyle'
import { Checkbox, makeStyles } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'

import { useTranslation } from 'react-i18next'
import { onCheckBoxChange, onTextBoxChange } from 'utils/propertyChangeAdapters'
const useStyles = makeStyles(tableStyles)

const MyConferenceSpeakerData = props => {
  const { speaker, dispatch } = props
  const { id, name, nationality, isMainSpeaker, rating } = speaker
  const classes = useStyles()
  const { t } = useTranslation()
  const handleDispatch = type => value => dispatch({ type, payload: { id, [type]: value } })
  const handleDispatchName = type => value => dispatch({ type, payload: { id, name: value } })
  const handleDelete = useCallback(() => dispatch({ type: 'deleteSpeaker', payload: speaker.id }), [dispatch, speaker.id])
  const handleGeneralDispatch = (type, prop) => value => dispatch({ type, payload: { id, [prop]: value } })

  return (
    <Tr>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth onChange={onTextBoxChange(handleDispatchName('speakerName'))} value={name}></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField
          fullWidth
          value={nationality}
          onChange={onTextBoxChange(handleGeneralDispatch('nationality', 'nationality'))}
        ></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField isNumeric value={rating} onChange={handleDispatch('rating')} fullWidth></CustomTextField>
      </Td>
      <Td className={classes.tableContent}>
        <Checkbox
          color='secondary'
          checked={isMainSpeaker}
          onChange={onCheckBoxChange(handleGeneralDispatch('isMainSpeaker', 'isMainSpeaker'))}
        />
      </Td>
      <Td className={classes.tableContent}>
        <DeleteButton title={t('General.Buttons.DeleteSpeaker')} size={'small'} onClick={handleDelete}></DeleteButton>
      </Td>
    </Tr>
  )
}

MyConferenceSpeakerData.propTypes = {
  speaker: PropTypes.object,
  dispatch: PropTypes.func
}

export default MyConferenceSpeakerData
