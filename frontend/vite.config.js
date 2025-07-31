import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // FIX: Add this 'base' property.
  // An empty string tells Vite to use relative paths for all assets.
  base: '', 
})
