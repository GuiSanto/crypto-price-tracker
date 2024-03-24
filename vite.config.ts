import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from "path"

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  define: {
    "process.env.API_KEY_COINGECKO": JSON.stringify(env.API_KEY_COINGECKO),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}})
