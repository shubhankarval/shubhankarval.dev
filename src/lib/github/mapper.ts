import type {
  ContribWindow,
  GithubStats,
  LanguageStat,
  RecentCommit,
  StatsResponse,
} from '@/types/github';

/**
 * Pure transform: raw GraphQL response -> UI-friendly GithubStats.
 * "years" is the list of contribution years used to sum the all-time windows.
 */
export function mapResponse(raw: StatsResponse, years: number[]): GithubStats {
  const user = raw.user;
  if (!user) throw new Error('GitHub user missing in stats response.');

  // All-time = sum of the per-year contribution windows.
  let commitsAllTime = 0;
  let reviewsAllTime = 0;
  let contributionsAllTime = 0;

  for (const year of years) {
    const y = user[`y${year}`] as ContribWindow | undefined;
    if (!y) continue;
    commitsAllTime += y.totalCommitContributions;
    reviewsAllTime += y.totalPullRequestReviewContributions;
    contributionsAllTime += y.contributionCalendar.totalContributions;
  }

  const last12 = user.last12;

  // Languages: aggregate bytes across repos, then compute percentages.
  const langMap = new Map<string, { size: number; color: string | null }>();
  let totalBytes = 0;

  for (const repo of user.repositories.nodes) {
    if (!repo.languages) continue;
    for (const edge of repo.languages.edges) {
      totalBytes += edge.size;
      const existing = langMap.get(edge.node.name);
      if (existing) {
        existing.size += edge.size;
      } else {
        langMap.set(edge.node.name, {
          size: edge.size,
          color: edge.node.color,
        });
      }
    }
  }

  const languages: LanguageStat[] = [...langMap.entries()]
    .map(([name, { size, color }]) => ({
      name,
      color,
      size,
      percentage: totalBytes > 0 ? (size / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.size - a.size);

  // Recent commits: flatten across repos, sort by date desc, take 5.
  const recentCommits: RecentCommit[] = user.recentRepos.nodes
    .flatMap((repo) => {
      const history = repo.defaultBranchRef?.target?.history;
      if (!history) return [];
      return history.nodes.map((c) => ({
        repo: repo.nameWithOwner,
        message: c.messageHeadline,
        sha: c.oid,
        url: c.url,
        committedAt: c.committedDate,
      }));
    })
    .sort((a, b) => new Date(b.committedAt).getTime() - new Date(a.committedAt).getTime())
    .slice(0, 5);

  return {
    recentCommits,
    totalCommits: {
      allTime: commitsAllTime,
      last12Months: last12.totalCommitContributions,
    },
    totalPullRequests: {
      allTime: user.totalPullRequests.totalCount,
      last12Months: last12.totalPullRequestContributions,
    },
    totalPullRequestsMerged: {
      allTime: user.mergedPullRequests.totalCount,
      last12Months: raw.mergedLast12.issueCount,
    },
    totalPullRequestsReviewed: {
      allTime: reviewsAllTime,
      last12Months: last12.totalPullRequestReviewContributions,
    },
    totalContributions: {
      allTime: contributionsAllTime,
      last12Months: last12.contributionCalendar.totalContributions,
    },
    languages,
    fetchedAt: new Date().toISOString(),
  };
}
