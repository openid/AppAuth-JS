// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'app', // Source directory for the demo app
  build: {
    outDir: '../built/app',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'app/index.html'),
        redirect: resolve(import.meta.dirname, 'app/redirect.html'),
      },
      output: {
        // Enforce static names without hashes
        entryFileNames: 'bundle.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  server: {
    port: 8000,
  },
});
