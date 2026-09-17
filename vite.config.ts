import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://minderhq.github.io/www/ (project Pages, no custom
  // domain), so assets must be referenced under /www/, not root-absolute —
  // otherwise index.html requests /assets/* at the domain root and 404s
  // (blank page). Change this if a custom domain is configured.
  base: '/www/',
  plugins: [react()],
})
