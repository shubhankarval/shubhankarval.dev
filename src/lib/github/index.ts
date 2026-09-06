import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import type { BootstrapResponse, GithubStats, StatsResponse } from '@/types/github';
import { createGraphQLClient } from '@lib/graphql';
import { profile } from '@content/profile';
import { mapResponse } from './mapper';
import { BOOTSTRAP_QUERY, STATS_QUERY } from './queries';

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

  const login = profile.githubUsername;

  // 1) Get the node id, used to filter commit history down to this author.
  const boot = await githubGraphQL<BootstrapResponse>(BOOTSTRAP_QUERY, { login });
  if (!boot?.user) throw new Error(`Github user "${login}" not found.`);

  // 2) Fetch everything else in one request.
  const raw = await githubGraphQL<StatsResponse>(STATS_QUERY, {
    login,
    userId: boot.user.id,
  });

  return mapResponse(raw);
}
