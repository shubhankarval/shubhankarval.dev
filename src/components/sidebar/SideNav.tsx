import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { ProfileLink } from '@content/profile';

interface SideNavProps {
  links: ProfileLink[];
  className?: string;
}

// Derived from the href so content stays free of presentation keys.
function iconFor(href: string) {
  if (href.startsWith('mailto:')) return EnvelopeSimpleIcon;
  if (href.includes('github.com')) return GithubLogoIcon;
  if (href.includes('linkedin.com')) return LinkedinLogoIcon;
  return FileTextIcon;
}

export default function SideNav({ links, className = '' }: Readonly<SideNavProps>) {
  return (
    <nav
      className={`grid grid-cols-2 gap-2 font-mono text-xs lg:flex lg:flex-col lg:gap-px ${className}`}
    >
      {links.map(({ label, href, primary }) => {
        const external = href.startsWith('http');
        const LinkIcon = iconFor(href);

        return (
          <a
            key={label}
            href={href}
            {...(external && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
            className={`
              group flex min-h-10.5 items-center gap-2 rounded-lg border px-3 transition-colors lg:-mx-2 lg:min-h-0 lg:justify-between lg:gap-0
              lg:rounded-sm lg:border-0 lg:bg-transparent lg:px-2 lg:py-1.25 lg:hover:bg-bg-sunken
              ${
                primary
                  ? 'border-accent/40 bg-accent/12 text-accent hover:border-accent/60 hover:bg-accent/18'
                  : 'border-line bg-bg-raised text-text-muted hover:border-line-strong hover:text-text'
              }`}
          >
            <LinkIcon aria-hidden size={14} className="shrink-0 lg:hidden" />
            {label}
            <ArrowUpRightIcon
              aria-hidden
              size={10}
              weight="bold"
              className="hidden opacity-0 transition-opacity group-hover:opacity-50 lg:block"
            />
          </a>
        );
      })}
    </nav>
  );
}
