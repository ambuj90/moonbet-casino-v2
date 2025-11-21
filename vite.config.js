// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // No PostCSS
  
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0',

    // ✅ Hot reload settings
    hmr: {
      host: 'localhost',
      port: 5173,
    },

    // ✅ Needed for React Router
    historyApiFallback: true,

    // ✅ Local Proxy to bypass CORS in dev mode
    proxy: {
      '/wallet-service': {
        target: 'https://api.moonbet.games',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
      '/auth-service': {
        target: 'https://api.moonbet.games',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
      '/referral-service': {
        target: 'https://api.moonbet.games',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  }
});
