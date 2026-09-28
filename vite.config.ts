import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Custom domain (northcascadiadev.com) serves from site root.
// Project-pages path /pass-ready/ would 404 JS/CSS and show a white page.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173, host: true },
})
