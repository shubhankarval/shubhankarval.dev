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
        className="rounded-[3px] border border-line bg-bg-sunken px-1 py-px font-mono text-2xs text-text-muted"
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
      className="
        flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-line py-2 text-xs last:border-b-0 sm:grid sm:grid-cols-[70px_1fr_auto] sm:gap-3
      "
    >
      <time dateTime={committedAt} className="pt-0.75 font-mono text-2xs text-text-faint">
        {formatRelativeTime(committedAt, now)}
      </time>

      {/* Below sm the repo moves onto the meta line so the message gets a full row of its own. */}
      <b className="font-medium text-text sm:hidden">{label}</b>

      <span className="ml-auto inline-flex gap-1 font-mono text-2xs whitespace-nowrap tabular-nums sm:col-start-3 sm:row-start-1 sm:ml-0">
        <span className="text-[#6ad2a0]">+{additions}</span>
        <span aria-hidden className="text-text-faint">
          /
        </span>
        <span className="text-[#e0705a]">&minus;{deletions}</span>
      </span>

      <span className="basis-full leading-[1.65] text-text-muted sm:col-start-2 sm:row-start-1 sm:basis-auto">
        <b className="hidden font-medium text-text sm:inline">{label} &mdash; </b>
        {renderMessage(message)}
      </span>
    </a>
  );
}
