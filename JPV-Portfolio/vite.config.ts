// vite.config.ts (o .js)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  // 👇 MUY IMPORTANTE para GitHub Pages (debe coincidir con el nombre del repo)
  base: "/Portfolio-/",

  server: { port: 5173 },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
