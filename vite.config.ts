import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === "1" ? "/pass-ready/" : "/",
  plugins: [react(), tailwindcss()],
  server: { port: 5173, host: true },
})
