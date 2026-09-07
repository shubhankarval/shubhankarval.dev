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
      { label: 'Java', core: true },
      { label: 'Python' },
      { label: 'SQL' },
    ],
  },
  {
    label: 'web \u00B7 backend',
    entries: [
      { label: 'React', core: true },
      { label: 'Spring Boot', core: true },
      { label: 'Next.js' },
      { label: 'Flask' },
      { label: 'Node.js' },
      { label: 'TailwindCSS' },
    ],
  },
  {
    label: 'infra \u00B7 delivery',
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
    label: 'data \u00B7 observe',
    entries: [
      { label: 'PostgreSQL' },
      { label: 'Redis' },
      { label: 'Splunk' },
      { label: 'Dynatrace' },
    ],
  },
];
