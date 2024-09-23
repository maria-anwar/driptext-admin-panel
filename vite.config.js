import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['chunk-MEEK5HNU'] // Replace with the actual package name if known
  },
  plugins: [react()],
})
