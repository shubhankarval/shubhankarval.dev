// Public shapes returned to the UI + raw GitHub GraphQL response shapes.

// -- Public types
export interface WindowedCount {
  allTime: number;
  last12Months: number;
}

export interface RecentCommit {
  repo: string; // "owner/name"
  message: string; // commit message headline
  sha: string; // commit oid
  url: string; // Link to the commit on GitHub
  committedAt: string; // ISO-8601
}

export interface LanguageStat {
  name: string;
  color: string | null; // GitHub's Language color
  size: number; // bytes across scanned repos
  percentage: number; // 0-100 share of total scanned bytes
}

export interface GithubStats {
  recentCommits: RecentCommit[]; // 5 most recent commits, public repos
  totalCommits: WindowedCount;
  totalPullRequests: WindowedCount; // authored
  totalPullRequestsMerged: WindowedCount;
  totalPullRequestsReviewed: WindowedCount;
  totalContributions: WindowedCount;
  languages: LanguageStat[]; // with percentage each
  fetchedAt: string; // ISO-8601 snapshot time
}

// -- GraphQL responses
export interface ContribWindow {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: {
    totalContributions: number;
  };
}

export interface BootstrapResponse {
  user: {
    id: string;
    contributionsCollection: {
      contributionYears: number[];
    };
  } | null;
}

interface LanguageEdge {
  size: number;
  node: {
    name: string;
    color: string | null;
  };
}

interface RepoLanguages {
  languages: {
    edges: LanguageEdge[];
  } | null;
}

interface CommitHistoryNode {
  oid: string;
  messageHeadline: string;
  committedDate: string;
  url: string;
}

interface RecentRepoNode {
  nameWithOwner: string;
  defaultBranchRef: {
    target: {
      history?: {
        nodes: CommitHistoryNode[];
      };
    } | null;
  } | null;
}

export interface StatUser {
  totalPullRequests: { totalCount: number };
  mergedPullRequests: { totalCount: number };
  last12: ContribWindow;
  repositories: { nodes: RepoLanguages[] };
  recentRepos: { nodes: RecentRepoNode[] };
  // Per-year aliases: y2019, y2020, ... -> ContribWindow
  [yearAlias: string]: unknown;
}

export interface StatsResponse {
  user: StatUser | null;
  mergedLast12: { issueCount: number };
}
