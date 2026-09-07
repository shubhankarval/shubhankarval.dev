export interface RecentCommit {
  repo: string; // "owner/name"
  message: string; // commit message headline
  sha: string; // commit id
  url: string; // Link to the commit on GitHub
  committedAt: string;
  additions: number;
  deletions: number;
}

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // GitHub's own quartile shading
}

export interface ContributionWeek {
  days: ContributionDay[]; // Sunday-first; the first and last week can be partial
}

export interface GithubStats {
  recentCommits: RecentCommit[]; // 8 most recent commits, public repos
  contributionWeeks: ContributionWeek[]; // last 12 months, oldest week first
  fetchedAt: string;
}

// --- GraphQL responses ---

export type ContributionLevel =
  'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

interface ContributionCalendar {
  weeks: {
    contributionDays: {
      date: string;
      contributionCount: number;
      contributionLevel: ContributionLevel;
    }[];
  }[];
}

export interface BootstrapResponse {
  user: {
    id: string;
  } | null;
}

interface CommitHistoryNode {
  oid: string;
  messageHeadline: string;
  committedDate: string;
  url: string;
  additions: number;
  deletions: number;
}

interface BranchNode {
  target: {
    history?: {
      nodes: CommitHistoryNode[];
    } | null;
  } | null;
}

interface RecentRepoNode {
  nameWithOwner: string;
  branches: {
    nodes: BranchNode[];
  } | null;
}

export interface StatUser {
  last12: { contributionCalendar: ContributionCalendar };
  recentRepos: { nodes: RecentRepoNode[] };
}

export interface StatsResponse {
  user: StatUser | null;
}
