import React from 'react'
import PropTypes from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core'
import tableStyle from 'assets/jss/components/tableStyle'
import { useTranslation } from 'react-i18next';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import MyConferenceSpeakerData from './MyConferenceSpeakerData';

const useStyles = makeStyles(tableStyle)

const MyConferenceSpeaker = props => {
  const { speakers,dispatch } = props
  
  const { t } = useTranslation();
  const classes = useStyles()
  return (
    <>
      <Grid className={classes.enableScrollX}>
        <Table>
          <Thead>
            <Tr>
              <Th className={classes.tableHeader}>{t('Speaker.Name')}</Th>
              <Th className={classes.tableHeader}>{t('Speaker.Nationality')}</Th>
              <Th className={classes.tableHeader}>{t('Speaker.Rating')}</Th>
              <Th className={classes.tableHeader}>{t('Speaker.MainSpeaker')}</Th>
              <Th className={classes.tableHeader}></Th>
            </Tr>
          </Thead>
          <Tbody>
              {speakers.map((speaker)=>(<MyConferenceSpeakerData dispatch={dispatch}  speaker={speaker} key={speaker?.id} />))}
          </Tbody>
        </Table>
      </Grid>
    </>
  )
}

MyConferenceSpeaker.propTypes = {
  speakers: PropTypes.array,
  dispatch:PropTypes.func
}
MyConferenceSpeaker.defaultProps = {
  speakers: [{},{}]
}

export default MyConferenceSpeaker
