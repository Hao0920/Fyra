import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { registerSW, captureInstallPrompt } from './lib/pwa'
import { initDefaultData } from './lib/db'
import './index.css'

captureInstallPrompt()

try {
  initDefaultData()
} catch (e) {
  console.error('DB init failed:', e)
}

if (import.meta.env.PROD) {
  registerSW()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)