import type { ReactNode } from 'react';
import type { Credential } from '@content/credentials';

const row = 'flex items-baseline justify-between gap-3 px-4 py-3';

export default function CredentialItem({ title, detail, year, href }: Readonly<Credential>) {
  const body: ReactNode = (
    <>
      <div>
        <strong className="block text-sm font-medium">
          {title}
          {href && (
            <span
              aria-hidden
              className="ml-1 text-[10px] opacity-0 transition-opacity group-hover:opacity-50"
            >
              ↗
            </span>
          )}
        </strong>
        <small className="mt-px block font-mono text-[10px] text-text-faint">{detail}</small>
      </div>
      <span className="font-mono text-[11px] text-text-faint tabular-nums">{year}</span>
    </>
  );

  return (
    // The two-per-row divider rules assume an even number of credentials, as the mockup does.
    <li className="border-b border-line last:border-b-0 lg:border-r lg:nth-[2n]:border-r-0 lg:nth-last-[-n+2]:border-b-0">
      {href ? (
        <a
          href={href}
          {...(href.startsWith('http') && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
          className={`${row} group transition-colors hover:bg-bg-sunken`}
        >
          {body}
        </a>
      ) : (
        <div className={row}>{body}</div>
      )}
    </li>
  );
}
