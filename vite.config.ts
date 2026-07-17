import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: process.env.GITHUB_ACTIONS ? '/quantum-paper-website/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
