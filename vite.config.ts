import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/Portfolio/',
  // Footer © year is prerendered from this, then refreshed on the client after hydration.
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
