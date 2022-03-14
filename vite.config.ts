import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

const isTest = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
    }
  },
  plugins: [svelte()],
  server: {
    port: isTest ? 8985 : 8080,
  },
  build: {
    outDir: 'build'
  },
  optimizeDeps: {
    include: isTest ? ['@testing-library/svelte', 'chai', 'sinon', 'sinon-chai'] : undefined
  }
})