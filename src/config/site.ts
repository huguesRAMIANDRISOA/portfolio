/**
 * Constantes du site, utilisées par astro.config.mjs et Layout.astro.
 */

export const SITE = {
  url: 'https://monportfolio.example.com',
  name: 'Hugues Ramiandrisoa',
  description: 'Portfolio personnel.',
} as const;

/* La langue n'est plus ici : elle dépend de la page servie. Voir `DEFAULT_LANG`
   et les traductions dans `src/i18n/ui.ts`. */
