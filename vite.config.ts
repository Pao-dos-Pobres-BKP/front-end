import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    modulePreload: true,
    target: "esnext",
    outDir: "build",
    manifest: true,
    minify: true,
    cssCodeSplit: true,
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  base: process.env.VITE_BASE_PATH || "./",
  server: {
    port: 15570,
    cors: true,
  },
});
