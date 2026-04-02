import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change this to '/' for the most stable deployment on your main github.io domain
  base: '/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // This helps prevent the "white screen" if assets are large
  build: {
    chunkSizeWarningLimit: 1000,
  },
  logLevel: 'info', 
})