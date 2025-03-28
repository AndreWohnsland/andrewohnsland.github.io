import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { AuthContextProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
