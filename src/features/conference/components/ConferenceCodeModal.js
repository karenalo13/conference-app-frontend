import React from "react"

import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"
import { Grid } from "@material-ui/core"
import Typography from "@bit/totalsoft_oss.react-mui.typography"

const ConferenceCodeModal=({code})=>{
const {t}=useTranslation()
const imgSrc="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+code
    return (
    
    <Grid container>
        <Grid item>
            <img src={imgSrc} alt={imgSrc}></img>

        </Grid>
        <Grid item> 
            <Typography variant={"subtitle1"}>{t('General.Congrulation',{code})}</Typography>
        </Grid>
    </Grid>)
    
    //t('General.Congrulation',{code})

    
}


ConferenceCodeModal.propTypes = {
    code: PropTypes.string
  }

export default ConferenceCodeModal