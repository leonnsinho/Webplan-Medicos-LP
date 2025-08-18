import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Otimizações para performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    },
    // Comprimir assets
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Otimizar imagens
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false
  },
  // Configurações de servidor para desenvolvimento
  server: {
    open: true,
    port: 3000
  },
  // Otimizações de preview
  preview: {
    port: 3000
  }
});
