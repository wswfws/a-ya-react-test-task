import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import {StoresProvider} from './stores/StoresContext'

import './styles/index.css'

const rootView = document.getElementById('root')

if (rootView) {
  ReactDOM.render(
    <React.StrictMode>
      <StoresProvider>
        <App />
      </StoresProvider>
    </React.StrictMode>,
    rootView
  )
}
