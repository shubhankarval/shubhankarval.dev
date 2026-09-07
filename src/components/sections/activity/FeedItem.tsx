import type { ReactNode } from 'react';
import type { RecentCommit } from '@/types/github';
import { profile } from '@content/profile';
import { formatRelativeTime } from '@lib/utils';

interface FeedItemProps extends RecentCommit {
  /** Timestamp the labels are relative to, so nothing reads the clock mid-render. */
  now: number;
}

/** Backtick spans become <code>, matching how the messages read on GitHub. */
function renderMessage(message: string): ReactNode[] {
  let offset = 0;
  // Odd entries are the captured backtick contents.
  return message.split(/`([^`]+)`/).map((part, i) => {
    const key = `${offset}-${part}`;
    offset += part.length;
    if (i % 2 === 0) return part;
    return (
      <code
        key={key}
        className="rounded-[3px] border border-line bg-bg-sunken px-1 py-px font-mono text-[11px] text-text-muted"
      >
        {part}
      </code>
    );
  });
}

export default function FeedItem({
  repo,
  message,
  url,
  committedAt,
  additions,
  deletions,
  now,
}: Readonly<FeedItemProps>) {
  const owner = profile.githubUsername;
  const label = repo.startsWith(`${owner}/`) ? repo.slice(owner.length + 1) : repo;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="grid grid-cols-[70px_1fr_auto] items-baseline gap-3 border-b border-line py-2 text-sm last:border-b-0"
    >
      <time dateTime={committedAt} className="pt-0.75 font-mono text-[11px] text-text-faint">
        {formatRelativeTime(committedAt, now)}
      </time>
      <span className="leading-[1.65] text-text-muted">
        <b className="font-medium text-text">{label}</b> &mdash; {renderMessage(message)}
      </span>
      <span className="inline-flex gap-1 font-mono text-[11px] whitespace-nowrap tabular-nums">
        <span className="text-[#6ad2a0]">+{additions}</span>
        <span aria-hidden className="text-text-faint">
          /
        </span>
        <span className="text-[#e0705a]">&minus;{deletions}</span>
      </span>
    </a>
  );
}
