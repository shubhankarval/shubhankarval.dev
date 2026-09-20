import type { Metadata } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import { profile } from '@content/profile';
import { personJsonLd } from '@lib/jsonLd';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: profile.name,
  description:
    'Full-stack engineer at JPMorgan Chase, building React and TypeScript frontends on Spring Boot and AWS, plus the AI tooling that ships them faster.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
