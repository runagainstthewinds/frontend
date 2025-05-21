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
      "/shoes": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/trainingplans": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/achievements": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/users": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/trainingsessions": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // proxy requests to backend (change it for prod one day)
      "/api/strava/auth-url": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/api/strava/exchange-token": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/example": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/userdetails": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
