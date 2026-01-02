import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://cors-prettier-crud-app-backend.vercel.app",
        changeOrigin: true,
        secure: true, // since your backend is HTTPS
      },
    },
  },
});
