import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

const description =
  'Full-stack engineer at JPMorgan Chase, building React and TypeScript frontends on Spring Boot and AWS, plus the AI tooling that ships them faster.';

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.name,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: profile.siteRepo,
    title: profile.name,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.name,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
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
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="/analytics.js"
            data-website-id="ac8f87ba-1d3c-4881-9075-8d4f2b5aad2a"
            data-domains="shubhankarval.dev,www.shubhankarval.dev"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
