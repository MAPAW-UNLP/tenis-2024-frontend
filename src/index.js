import React from 'react'
import ReactDOM from 'react-dom/client'

//router
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SessionProvider } from './context/SessionContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <App />
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
)
