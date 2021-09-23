import React from 'react'
// import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import VideoCallIcon from '@material-ui/icons/VideoCall';
const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <VideoCallIcon />, text: 'NavBar.ConferenceListContainer', path: '/conferenceListContainer', name: 'ConferenceListContainer' },
]

export default menuItems
