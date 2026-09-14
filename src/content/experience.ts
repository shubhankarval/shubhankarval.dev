export type Role = {
  company: string;
  title: string;
  /** Company shape and location, set small beside the title. */
  context: string;
  period: string;
  /** Wrap a metric in ** ** to bold it. */
  highlights: string[];
};

export const experienceRange = '2023 - now';

export const experience: Role[] = [
  {
    company: 'JPMorgan Chase',
    title: 'Software engineer II',
    context: 'consumer credit',
    period: '2024 - now',
    highlights: [
      'Ship the credit line increase/exchange, and balance transfer features \u2014 the decisioning behind them clears **$1.3B+** annually at **99.9%** uptime.',
      'Rewrote the servicing front end from legacy JavaScript into React and TypeScript: **40%** faster page loads on a **25%** smaller bundle.',
      'Built the internal tool agents use to correct customer data \u2014 turnaround down from **24 hours** to **5 minutes**.',
    ],
  },
  {
    company: 'Donovan',
    title: 'Full-stack engineer',
    context: 'early stage',
    period: '2023 - 2024',
    highlights: [
      'Built the learning platform behind a music and art program for underserved kids \u2014 animation-heavy Next.js, server-rendered for **40%** more organic reach.',
      'Fenced student records behind row-level security in Supabase, enforced at the database rather than the API.',
    ],
  },
  {
    company: 'SUNY Research Foundation',
    title: 'Software engineer',
    context: 'assistive tech research',
    period: '2023',
    highlights: [
      'Built speech-to-text and text-to-speech keyboards for people with ALS, cerebral palsy, and autism.',
      'Built the tool researchers use to capture and score responses in an augmentative communication study \u2014 Flask APIs on Docker, **50%** more concurrent sessions, **$50K** a year saved.',
    ],
  },
];
