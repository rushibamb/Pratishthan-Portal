import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // This is the crucial setting for Vercel deployment.
  // An empty string for 'base' ensures that all the asset paths in your
  // final built files (like <script src="...">) are relative. This allows
  // them to work correctly when hosted in any directory.
  base: '', 
})
