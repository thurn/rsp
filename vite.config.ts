import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sigilApi } from './vite/sigilApi.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sigilApi()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
    // Sigil saves write data files; they are served by the API, not imported.
    watch: { ignored: ['**/data/**'] },
  },
})
