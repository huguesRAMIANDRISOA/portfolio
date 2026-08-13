/**
 * Textes du site par langue.
 *
 * Le français est la référence : `Dict` en est déduit, donc une clé oubliée
 * côté anglais devient une erreur de compilation (`pnpm check`) au lieu d'un
 * trou dans la page.
 */

export const LANGS = {
  fr: { name: 'Français', short: 'FR' },
  en: { name: 'English', short: 'EN' },
};

export type Lang = keyof typeof LANGS;

export const DEFAULT_LANG: Lang = 'fr';

/** Racine de la version d'un langue : `/` pour le français, `/en/` sinon. */
export const localePath = (lang: Lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);

/* Pas de `as const` : les valeurs restent typées `string`, sinon la version
   anglaise devrait reprendre mot pour mot les littéraux français. */
const fr = {
  meta: {
    description:
      'Portfolio de Hugues Ramiandrisoa, développeur full stack freelance à Antsirabe, Madagascar.',
    ogLocale: 'fr_FR',
    skip: 'Aller au contenu principal',
    switcher: 'Changer de langue',
  },

  
  nav: {
    home: 'Accueil',
    about: 'A propos',
    skills: 'Compétences',
    contact: 'Contact',
  },

  hero: {
    intro: 'Je suis Hugues RAMIANDRISOA',
    roles: ['Dev Fullstack', 'Freelancer', '3D modeling'],
    country: 'Madagascar',
    city: 'Antsirabe',
    phone: 'Telephone',
    email: 'Email',
  },

  about: {
    badge: 'A propos',
    title: ['Je conçois des applications', 'web et mobiles sur mesure'],
    text: "Développeur Full Stack basé à Antsirabe, Madagascar, avec plus de 5 années d'expérience en applications web et mobiles. Solide maîtrise de Node.js et Flutter, bonnes bases en React. Je transforme des besoins complexes en solutions robustes et soignées.",
    cta: 'Discutons de votre projet',
    stats: [
      "Années d'expérience",
      'Projets livrés',
      'Clients satisfaits',
      'Projets menés à terme',
    ],
  },

  skills: {
    eyebrow: 'Mes compétences',
    title: 'Technologies que je maîtrise',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet',
    formTitle: 'Envoyez-moi un message',
    formText:
      'Une question, un besoin à cadrer ou une demande de devis ? Décrivez votre projet, je réponds sous 24 h.',
    subject: 'Nouveau message depuis le portfolio',
    firstName: 'Prénom',
    firstNamePlaceholder: 'Votre prénom',
    lastName: 'Nom',
    lastNamePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    phone: 'Téléphone',
    phonePlaceholder: '34 28 275 38',
    dialLabel: 'Indicatif téléphonique',
    message: 'Message',
    messagePlaceholder: 'Décrivez votre besoin en quelques lignes…',
    submit: 'Envoyer le message',
    sending: 'Envoi…',
    ok: 'Message envoyé. Je vous réponds sous 24 h.',
    error: "L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.",
    offline:
      'Connexion impossible. Vérifiez votre réseau, ou écrivez-moi directement par email.',
    asideTitle: ['Disponible pour', 'vos projets.'],
    channels: ['Téléphone', 'SMS / WhatsApp', 'Email'],
    follow: 'Retrouvez-moi',
  },

  quote: {
    text: 'Chaque défi est une occasion de grandir.',
  },

  footer: {
    contact: 'Me contacter',
    nav: 'Navigation',
    servicesTitle: 'Prestations',
    services: ['Applications web', 'Applications mobiles', 'Modélisation 3D'],
    follow: 'Me suivre',
    rights: 'Tous droits réservés.',
    top: 'Retour en haut',
  },
};

type Dict = typeof fr;

const en: Dict = {
  meta: {
    description:
      'Portfolio of Hugues Ramiandrisoa, freelance full stack developer based in Antsirabe, Madagascar.',
    ogLocale: 'en_US',
    skip: 'Skip to main content',
    switcher: 'Change language',
  },

  nav: {
    home: 'Home',
    about: 'About me',
    skills: 'Skills',
    contact: 'Contact Me',
  },

  hero: {
    intro: 'I am Hugues RAMIANDRISOA',
    roles: ['Dev Fullstack', 'Freelancer', '3D modeling'],
    country: 'Madagascar',
    city: 'Antsirabe',
    phone: 'Phone',
    email: 'Email',
  },

  about: {
    badge: 'About me',
    title: ['I build custom web', 'and mobile applications'],
    text: 'Full Stack developer based in Antsirabe, Madagascar, with over 5 years of experience in web and mobile applications. Strong command of Node.js and Flutter, solid grounding in React. I turn complex needs into robust, polished solutions.',
    cta: "Let's talk about your project",
    stats: ['Years of experience', 'Projects delivered', 'Happy clients', 'Projects seen through'],
  },

  skills: {
    eyebrow: 'My skills',
    title: 'Technologies I work with',
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your project",
    formTitle: 'Send me a message',
    formText:
      'A question, a project to scope or a quote request? Describe your project, I reply within 24 hours.',
    subject: 'New message from the portfolio',
    firstName: 'First name',
    firstNamePlaceholder: 'Your first name',
    lastName: 'Last name',
    lastNamePlaceholder: 'Your last name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    phone: 'Phone',
    phonePlaceholder: '34 28 275 38',
    dialLabel: 'Dialling code',
    message: 'Message',
    messagePlaceholder: 'Describe your needs in a few lines…',
    submit: 'Send the message',
    sending: 'Sending…',
    ok: 'Message sent. I will get back to you within 24 hours.',
    error: 'Sending failed. Please try again, or email me directly.',
    offline: 'Connection failed. Check your network, or email me directly.',
    asideTitle: ['Available for', 'your projects.'],
    channels: ['Phone', 'SMS / WhatsApp', 'Email'],
    follow: 'Find me',
  },

  quote: {
    text: 'Every challenge is a chance to grow.',
  },

  footer: {
    contact: 'Contact me',
    nav: 'Navigation',
    servicesTitle: 'Services',
    services: ['Web applications', 'Mobile applications', '3D modeling'],
    follow: 'Follow me',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
};

export const UI: Record<Lang, Dict> = { fr, en };
