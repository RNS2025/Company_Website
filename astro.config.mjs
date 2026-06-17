import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://www.rns-apps.dk",
  base: "/",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "da",
    locales: ["da", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    tailwind(),
    sitemap(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  redirects: {
    "/install/": "https://smash.rns-apps.dk",
    "/projekter/": "/#projekter",
    "/projekter/digital-scorecard/": "/#projekter",
    "/projekter/smash-padelcenter/": "/#projekter",
    "/om-os/": "/#om-os",
    "/kontakt/": "/#kontakt",
    "/en/projekter/": "/en/#projekter",
    "/en/projekter/digital-scorecard/": "/en/#projekter",
    "/en/projekter/smash-padelcenter/": "/en/#projekter",
    "/en/om-os/": "/en/#om-os",
    "/en/kontakt/": "/en/#kontakt",
  },
});
