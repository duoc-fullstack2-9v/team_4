import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    // 🔧 evita runtimes duplicados de React en prebundle
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  esbuild: {
    // 🔧 evita mezclar "inline JSX" con runtime automático
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    }
  }
})



