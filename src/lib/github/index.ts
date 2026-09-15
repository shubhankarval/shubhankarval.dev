import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import type {
  BootstrapResponse,
  GithubStats,
  SiteCommit,
  StatsResponse,
  SiteCommitResponse,
} from '@/types/github';
import { createGraphQLClient } from '@lib/graphql';
import { profile } from '@content/profile';
import { mapResponse } from './mapper';
import { BOOTSTRAP_QUERY, SITE_COMMIT_QUERY, STATS_QUERY } from './queries';

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

// Latest commit on master for this site's own repo. Returns null so a failure
// degrades to a footer without the commit link rather than a broken page.
export async function getLatestSiteCommit(): Promise<SiteCommit | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('github');

  try {
    const raw = await githubGraphQL<SiteCommitResponse>(SITE_COMMIT_QUERY, {
      owner: profile.githubUsername,
      name: profile.siteRepo,
    });

    const target = raw.repository?.ref?.target;
    if (!target) return null;

    return {
      sha: target.abbreviatedOid,
      url: target.url,
      committedAt: target.committedDate,
    };
  } catch {
    return null;
  }
}
