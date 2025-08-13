import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Use esbuild for faster builds
    target: 'es2015', // Target modern browsers
    sourcemap: false, // Disable sourcemaps for production
    assetsInlineLimit: 4096 // Inline small assets
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  },
  // Performance optimizations
  server: {
    hmr: true
  }
})
