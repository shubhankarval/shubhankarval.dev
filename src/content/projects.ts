export type Project = {
  name: string;
  href: string;
  description: string;
  language: string;
  /** GitHub's linguist color for 'language'. */
  languageColor: string;
};

export const projectsHref = 'https://github.com/shubhankarval?tab=repositories';

export const projects: Project[] = [
  {
    name: 'driftwood',
    href: '#',
    description:
      'Terraform drift detector that diffs live infra against committed HCL and opens the reconciliation PR.',
    language: 'Go',
    languageColor: '#00ADD8',
  },
  {
    name: 'pinch',
    href: '#',
    description: '12kb request coalescer for edge runtimes. No cache, no invalidation problem.',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'lintwall',
    href: '#',
    description: 'Pre-push gate that mirrors CI locally so typos never reach the build queue.',
    language: 'Rust',
    languageColor: '#dea584',
  },
  {
    name: 'quiet log',
    href: '#',
    description: 'Terminal log viewer with fuzzy filtering, saved queries, and zero config.',
    language: 'Go',
    languageColor: '#00ADD8',
  },
];
