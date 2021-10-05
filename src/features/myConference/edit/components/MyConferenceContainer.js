import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import MyConference from 'features/myConference/edit/components/MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCEID_LIST_QUERY } from 'features/myConference/queries/conferenceQuery'
import { useMutation } from '@apollo/client'
import { UPDATE_CONFERENCE } from 'features/myConference/queries/mutations/UpdateConference'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useHistory } from 'react-router-dom'
import { useError } from 'hooks/errorHandling'

import { useEmail } from 'hooks/emailHook'
const MyConferenceContainer = () => {
  const match = useRouteMatch()
  const addToast = useToast()
  const history = useHistory()
  const showError = useError()
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const [email] = useEmail()
  useEffect(
    () => () => {
      setHeader(null)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  const { data: dataAll, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCEID_LIST_QUERY, {
    variables: { id: conferenceId, isNew },
    onCompleted: result => dataAll?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })
 
  const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: result => {
      addToast(t('MyConference.SavingSucceeded'), 'success')
      if (isNew) {
        history.push(`/myconferenceListContainer/${result?.saveConference?.id}`)
      }
      result?.saveConference && dispatch({ type: 'resetConference', payload: result?.saveConference })
    },
    onError: showError
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deletedSpeakers, type, location, category, speakers } = conference
    const { city, county, country, ...locationData } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      organizerEmail: email,
      deletedSpeakers,
      type,
      category,
      location: {
        ...locationData,
        cityId: parseInt(city?.id),
        countyId: parseInt(county?.id),
        countryId: parseInt(country?.id)
      },
      speakers
    }

    updateConference({ variables: { input } })
  }, [conference, email, updateConference])
  // const { data, loading } = {
  //   loading: false,
  //   data: {
  //     typeList: types,
  //     categoryList: categories,
  //     countryList: countries,
  //     countyList: counties,
  //     cityList: cities
  //   }
  // }


  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name}  actions={<SaveButton title={t('General.Buttons.Save')} onClick={handleSave} />} />)
  }, [conference.name, handleSave, setHeader, t])

  if (loadingConference || saving) return <LoadingFakeText lines={10}></LoadingFakeText>

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={dataAll?.typeList}
      categories={dataAll?.categoryList}
      countries={dataAll?.countryList}
      counties={dataAll?.countyList}
      cities={dataAll?.cityList}
      
    />
  )
}

export default MyConferenceContainer
