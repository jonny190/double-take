import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Relative base so the built app can be served from a configurable sub-path
// (e.g. Home Assistant ingress), matching the previous vue-cli publicPath: './'.
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // keep the dev port the API's constants.util expects (:8080 -> :3000)
    port: 8080,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
});
