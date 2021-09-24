import React from 'react'
import  PropTypes  from 'prop-types'
import { useTranslation } from 'react-i18next'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { Face, Info, LocationOn } from '@material-ui/icons'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import MyConferenceInfo from './MyConferenceInfo'
import MyConferenceLocation from './MyConferenceLocation'
import MyConferenceSpeaker from './MyConferenceSpeaker'


const MyConference =(props)=>{
const {t}=useTranslation()
    const {types,categories,countries,counties,cities}=props
return (
    
    <>
    
    <IconCard icon={Info}
    title={t("Conference.Info")}
    content={<MyConferenceInfo types={types} categories={categories}/>}>

    </IconCard>
    <IconCard icon={LocationOn}
    title={t("Conference.Location")}
    content={<MyConferenceLocation counties={counties} countries={countries} cities={cities}/>}>

    </IconCard>
    <IconCard icon={Face}
    content={<MyConferenceSpeaker />}
    title={<CardTitle title={t("Conference.Speakers")} actions={[<AddButton key='AddSpeaker' title={t("General.Buttons.AddSpeaker")}></AddButton>]}></CardTitle>}>

    </IconCard>
    
    </>

    
)
}

MyConference.propTypes={
    types:PropTypes.array,
    categories:PropTypes.array,
    countries:PropTypes.array,
    counties:PropTypes.array,
    cities:PropTypes.array
}
export default MyConference