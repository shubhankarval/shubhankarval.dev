export type StackEntry = {
  label: string;
  /** Rendered with stronger contrast - the tools worth leading with. */
  core?: boolean;
};

export type StackGroup = {
  label: string;
  entries: StackEntry[];
};

export const stack: StackGroup[] = [
  {
    label: 'languages',
    entries: [
      { label: 'TypeScript', core: true },
      { label: 'Java' },
      { label: 'Python' },
      { label: 'SQL' },
    ],
  },
  {
    label: 'web · backend',
    entries: [
      { label: 'React', core: true },
      { label: 'Next.js', core: true },
      { label: 'Spring Boot' },
      { label: 'Flask' },
      { label: 'Node.js' },
      { label: 'TailwindCSS' },
    ],
  },
  {
    label: 'infra · delivery',
    entries: [
      { label: 'AWS', core: true },
      { label: 'Docker' },
      { label: 'Terraform' },
      { label: 'Kafka' },
      { label: 'Jenkins' },
      { label: 'Kubernetes' },
    ],
  },
  {
    label: 'data · observe',
    entries: [
      { label: 'PostgreSQL' },
      { label: 'Redis' },
      { label: 'Splunk' },
      { label: 'Dynatrace' },
    ],
  },
];
