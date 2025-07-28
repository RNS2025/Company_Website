import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://rns2025.github.io',
  base: '/Company_Website/',

  integrations: [tailwind()]
});