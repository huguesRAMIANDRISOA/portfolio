// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site.js';

export default defineConfig({
  output: 'static',
  site: SITE.url,

  /* Le français reste à la racine (`/`), l'anglais est préfixé (`/en/`).
     Les deux pages sont produites par `src/pages/[...lang]/index.astro`. */
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  // Fait écrire au sitemap les liens `hreflang` entre les deux versions.
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
