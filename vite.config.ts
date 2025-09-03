/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr"; // 1. Importe o plugin aqui

// https://vite.dev/config/
export default defineConfig({
  // 2. Adicione o svgr() à lista de plugins
  plugins: [react(), svgr(), tailwindcss()],
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
<<<<<<< HEAD
  base: process.env.VITE_BASE_PATH || "./",
=======
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  base: "./",
>>>>>>> e9279986746a3a227b0559a2e77efbeaa1d231c8
  server: {
    port: 15570,
    cors: true,
  },
});
