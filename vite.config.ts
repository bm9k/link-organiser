import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/link-organiser/",
  plugins: [react({
    jsxRuntime: "classic"
  })],
})
