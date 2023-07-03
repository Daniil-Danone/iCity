import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import EventsPage from './pages/EventsPage'
import StartPage from './pages/StartPage'




const App = () => {
  return (
      <Routes>
        <Route path='' element={<StartPage/>} />
        <Route path='map' element={<MapPage/>} />
        <Route path='events' element={<EventsPage/>} />
      </Routes>
    
  )
}

export default App;
