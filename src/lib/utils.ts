const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * Compact past-only relative time: "3d ago", "2w ago", "2mo ago".
 * now is required: defaulting to the clock would read it mid-render.
 */
export function formatRelativeTime(iso: string, now: number): string {
  const elapsed = now - new Date(iso).getTime();

  if (elapsed < HOUR) {
    return `${Math.max(1, Math.floor(elapsed / MINUTE))}m ago`;
  }

  if (elapsed < DAY) {
    return `${Math.floor(elapsed / HOUR)}h ago`;
  }

  if (elapsed < WEEK) {
    return `${Math.floor(elapsed / DAY)}d ago`;
  }

  if (elapsed < MONTH) {
    return `${Math.floor(elapsed / WEEK)}w ago`;
  }

  if (elapsed < YEAR) {
    return `${Math.floor(elapsed / MONTH)}mo ago`;
  }

  return `${Math.floor(elapsed / YEAR)}y ago`;
}
