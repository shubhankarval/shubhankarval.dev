export type Project = {
  name: string;
  /** Omit for work that has no public page. */
  href?: string;
  description: string;
  language: string;
  /** GitHub's linguist color for 'language'. */
  languageColor: string;
};

export const projectsHref = 'https://github.com/shubhankarval?tab=repositories';

export const projects: Project[] = [
  {
    name: 'cobol studio',
    description:
      'Patent-pending internal tool that maps mainframe code into a graph database so AI can explain it back.',
    language: 'Python',
    languageColor: '#3572A5',
  },
  {
    name: 'split & go',
    description:
      'Split-pay for group bookings in Chase Travel - every traveler settles their own share, on their own card.',
    language: 'Java',
    languageColor: '#b07219',
  },
  {
    name: 'nextjs-starter-pack',
    href: 'https://www.npmjs.com/package/nextjs-starter-pack',
    description:
      'Published npm starter - the integrations every Next.js project needs, zero config.',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'sorting visualizer',
    href: 'https://easy-sorting-visualizer.netlify.app/',
    description: 'Shell sort, bubble sort, and friends, animated one pass at a time.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
  },
];
