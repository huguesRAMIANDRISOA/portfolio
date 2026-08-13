# CLAUDE.md

Ce fichier fournit du contexte à Claude Code pour travailler sur ce projet.

## Vue d'ensemble du projet

Portfolio personnel de freelance — site vitrine statique pour présenter mes
compétences, projets et informations de contact.

## Stack technique

- **Framework** : Astro (mode statique, `output: 'static'`)
- **Styling** : Tailwind CSS
- **Langage** : TypeScript (fichiers `.astro` + `.ts`)
- **Formulaire de contact** : Formspree (ou Resend) — pas de backend custom
- **Déploiement** : Vercel ou Cloudflare Pages
- **Gestionnaire de paquets** : pnpm (préféré, sinon npm)

## Structure du projet

```
src/
  components/     # Composants réutilisables (.astro)
  layouts/        # Layouts de page (Layout.astro)
  pages/          # Routing basé sur les fichiers (index.astro, etc.)
  styles/         # CSS global si nécessaire
public/           # Assets statiques (images, favicon, CV en PDF)
astro.config.mjs
tailwind.config.mjs
```

## Sections du site

1. Hero — nom, titre, tagline
2. À propos / Compétences — liste ou grille de tags/icônes
3. Projets — cards avec image, description, lien GitHub/démo
4. Contact — formulaire (Formspree) + liens sociaux

## Commandes utiles

```bash
pnpm install       # installer les dépendances
pnpm dev           # serveur de dev local
pnpm build         # build statique (dossier dist/)
pnpm preview       # preview du build local
```

## Conventions de code

- Composants Astro en PascalCase (`ProjectCard.astro`)
- Classes Tailwind directement dans le markup, pas de CSS custom sauf nécessité
- Un seul niveau d'interactivité JS : utiliser les "islands" Astro
  (`client:load`, `client:visible`) uniquement si un composant a besoin de JS
  côté client (ex: menu mobile, formulaire)
- Images optimisées via `astro:assets` (composant `<Image />`)
- Pas de state management global — le site est statique, pas besoin de Redux/Zustand

## Priorités

- Performance avant tout : viser 100/100 sur Lighthouse
- SEO : meta tags, Open Graph, sitemap (via `@astrojs/sitemap`)
- Accessibilité : contrastes corrects, alt text sur toutes les images, navigation clavier
- Responsive mobile-first

## Ce qu'il ne faut PAS faire

- Ne pas ajouter Next.js, React Router, ou tout framework nécessitant un serveur
- Ne pas ajouter de backend/API custom pour le formulaire de contact
- Ne pas surcharger le site avec des animations JS lourdes qui pénalisent la vitesse