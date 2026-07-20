import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import './index.css'
import App from './App.jsx'
import { TONCONNECT_MANIFEST_URL } from './utils/ton.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={TONCONNECT_MANIFEST_URL}>
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
)
