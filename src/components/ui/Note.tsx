import type { ReactNode } from 'react';

const trigger = 'relative cursor-help border-b border-line-strong';

// Split out only because a ~20-utility chain inline makes the JSX unreadable.
const tooltip = [
  'after:pointer-events-none after:absolute after:top-[calc(100%+8px)] after:left-0 after:z-15',
  'after:content-[attr(data-note)] after:w-max after:max-w-65 after:px-2.25 after:py-1.5',
  'after:rounded-sm after:border after:border-line after:bg-bg-raised after:shadow-popover',
  'after:font-mono after:text-[11px] after:leading-normal after:text-text-muted',
  'after:-translate-y-[3px] after:opacity-0 after:transition',
  'hover:after:translate-y-0 hover:after:opacity-100',
  'focus-visible:after:translate-y-0 focus-visible:after:opacity-100',
].join(' ');

interface NoteProps {
  note: string;
  href?: string;
  children: ReactNode;
}

export default function Note({ note, href, children }: Readonly<NoteProps>) {
  if (href) {
    return (
      <a className={`${trigger} ${tooltip}`} data-note={note} href={href}>
        {children}
      </a>
    );
  }

  return (
    <span className={`${trigger} ${tooltip}`} data-note={note}>
      {children}
    </span>
  );
}
