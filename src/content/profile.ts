export type ProfileLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export const profile = {
  name: 'Shubhankar Valimbe',
  ipa: '/ʃʊˈbʱʌŋ.kʌɾ ʋʌˈlɪm.beː/',
  respelling: 'shoo-BAHNG-kar vah-LIM-bay',
  role: 'Fullstack Software Engineer',
  location: 'Philadelphia, PA',
  timeZone: 'America/New_York',
  availability: 'open to new roles',
  links: [
    { label: 'resume.pdf', href: '/resume.pdf', primary: true },
    { label: 'github', href: 'https://github.com/shubhankarval' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/shubhankar-valimbe/' },
    { label: 'email', href: 'mailto:shubhankarvalimbe@gmail.com' },
  ],
} satisfies {
  name: string;
  ipa: string;
  respelling: string;
  role: string;
  location: string;
  timeZone: string;
  availability: string;
  links: ProfileLink[];
};
