import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'StockHub Gestão de Estoque',
        short_name: 'StockHub',
        theme_color: '#0f0a1a',
        background_color: '#0f0a1a',
        display: 'standalone'
      }
    })
  ],
})
