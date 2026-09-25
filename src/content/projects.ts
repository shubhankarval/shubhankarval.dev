export type ProjectLinkKind = 'repo' | 'npm' | 'website';

export type ProjectLink = {
  kind: ProjectLinkKind;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  language: string;
  /** GitHub's linguist color for 'language'. */
  languageColor: string;
  /** Omit for work that has no public page. */
  links?: ProjectLink[];
};

export const projectsHref = 'https://github.com/shubhankarval?tab=repositories';

export const projects: Project[] = [
  {
    name: 'nextjs-starter-pack',
    links: [
      { kind: 'repo', href: 'https://github.com/shubhankarval/nextjs-starter-pack' },
      { kind: 'npm', href: 'https://www.npmjs.com/package/nextjs-starter-pack' },
    ],
    description:
      'Published npm starter \u2014 the integrations every Next.js project needs, zero config.',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'sorting visualizer',
    links: [
      { kind: 'repo', href: 'https://github.com/shubhankarval/Sorting-Visualizer' },
      { kind: 'website', href: 'https://easy-sorting-visualizer.netlify.app/' },
    ],
    description: 'Shell sort, bubble sort, and friends, animated one pass at a time.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
  },
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
      'Split-pay for group bookings in Chase Travel \u2014 every traveler settles their own share, on their own card.',
    language: 'Java',
    languageColor: '#b07219',
  },
];
