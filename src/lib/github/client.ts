import 'server-only';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/**
 * Runs an authenticated GitHub GraphQL query.
 * Throws on HTTP errors and on GraphQL-level "errors".
 *
 * No fetch-level cache options here: this only ever runs inside the
 * 'use cache' scope of getGithubStats(), which captures the mapped result.
 */
export async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Missing GITHUB_TOKEN environment variable.');

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `GitHub GraphQL HTTP ${res.status} ${res.statusText}${body ? `: ${body}` : ''}`
    );
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`);
  }

  if (!json.data) {
    throw new Error('GitHub GraphQL returned an empty response.');
  }

  return json.data;
}
