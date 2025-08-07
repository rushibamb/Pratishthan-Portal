import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // important for relative paths in Vercel
  build: {
    rollupOptions: {
      input: '/index.html', // ensures proper routing
    }
  }
});
