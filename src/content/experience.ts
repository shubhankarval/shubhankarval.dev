export type Role = {
  company: string;
  title: string;
  /** Company shape and location, set small beside the title. */
  context: string;
  period: string;
  /** Wrap a metric in ** ** to bold it. */
  highlights: string[];
};

export const experienceRange = '2019 - now';

export const experience: Role[] = [
  {
    company: 'Vector Labs',
    title: 'Staff engineer, developer infrastructure',
    context: 'Series B \u00B7 ~40 eng \u00B7 Seattle',
    period: '2023 - now',
    highlights: [
      'Own the org-wide release pipeline - **60 deploys a day** at **p95 4m12s**, down from eleven minutes.',
      'Built the Terraform drift detector now standard across **300+ workspaces**, catching 90% of config drift before it became an incident.',
      'Led the remote build-cache migration and cut CI spend **38%** in one quarter.',
    ],
  },
  {
    company: 'Northgate',
    title: 'Senior platform engineer',
    context: 'Series C \u00B7 remote',
    period: '2021 - 2023',
    highlights: [
      'Migrated **90+ services** from EC2 to Kubernetes with zero customer-facing downtime.',
      'Cut cloud spend **$1.1M a year** through rightsizing and spot scheduling.',
      'Redesigned on-call rotation and alert routing: pages down **70%**, MTTR from 42 minutes to **11**.',
    ],
  },
  {
    company: 'Halcyon',
    title: 'Backend engineer, first infrastructure hire',
    context: 'seed \u2192 Series A \u00B7 Seattle',
    period: '2019 - 2021',
    highlights: [
      'Built the first CI/CD, infrastructure-as-code, and observability stack, supporting growth from **4 to 30 engineers**.',
      'Scaled the core API to **4M requests a day** on a three-person team.',
    ],
  },
];
