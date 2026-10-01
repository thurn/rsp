import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// eslint-disable-next-line react-refresh/only-export-components
const SigilsApp = lazy(() => import('./sigils/SigilsApp.tsx'))
const sigilsPage = location.pathname.replace(/\/$/, '') === '/sigils'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {sigilsPage ? (
      <Suspense>
        <SigilsApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
