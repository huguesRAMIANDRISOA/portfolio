# monPortfolio

Portfolio personnel de freelance — site vitrine **statique** construit avec
[Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com).

Le projet est actuellement une **page vide** : le socle technique est en place,
le contenu reste à écrire.

## Démarrage

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

| Commande       | Effet                                      |
| -------------- | ------------------------------------------ |
| `pnpm dev`     | Serveur de développement                   |
| `pnpm build`   | Build statique dans `dist/`                |
| `pnpm preview` | Prévisualise le build local                |
| `pnpm check`   | Vérification TypeScript des fichiers Astro |

## Structure

```
src/
  config/site.ts        Nom, URL, description (lus par astro.config.mjs et Layout)
  layouts/Layout.astro  <head> complet : SEO, Open Graph, canonical, skip-link
  pages/index.astro     Page vide
  styles/global.css     Thème Tailwind v4 + styles de base
public/                 favicon.svg, og.png, robots.txt
```

Le dossier `src/components/` n'existe pas encore — crée-le quand tu ajoutes tes
premiers composants (`.astro`, en PascalCase).

## Personnalisation

À remplacer avant la mise en ligne :

- `SITE.url` dans [src/config/site.ts](src/config/site.ts) — l'URL de production
  (sert au canonical, à l'Open Graph et au sitemap)
- `public/og.png` — l'image de partage (1200 × 630)
- `public/robots.txt` — l'URL du sitemap

## Images

Place tes images dans `src/assets/` et importe-les pour bénéficier de
l'optimisation `astro:assets` (redimensionnement, formats modernes, `lazy`) :

```astro
---
import { Image } from 'astro:assets';
import shot from '../assets/mon-image.png';
---
<Image src={shot} alt="Description" widths={[400, 800]} loading="lazy" />
```

`public/` ne sert qu'aux fichiers servis tels quels (favicon, CV en PDF, og.png).

## Note Tailwind v4

La configuration vit dans le bloc `@theme` de
[src/styles/global.css](src/styles/global.css) — il n'y a **pas** de
`tailwind.config.mjs`. Le plugin `@tailwindcss/vite` est branché dans
`astro.config.mjs`.

## Déploiement

Le build produit un dossier `dist/` purement statique.

**Vercel** — importe le dépôt, le preset Astro est détecté automatiquement
(build : `pnpm build`, output : `dist`).

**Cloudflare Pages** — build : `pnpm build`, dossier de sortie : `dist`.

Définis `SITE.url` sur le domaine final avant de déployer, sinon le sitemap et
les balises Open Graph pointeront vers l'URL d'exemple.
