import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './i18n/config'
import './index.css'
import App from './App.tsx'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  </StrictMode>,
)
