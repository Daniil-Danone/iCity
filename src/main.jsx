import React from 'react'
import { Normalize } from 'styled-normalize'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Normalize/>
    <App />
  </React.StrictMode>,
)
