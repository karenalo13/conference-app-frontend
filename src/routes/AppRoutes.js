/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Settings from 'features/settings/Settings'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import HelloWorld from 'features/helloWorld/HelloWorld'
import Welcome from 'features/welcome/Welcome'
import { useEmail } from 'hooks/emailHook'
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer'
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer'
import MyConferenceContainer from 'features/myConference/edit/components/MyConferenceContainer'
export default function AppRoutes() {
  const [email] = useEmail()

  if (!email) {
    return (
      <Switch>
        <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
        <Redirect  to='/welcome' />
      </Switch>
    )
  }

  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path='/helloWorld' component={HelloWorld} />
      <CustomRoute isPrivate={false} exact path='/conferenceListContainer' component={ConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconferenceListContainer' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconferenceListContainer/:id(new)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/myconferenceListContainer/:id(\d+)' component={MyConferenceContainer} />
      
      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
}
