import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // Matches your vercel.json
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
  base: '/', // Ensure relative paths work properly
});
