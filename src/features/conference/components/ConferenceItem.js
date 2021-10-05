import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import React from 'react'
import PropTypes from 'prop-types'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'

const ConferenceItem = props => {
  const { conference, onAttend ,onWithdraw} = props
  const { name, location, speakers } = conference
  const speaker = speakers.find(item => item.isMainSpeaker)
  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<ConferenceSubtitle speaker={speaker} location={location} />}
      content={<ConferenceContent conference={conference} onWithdraw={onWithdraw} onAttend={onAttend} />}
    ></RegularCard>
  )
}
ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onAttend: PropTypes.func,
  onWithdraw:PropTypes.func
}
export default ConferenceItem
