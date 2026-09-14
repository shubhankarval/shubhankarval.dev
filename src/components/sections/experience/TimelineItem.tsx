import type { Role } from '@content/experience';
import TimelineDot from './TimelineDot';

// The rail runs the full height of the list, so the end rows hide the overhang beyond the first
// and last dots. Each mask butts against its dot's edge rather than its centre, or it would paint
// a 1px slit across the dot once lit. Selection is by type: the rail spans precede the rows, so
// first: would match nothing. bg-inherit tracks each row's own hover colour.
const railMaskTop = [
  'first-of-type:before:absolute',
  'first-of-type:before:top-0',
  'first-of-type:before:left-7.5',
  'first-of-type:before:z-20',
  'first-of-type:before:h-5.75',
  'first-of-type:before:w-px',
  'first-of-type:before:bg-inherit',
  'first-of-type:before:transition-colors',
  'first-of-type:before:content-[""]',
].join(' ');

const railMaskBottom = [
  'last-of-type:after:absolute',
  'last-of-type:after:top-7.5',
  'last-of-type:after:bottom-0',
  'last-of-type:after:left-7.5',
  'last-of-type:after:z-20',
  'last-of-type:after:w-px',
  'last-of-type:after:bg-inherit',
  'last-of-type:after:transition-colors',
  'last-of-type:after:content-[""]',
].join(' ');

export default function TimelineItem({
  company,
  title,
  context,
  period,
  summary,
  first,
}: Readonly<Role & { first?: boolean }>) {
  return (
    <li
      className={`relative border-b border-line bg-bg-raised p-4 pl-12 transition-colors last-of-type:border-b-0 hover:bg-bg-sunken ${railMaskTop} ${railMaskBottom}
      `}
    >
      <TimelineDot first={first} />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-medium">{company}</h3>
        <span className="font-mono text-2xs whitespace-nowrap text-text-faint tabular-nums">
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
