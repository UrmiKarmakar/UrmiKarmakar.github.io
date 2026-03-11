import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // This is the critical line for GitHub Pages deployment
  // It ensures your assets (JS, CSS) load from /Urmi_Karmakar_E-Portfolio/
  base: '/Urmi_Karmakar_E-Portfolio/', 
  
  logLevel: 'error', 
  plugins: [
    base44({
      // Support for legacy code imports
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ],
  resolve: {
    alias: {
      // Ensures the @ alias works correctly for your imports
      "@": "/src",
    },
  },
});