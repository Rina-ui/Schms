import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "SCHMS - Laboratoire de chimie",
        short_name: "SCHMS",
        description: "Apprendre la chimie en manipulant.",
        theme_color: "#0B1020",
        background_color: "#0B1020",
        display: "standalone",
        start_url: "/"
      }
    })
  ]
});