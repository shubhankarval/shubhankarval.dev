export type Role = {
  company: string;
  title: string;
  /** Company shape and location, set small beside the title. */
  context: string;
  period: string;
  summary: string;
};

export const experienceRange = '2022 - now';

export const experience: Role[] = [
  {
    company: 'JPMorgan Chase',
    title: 'Software engineer II',
    context: 'consumer credit',
    period: '2024 - now',
    summary:
      'Ship the credit line increase/exchange, and balance transfer features \u2014 the decisioning behind them clears $1.3B+ annually at 99.9% uptime. Rewrote the web front end from legacy JavaScript into React and TypeScript for faster page loads on a smaller bundle, and migrated the services behind it off on-prem data centers onto AWS.',
  },
  {
    company: 'Donovan',
    title: 'Founding engineer',
    context: 'edtech nonprofit',
    period: '2023 - 2024',
    summary:
      'Led 9 engineers taking the learning platform behind a music and art program for underserved kids from first commit to production \u2014 animation-heavy Next.js with Motion, a Bun/ElysiaJS backend, Drizzle over Neon Postgres \u2014 and kept it running on Azure at a cost an early-stage budget could carry.',
  },
  {
    company: 'SUNY Research Foundation',
    title: 'Research engineer',
    context: 'assistive tech',
    period: '2022 - 2023',
    summary:
      'Built the Al training tool behind an augmentative communication study for people with ALS, cerebral palsy, and autism \u2014 Whisper, Google TTS, a fine-tuned DialoGPT chatbot \u2014 plus the NLP pipeline scoring its replies against a human-rated set, 45% more accurate after tuning.',
  },
];
