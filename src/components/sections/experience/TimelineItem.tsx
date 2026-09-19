import type { Role } from '@content/experience';
import TimelineDot from './TimelineDot';

// The rail runs the full height of the list, so the end rows hide the overhang beyond the first
// and last dots. Each mask butts against its dot's edge rather than its centre, or it would paint
// a 1px slit across the dot once lit. Selection is by type: the rail spans precede the rows, so
// first: would match nothing. bg-inherit tracks each row's own hover colour.
const railMaskTop = [
  'first-of-type:before:absolute',
  'first-of-type:before:top-0',
  'first-of-type:before:left-(--rail-x)',
  'first-of-type:before:z-20',
  'first-of-type:before:h-(--rail-y)',
  'first-of-type:before:w-px',
  'first-of-type:before:bg-inherit',
  'first-of-type:before:transition-colors',
  'first-of-type:before:content-[""]',
].join(' ');

const railMaskBottom = [
  'last-of-type:after:absolute',
  'last-of-type:after:top-[calc(var(--rail-y)+7px)]',
  'last-of-type:after:bottom-0',
  'last-of-type:after:left-(--rail-x)',
  'last-of-type:after:z-20',
  'last-of-type:after:w-px',
  'last-of-type:after:bg-inherit',
  'last-of-type:after:transition-colors',
  'last-of-type:after:content-[""]',
].join(' ');

// Text clears the rail by the same gap at every width, so the gutter shrinks with it rather than
// spending a fifth of a narrow card on empty space.
const row =
  'relative border-b border-line bg-bg-raised p-(--rail-pad) pl-[calc(var(--rail-x)+1.125rem)] transition-colors last-of-type:border-b-0 hover:bg-bg-sunken';

export default function TimelineItem({
  company,
  title,
  context,
  period,
  summary,
  first,
}: Readonly<Role & { first?: boolean }>) {
  return (
    <li className={`${row} ${railMaskTop} ${railMaskBottom}`}>
      <TimelineDot first={first} />
      {/* The period drops to its own line rather than squeezing the company name on a narrow card. */}
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
