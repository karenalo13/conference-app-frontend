import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import MyConference from 'features/myConference/edit/components/MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { conference as mockConference } from 'utils/mooks/myConference'
import { categories, cities, counties, countries, types } from 'utils/mooks/conferenceDictionaries'

const MyConferenceContainer = () => {
  const match = useRouteMatch()

  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  useEffect(
    () => () => {
      setHeader(null)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])
  useEffect(() => {
    if (!isNew) {
      dispatch({type:'resetConference', payload :mockConference})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { data, loading } = {
    loading: false,
    data: {
      typeList: types,
      categoryList: categories,
      countryList: countries,
      countyList: counties,
      cityList: cities
    }
  }

  if (loading) return <LoadingFakeText lines={10}></LoadingFakeText>

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
