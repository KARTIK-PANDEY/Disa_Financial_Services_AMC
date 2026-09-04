import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MaintenancePage from './MaintenancePage.jsx'

async function bootstrap() {
  let maintenanceOn = false
  try {
    const res = await fetch('/maintenance.flag', { cache: 'no-store' })
    maintenanceOn = res.ok
  } catch (e) {
    maintenanceOn = false
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      {maintenanceOn ? <MaintenancePage /> : <App />}
    </StrictMode>,
  )
}

bootstrap()
