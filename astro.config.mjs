import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://www.rns-apps.dk', 
  base: '/',                       
  trailingSlash: 'always',

  integrations: [tailwind()]
});
