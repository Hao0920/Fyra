import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      manifest: {
        name: 'Fyra - 记账',
        short_name: 'Fyra',
        description: '开源记账应用，记账是为了自由',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: '/',
        categories: ['finance', 'productivity'],
        lang: 'zh-CN',
        dir: 'ltr',
        icons: [
          { src: '/icon-72.png', sizes: '72x72', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-96.png', sizes: '96x96', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-128.png', sizes: '128x128', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-144.png', sizes: '144x144', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-152.png', sizes: '152x152', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'maskable any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' }
        ],
        shortcuts: [
          {
            name: '记一笔',
            short_name: '记账',
            description: '快速记录一笔支出',
            url: '/record',
            icons: [{ src: '/icon-96.png', sizes: '96x96' }]
          },
          {
            name: '查看账户',
            short_name: '账户',
            description: '查看所有账户余额',
            url: '/accounts',
            icons: [{ src: '/icon-96.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.frankfurter\.app\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'exchange-rates',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api',
              expiration: { maxEntries: 100, maxAgeSeconds: 300 },
              networkTimeoutSeconds: 10,
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'github-raw',
              expiration: { maxEntries: 50, maxAgeSeconds: 3600 }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-switch', '@radix-ui/react-label', '@radix-ui/react-progress', '@radix-ui/react-separator'],
          'vendor-charts': ['recharts'],
          'vendor-db': ['dexie', 'isomorphic-git', '@isomorphic-git/lightning-fs'],
          'vendor-utils': ['date-fns', 'fuse.js', 'zustand', 'immer']
        }
      }
    }
  }
})