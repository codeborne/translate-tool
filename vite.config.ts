import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [svelte()],
  server: {
    port: 8080,
  },
  build: {
    outDir: 'build'
  }
})
