// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";


export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'MLF25 Microsite',
      short_name: 'MLF25',
      description: 'MLF25 is a microsite for the 25th of the Mandiri Leadership Forum.',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  }), flowbiteReact()],
})
