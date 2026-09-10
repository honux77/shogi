import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The yaneuraou.wasm engine uses SharedArrayBuffer for its worker threads,
// which browsers only expose in a cross-origin-isolated context.
const crossOriginIsolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { headers: crossOriginIsolationHeaders },
  preview: { headers: crossOriginIsolationHeaders },
})
