import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IngresoLecheApp } from './IngresoLecheApp'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IngresoLecheApp/>
  </StrictMode>,
)

