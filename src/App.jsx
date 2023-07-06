import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import EventsPage from './pages/EventsPage'
import ProfilePage from './pages/ProfilePage'
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  font-family: Montserrat, sans-serif;
  width: 100%;
  height: 100%; 
`


const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<MapPage/>} />
        <Route path='events' element={<EventsPage/>} />
        <Route path='profile' element={<ProfilePage/>} />
      </Routes>
    </>
      
    
  )
}

export default App;
