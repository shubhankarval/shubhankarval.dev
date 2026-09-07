import { cacheLife } from 'next/cache';
import { contact } from '@content/contact';

// Cached so the copyright year can read the clock without opting the route out of prerendering.
export default async function Footer() {
  'use cache';
  cacheLife('days');

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg-sunken p-6">
        <p className="font-serif text-lg">
          {contact.prompt}
          <small className="mt-0.5 block font-mono text-[11px] text-text-faint">
            {contact.meta}
          </small>
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="
            inline-flex items-center rounded-sm bg-text px-3.5 py-1.75 font-mono text-sm text-bg transition-[transform,opacity] hover:-translate-y-px
            hover:opacity-90
          "
        >
          {contact.email}
        </a>
      </div>
      <footer className="border-t border-line pt-4 text-right font-mono text-[11px] text-text-faint">
        &copy; {new Date().getFullYear()} ∙ {contact.colophon}
      </footer>
    </>
  );
}
