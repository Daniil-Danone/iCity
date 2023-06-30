import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import EventsPage from './pages/EventsPage'
import StartPage from './pages/StartPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<StartPage/>} />
        <Route path='map' element={<MapPage/>} />
        <Route path='events' element={<EventsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
