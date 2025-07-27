// vite.config.js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/vd-d3-escalas/" : "/",
  plugins: [svelte()],
}));
