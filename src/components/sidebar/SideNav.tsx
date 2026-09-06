import type { ProfileLink } from '@content/profile';

interface SideNavProps {
  links: ProfileLink[];
}

export default function SideNav({ links }: SideNavProps) {
  return (
    <nav className="flex flex-col gap-px font-mono text-xs">
      {links.map(({ label, href, primary }) => {
        const external = href.startsWith('http');

        return (
          <a
            key={label}
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            className={`group -mx-2 flex items-center justify-between rounded-sm px-2 py-1.25 transition-colors hover:bg-bg-sunken ${
              primary ? 'text-accent' : 'text-text-muted hover:text-text'
            }`}
          >
            {label}
            <span
              aria-hidden
              className="text-[10px] opacity-0 transition-opacity group-hover:opacity-50"
            >
              ↗
            </span>
          </a>
        );
      })}
    </nav>
  );
}
