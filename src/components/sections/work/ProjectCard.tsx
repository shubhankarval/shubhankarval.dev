import type { Project } from '@content/projects';

export default function ProjectCard({
  name,
  href,
  description,
  language,
  languageColor,
}: Readonly<Project>) {
  return (
    <a
      href={href}
      {...(href.startsWith('http') && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      className="
        flex flex-col gap-2 rounded-lg border border-line bg-bg-raised p-4 transition-[border-color,transform] hover:-translate-y-0.5
        hover:border-line-strong
      "
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-medium lowercase">{name}</h3>
        <span className="inline-flex items-center gap-1.25 font-mono text-[11px] text-text-faint">
          <i aria-hidden className="size-1.75 rounded-full" style={{ background: languageColor }} />
          {language}
        </span>
      </div>

      <p className="flex-1 text-sm leading-[1.65] text-text-muted">{description}</p>

      {/* <div className="flex gap-4 border-t border-line pt-2 font-mono text-[11px] text-text-faint">
        <span>* 140</span>
        <span>updated 3d ago</span>
      </div> */}
    </a>
  );
}
