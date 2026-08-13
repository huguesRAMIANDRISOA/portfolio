# monPortfolio

Portfolio personnel de freelance — site vitrine **statique** construit avec
[Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com).

## Démarrage

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

| Commande       | Effet                                     |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Serveur de développement                  |
| `pnpm build`   | Build statique dans `dist/`               |
| `pnpm preview` | Prévisualise le build local               |
| `pnpm check`   | Vérification TypeScript des fichiers Astro |

## Personnalisation

Tout le contenu éditable est centralisé dans
[src/config/site.ts](src/config/site.ts) : identité, tagline, réseaux sociaux,
compétences et projets. Les composants lisent ce fichier — pas besoin d'y
toucher pour changer le texte.

À remplacer avant la mise en ligne :

- `SITE.url` — l'URL de production (sert au canonical, à l'Open Graph et au sitemap)
- `SITE.formspreeEndpoint` — ton endpoint [Formspree](https://formspree.io)
- `SOCIALS` — tes vrais profils GitHub / LinkedIn
- `public/cv.pdf` — ton CV (ou mets `resumeUrl: null` pour masquer le bouton)
- `public/og.png` — l'image de partage (1200 × 630)
- `public/robots.txt` — l'URL du sitemap

## Ajouter un projet

1. Ajoute une entrée dans le tableau `PROJECTS` de `src/config/site.ts`.
2. Pour une capture d'écran, place l'image dans `src/assets/` puis passe-la à la
   carte depuis [src/pages/index.astro](src/pages/index.astro) :

```astro
---
import shot from '../assets/mon-projet.png';
---
<ProjectCard {...PROJECTS[0]} image={shot} />
```

`ProjectCard` utilise `astro:assets` (`<Image />`) : l'image est redimensionnée,
convertie et servie en `lazy`. Sans image, une vignette CSS est affichée.

## Structure

```
src/
  components/   Composants réutilisables (.astro)
  config/       site.ts — contenu du site (source unique de vérité)
  layouts/      Layout.astro — <head>, SEO, header/footer
  pages/        index.astro
  styles/       global.css — thème Tailwind v4 + styles de base
public/         Assets statiques (favicon, og.png, cv.pdf)
```

> **Note Tailwind v4** : la configuration vit dans le bloc `@theme` de
> `src/styles/global.css`, il n'y a plus de `tailwind.config.mjs`. Le plugin
> `@tailwindcss/vite` est branché dans `astro.config.mjs`.

## JavaScript côté client

Le site est statique et n'embarque que deux petits scripts inlinés dans le HTML
(aucune requête réseau supplémentaire) :

- le menu mobile ([Header.astro](src/components/Header.astro))
- l'envoi AJAX du formulaire ([ContactForm.astro](src/components/ContactForm.astro)),
  qui retombe sur un POST HTML natif si JS est indisponible

Aucun framework UI n'est chargé.

## Déploiement

Le build produit un dossier `dist/` purement statique.

**Vercel** — importe le dépôt, le preset Astro est détecté automatiquement
(build : `pnpm build`, output : `dist`).

**Cloudflare Pages** — build : `pnpm build`, dossier de sortie : `dist`.

Pense à définir `SITE.url` sur le domaine final avant de déployer, sinon le
sitemap et les balises Open Graph pointeront vers l'URL d'exemple.
