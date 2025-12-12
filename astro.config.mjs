import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://www.rns-apps.dk',
  base: '/',
  trailingSlash: 'always',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  integrations: [
    tailwind(),
    sitemap()
  ]
});
