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

  const recentCommits: RecentCommit[] = user.recentRepos.nodes
    .flatMap((repo) => {
      const history = repo.defaultBranchRef?.target?.history;
      if (!history?.nodes) return [];

      return history.nodes.map((c) => ({
        repo: repo.nameWithOwner,
        message: c.messageHeadline,
        sha: c.oid,
        url: c.url,
        committedAt: c.committedDate,
        additions: c.additions,
        deletions: c.deletions,
      }));
    })
    .sort((a, b) => new Date(b.committedAt).getTime() - new Date(a.committedAt).getTime())
    .slice(0, 8);

  return {
    recentCommits,
    contributionWeeks,
    fetchedAt: new Date().toISOString(),
  };
}
