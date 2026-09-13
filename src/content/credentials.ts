export type Credential = {
  title: string;
  detail: string;
  year: string;
  /** Verification page, where one exists. */
  href?: string;
};

export const credentials: Credential[] = [
  {
    title: 'B.S. Computer Science',
    detail: 'Univ. at Buffalo, SUNY',
    year: '2023',
  },
  {
    title: 'AWS Developer',
    detail: 'Associate',
    year: '2025',
    href: 'https://www.credly.com/badges/d2285495-9ed8-4341-95fc-83924c7fcccc',
  },
  {
    title: 'AWS Solutions Architect',
    detail: 'Associate',
    year: '2025',
    href: 'https://www.credly.com/badges/7396e9f5-e3b3-4631-b51c-6014537b1f82',
  },
  {
    title: 'Terraform Associate',
    detail: 'HashiCorp',
    year: '2025',
    href: 'https://www.credly.com/badges/9a83f926-71ea-4c87-b9fe-252981e26fbc',
  },
];
