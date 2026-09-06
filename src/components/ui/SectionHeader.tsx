interface SectionHeaderProps {
  title: string;
  meta?: string;
  link?: {
    label: string;
    href: string;
    arrow?: boolean;
  };
}

export default function SectionHeader({ title, meta, link }: Readonly<SectionHeaderProps>) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-line pb-2">
      <h2 className="font-serif text-2xl font-medium tracking-[-0.01em]">{title}</h2>
      {meta && (
        <span className="font-mono text-[11px] whitespace-nowrap text-text-faint">{meta}</span>
      )}
      {link && (
        <a
          href={link.href}
          {...(link.href.startsWith('http') && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
          className="font-mono text-[11px] whitespace-nowrap text-text-faint transition-colors hover:text-accent"
        >
          {link.label}
          {link.arrow && (
            <span aria-hidden className="ml-0.5">
              →
            </span>
          )}
        </a>
      )}
    </div>
  );
}
