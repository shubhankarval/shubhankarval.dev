import { cacheLife } from 'next/cache';
import { GitCommitIcon, CopyrightIcon } from '@phosphor-icons/react/dist/ssr';

import { contact } from '@content/contact';
import { getLatestSiteCommit } from '@lib/github';

// Cached so the copyright year can read the clock without opting the route out of prerendering.
async function getCurrentYear() {
  'use cache';
  cacheLife('weeks');
  return new Date().getFullYear();
}

export default async function Footer() {
  const [currentYear, commit] = await Promise.all([getCurrentYear(), getLatestSiteCommit()]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg-sunken p-6">
        <p className="font-serif text-lg">
          {contact.prompt}
          <small className="mt-0.5 block font-mono text-2xs text-text-faint">{contact.meta}</small>
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="
            inline-flex items-center rounded-sm bg-text px-3.5 py-1.75 font-mono text-xs text-bg transition-[transform,opacity] hover:-translate-y-px
            hover:opacity-90
          "
        >
          {contact.email}
        </a>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 font-mono text-2xs text-text-faint">
        {commit && (
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Latest commit ${commit.sha} on GitHub`}
            className="inline-flex items-center gap-1.25 transition-colors hover:text-text"
          >
            <GitCommitIcon aria-hidden size={14} />
            {commit.sha}
          </a>
        )}
        <div className="inline-flex items-center gap-1.25">
          <CopyrightIcon aria-hidden size={14} />
          <p>
            {currentYear} &middot; {contact.colophon}
          </p>
        </div>
      </footer>
    </>
  );
}
