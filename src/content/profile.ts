import { contact } from './contact';

export type ProfileLink = {
  label: string;
  href: string;
  primary?: boolean;
  umamiEvent: string;
  umamiEventData?: Record<string, string>;
};

const profileLinks: ProfileLink[] = [
  { label: 'resume.pdf', href: '/resume.pdf', primary: true, umamiEvent: 'resume-download' },
  {
    label: 'github',
    href: 'https://github.com/shubhankarval',
    umamiEvent: 'social-click',
    umamiEventData: { channel: 'github' },
  },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/shubhankar-valimbe/',
    umamiEvent: 'social-click',
    umamiEventData: { channel: 'linkedin' },
  },
  {
    label: 'email',
    href: `mailto:${contact.email}`,
    umamiEvent: 'contact-click',
    umamiEventData: { channel: 'email', source: 'sidebar' },
  },
];

export const profile = {
  name: 'Shubhankar Valimbe',
  githubUsername: 'shubhankarval',
  siteRepo: 'shubhankarval.dev',
  siteUrl: 'https://shubhankarval.dev',
  ipa: '/ʃuːˈbʱɑːŋ.kər/',
  respelling: 'shoo-BHAN-ker',
  role: 'Full-stack Engineer',
  location: 'Philadelphia, PA',
  timeZone: 'America/New_York',
  availability: 'open to new roles',
  links: profileLinks,
} satisfies {
  name: string;
  githubUsername: string;
  siteRepo: string;
  siteUrl: string;
  ipa: string;
  respelling: string;
  role: string;
  location: string;
  timeZone: string;
  availability: string;
  links: ProfileLink[];
};
