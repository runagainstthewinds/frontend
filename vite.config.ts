import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/trainingsessions": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // proxy requests to backend (change it for prod one day)
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      "/auth": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/example": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
