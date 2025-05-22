import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';;
import path from 'path';
import componentTagger from 'component-tagger'; // Adjust this if the package name or path is different

export default defineConfig(({ mode }) => ({
  base: '/', // <== Add this line
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
