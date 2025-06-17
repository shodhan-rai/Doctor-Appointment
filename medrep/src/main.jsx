import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MedRepContextProvider from './context/MedRepContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MedRepContextProvider>
      <App />
    </MedRepContextProvider>
  </BrowserRouter>,
)