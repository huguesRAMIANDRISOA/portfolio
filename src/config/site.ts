/**
 * Source unique de vérité pour le contenu du site.
 * Modifie ce fichier plutôt que les composants.
 */

export const SITE = {
  url: 'https://monportfolio.example.com',
  name: 'Hugues Ramiandrisoa',
  role: 'Développeur Web Freelance',
  tagline:
    "Je conçois des sites et applications web rapides, accessibles et durables — de la maquette à la mise en production.",
  description:
    "Portfolio de Hugues Ramiandrisoa, développeur web freelance : sites performants, accessibles et sur-mesure.",
  locale: 'fr',
  email: 'huguesramiandrisoaandrianirina@gmail.com',
  /** Endpoint Formspree : remplace par ton propre ID (https://formspree.io) */
  formspreeEndpoint: 'https://formspree.io/f/xxxxxxxx',
  /** CV placé dans public/ ; mets `null` pour masquer le bouton */
  resumeUrl: '/cv.pdf',
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Nom d'icône géré par src/components/SocialIcon.astro */
  icon: 'github' | 'linkedin' | 'mail';
};

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: 'mail' },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    title: 'Front-end',
    items: ['TypeScript', 'Astro', 'React', 'Tailwind CSS', 'HTML/CSS', 'Vite'],
  },
  {
    title: 'Back-end & données',
    items: ['Node.js', 'Python', 'PostgreSQL', 'REST', 'SQLite'],
  },
  {
    title: 'Outils & pratiques',
    items: ['Git', 'Docker', 'CI/CD', 'Accessibilité (WCAG)', 'SEO technique', 'Tests'],
  },
];

export type Project = {
  title: string;
  description: string;
  /** Chemin relatif depuis src/assets/ (voir src/content/projects) */
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Tableau de bord analytique',
    description:
      "Interface de visualisation temps réel pour une PME : agrégation de données, filtres croisés et export CSV. Chargement initial sous 1 s.",
    tags: ['Astro', 'TypeScript', 'PostgreSQL'],
    repoUrl: 'https://github.com/',
    demoUrl: 'https://example.com',
  },
  {
    title: 'Site vitrine e-commerce',
    description:
      "Vitrine statique connectée à un CMS headless, avec panier côté client et paiement Stripe. 100/100 sur Lighthouse.",
    tags: ['Astro', 'Tailwind', 'Stripe'],
    repoUrl: 'https://github.com/',
    demoUrl: 'https://example.com',
  },
  {
    title: 'Assistant conversationnel',
    description:
      "Chatbot de support client branché sur une base documentaire interne, avec recherche sémantique et garde-fous de réponse.",
    tags: ['Python', 'API Claude', 'RAG'],
    repoUrl: 'https://github.com/',
  },
];
