import { contact } from '@content/contact';
import { experience } from '@content/experience';
import { profile } from '@content/profile';
import { stack } from '@content/stack';

const [currentRole] = experience;

/** Person schema for search engines - links the name to the profiles under "sameAs". */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: currentRole.title,
  email: contact.email,
  worksFor: {
    '@type': 'Organization',
    name: currentRole.company,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University at Buffalo, SUNY',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
  },
  knowsAbout: stack.flatMap((group) => group.entries.map((entry) => entry.label)),
  sameAs: profile.links.filter((link) => link.href.startsWith('http')).map((link) => link.href),
};
