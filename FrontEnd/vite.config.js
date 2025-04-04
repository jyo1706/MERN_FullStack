import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  // plugins: [Inspect()],
  plugins: [react()],
  // build: {
  //   chunkSizeWarningLimit: 1000, // Increase to 1MB (default is 500KB)
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       // Example: Put all node_modules dependencies in separate chunks
    //       if (id.includes('node_modules')) {
    //         return 'vendor';
    //       }
    //     }
    //   }
    // }
  }
   

})
