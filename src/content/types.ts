export type Lang = "en" | "ar";

export interface TitledText {
  title: string;
  text: string;
}

export interface TextContent {
  general: {
    siteName: string;
    tagline: string;
    identityLabel: string;
    languageName: string;
  };
  nav: {
    home: string;
    about: string;
    problem: string;
    solution: string;
    howItWorks: string;
    features: string;
    technology: string;
    app: string;
    dashboard: string;
    team: string;
    contact: string;
  };
  hero: {
    identityLabel: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    supportMessage: string;
    appCaption: string;
    dashboardCaption: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    highlights: TitledText[];
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    items: TitledText[];
  };
  solution: {
    eyebrow: string;
    title: string;
    intro: string;
    components: { title: string; subtitle: string; points: string[] }[];
    disclaimer: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: TitledText[];
  };
  features: {
    eyebrow: string;
    title: string;
    intro: string;
    items: TitledText[];
  };
  technology: {
    eyebrow: string;
    title: string;
    intro: string;
    categories: { title: string; value: string }[];
    architectureTitle: string;
    architecture: string[];
    note: string;
  };
  appShowcase: {
    eyebrow: string;
    title: string;
    intro: string;
    screens: TitledText[];
    placeholderText: string;
    previewHint: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    intro: string;
    screens: TitledText[];
    placeholderText: string;
  };
  impact: {
    eyebrow: string;
    title: string;
    intro: string;
    items: TitledText[];
    note: string;
  };
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    members: { name: string; role: string; bio: string }[];
  };
  supervisor: {
    eyebrow: string;
    label: string;
    name: string;
    academicTitle: string;
    bio: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    demoLabel: string;
    notProvided: string;
    footerTagline: string;
    footerNote: string;
    editLink: string;
  };
}

export interface SharedContent {
  links: {
    email: string;
    linkedin: string;
    github: string;
    demoVideo: string;
  };
  teamLinks: { linkedin: string; github: string }[];
  supervisorLinks: { linkedin: string };
}

export interface SiteContent {
  text: Record<Lang, TextContent>;
  shared: SharedContent;
}
