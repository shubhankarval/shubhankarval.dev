import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';

import type { BootstrapResponse, GithubStats, StatsResponse } from '@/types/github';
import { createGraphQLClient } from '@lib/graphql';
import { mapResponse } from './mapper';
import { BOOTSTRAP_QUERY, buildStatsQuery } from './queries';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubGraphQL = createGraphQLClient({
  endpoint: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
  label: 'GitHub',
});

/**
 * Cached Github stats - call directly in a Server Component.
 * Caching (Cache Components / 'use cache'):
 * - cacheLife('github') uses the custom profile in next.config.ts (revalidate 1h, expire 2 days).
 * - Revalidation is request-driven: after the hour, the "next" request serves the cached value and refreshes in the background. If nobody visits, nothing runs - no background timer, zero Github calls while idle.
 * - cacheTag('github-stats') allows on-demand purge via revalidateTag.
 */
export async function getGithubStats(): Promise<GithubStats> {
  'use cache';
  cacheLife('github');
  cacheTag('github-stats');

  const login = GITHUB_USERNAME;
  if (!login) throw new Error('Missing GITHUB_USERNAME environment variable.');

  // 1) Get node id (to filter commits by author) + contribution years (for all-time).
  const boot = await githubGraphQL<BootstrapResponse>(BOOTSTRAP_QUERY, { login });
  if (!boot?.user) throw new Error(`GitHub user "${login}" not found.`);

  const userId = boot.user.id;
  const years = boot.user.contributionsCollection.contributionYears;
  console.log(`GitHub user ${login} has contributions in years: ${years.join(', ')}`);

  // Merged PRs in the Last 12 months (search needs a date-bounded query string).
  const since = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // YYYY-MM-DD

  const mergedLast12Query = `is:pr author:${login} is:merged merged:>=${since}`;

  // 2) Fetch everything else in one request.
  const raw = await githubGraphQL<StatsResponse>(buildStatsQuery(years), {
    login,
    userId,
    mergedLast12Query,
  });

  return mapResponse(raw, years);
}
