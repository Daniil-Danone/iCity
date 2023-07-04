import React from 'react';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/fonts.css';
import './styles/map.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Normalize/>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
