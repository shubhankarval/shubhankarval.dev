import type {
  ContributionLevel,
  ContributionWeek,
  GithubStats,
  RecentCommit,
  StatsResponse,
} from '@/types/github';

const LEVEL_BY_QUARTILE: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Pure transform: raw GraphQL response → UI-friendly GithubStats. */
export function mapResponse(raw: StatsResponse): GithubStats {
  const user = raw.user;
  if (!user) throw new Error('GitHub user missing in stats response.');

  const contributionWeeks: ContributionWeek[] = user.last12.contributionCalendar.weeks.map(
    (week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_BY_QUARTILE[day.contributionLevel],
      })),
    })
  );

  const bySha = new Map<string, RecentCommit>();

  for (const repo of user.recentRepos.nodes) {
    for (const branch of repo.branches?.nodes ?? []) {
      for (const commit of branch.target?.history?.nodes ?? []) {
        // Branches share history, so a commit arrives once per branch containing it.
        if (bySha.has(commit.oid)) continue;

        bySha.set(commit.oid, {
          repo: repo.nameWithOwner,
          message: commit.messageHeadline,
          sha: commit.oid,
          url: commit.url,
          committedAt: commit.committedDate,
          additions: commit.additions,
          deletions: commit.deletions,
        });
      }
    }
  }

  const recentCommits: RecentCommit[] = [...bySha.values()]
    .sort((a, b) => new Date(b.committedAt).getTime() - new Date(a.committedAt).getTime())
    .slice(0, 8);

  return {
    recentCommits,
    contributionWeeks,
    fetchedAt: new Date().toISOString(),
  };
}
