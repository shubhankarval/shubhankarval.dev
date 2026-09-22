import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  GlobeSimpleIcon,
  PackageIcon,
} from '@phosphor-icons/react/dist/ssr';

import type { Project, ProjectLinkKind } from '@content/projects';

const linkMeta: Record<ProjectLinkKind, { label: string; Icon: typeof GithubLogoIcon }> = {
  repo: { label: 'source', Icon: GithubLogoIcon },
  npm: { label: 'npm', Icon: PackageIcon },
  website: { label: 'live', Icon: GlobeSimpleIcon },
};

export default function ProjectCard({
  name,
  description,
  language,
  languageColor,
  links,
}: Readonly<Project>) {
  return (
    <article
      className="
        glass flex flex-col gap-2 rounded-lg border border-line p-4 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-line-strong
      "
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium lowercase">{name}</h3>
        <span className="group/lang inline-flex items-center gap-1.25 font-mono text-2xs text-text-faint">
          <span
            aria-hidden
            className="
              relative size-1.75 rounded-full after:absolute after:inset-0 after:rounded-full after:bg-inherit after:content-['']
              motion-safe:group-hover/lang:after:animate-ripple
            "
            style={{ background: languageColor }}
          />
          {language}
        </span>
      </div>

      <p className="flex-1 text-xs leading-[1.65] text-text-muted">{description}</p>

      {links && (
        <div className="flex gap-4 border-t border-line pt-2 font-mono text-2xs text-text-faint">
          {links.map(({ kind, href }) => {
            const { label, Icon } = linkMeta[kind];
            return (
              <a
                key={kind}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                <Icon aria-hidden size={12} />
                {label}
                <ArrowUpRightIcon
                  aria-hidden
                  size={9}
                  weight="bold"
                  className="opacity-50 transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
                />
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
