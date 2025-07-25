import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // Asegúrate que es este import

const config = {
  preprocess: vitePreprocess(),
};

export default config;