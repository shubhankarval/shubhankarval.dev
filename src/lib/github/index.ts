import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import type { BootstrapResponse, GithubStats, StatsResponse } from '@/types/github';
import { createGraphQLClient } from '@lib/graphql';
import { mapResponse } from './mapper';
import { BOOTSTRAP_QUERY, STATS_QUERY } from './queries';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const githubGraphQL = createGraphQLClient({
  endpoint: GITHUB_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN!}`,
  },
  label: 'GitHub',
});

// Cached Github stats - call directly in a Server Component.
export async function getGithubStats(): Promise<GithubStats> {
  'use cache';
  cacheLife('hours');
  cacheTag('github');

  const login = GITHUB_USERNAME;
  if (!login) throw new Error('Missing GITHUB_USERNAME environment variable.');

  // 1) Get the node id, used to filter commit history down to this author.
  const boot = await githubGraphQL<BootstrapResponse>(BOOTSTRAP_QUERY, { login });
  if (!boot?.users?.[0]?.ids) throw new Error(`Github user "${login}" not found.`);

  // 2) Fetch everything else in one request.
  const raw = await githubGraphQL<StatsResponse>(STATS_QUERY, {
    login,
    userId: boot.users[0].ids,
  });

  return mapResponse(raw);
}
