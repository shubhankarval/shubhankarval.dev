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
    label: 'Languages',
    entries: [
      { label: 'TypeScript', core: true },
      { label: 'Python' },
      { label: 'Java' },
      { label: 'SQL' },
    ],
  },
  {
    label: 'Web',
    entries: [
      { label: 'React', core: true },
      { label: 'Next.js', core: true },
      { label: 'Tailwind' },
      { label: 'GraphQL' },
      { label: 'Node' },
    ],
  },
  {
    label: 'Infra & Delivery',
    entries: [{ label: 'AWS', core: true }, { label: 'Docker' }, { label: 'Terraform' }],
  },
  {
    label: 'Observe & Data',
    entries: [
      { label: 'OpenTelemetry' },
      { label: 'Grafana' },
      { label: 'Postgres' },
      { label: 'Redis' },
    ],
  },
];
