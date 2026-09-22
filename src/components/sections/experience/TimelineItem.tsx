import type { Role } from '@content/experience';
import RailSegment from './RailSegment';
import TimelineDot from './TimelineDot';

// Keep the text offset aligned with the rail at every width.
const row =
  'relative border-b border-line p-(--rail-pad) pl-[calc(var(--rail-x)+1.125rem)] transition-colors last-of-type:border-b-0 hover:bg-bg-sunken/55';

export default function TimelineItem({
  company,
  title,
  context,
  period,
  summary,
  index,
  count,
}: Readonly<Role & { index: number; count: number }>) {
  return (
    <li className={row}>
      <RailSegment index={index} last={index === count - 1} />
      <TimelineDot first={index === 0} />
      {/* Allow the period to wrap below the company on narrow cards. */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 className="text-base font-medium">{company}</h3>
        <span className="ms-auto font-mono text-2xs whitespace-nowrap text-text-faint tabular-nums">
          {period}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-text-muted">
        {title} <span className="font-mono text-2xs text-text-faint">{`\u00B7 ${context}`}</span>
      </p>
      <p className="mt-3 max-w-[62ch] text-xs leading-[1.75] text-text-muted">{summary}</p>
    </li>
  );
}
