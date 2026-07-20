import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/swipo/',
  plugins: [react()],
  // .env lives at the project root (one level up), not inside frontend/
  envDir: '../',
})
