import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    // Access environment variables here, for example, conditional base path
    paths: {
      base: process.env.BASE_PATH || '',
    }
  }
};

export default config;