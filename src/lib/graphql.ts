interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface GraphQLClientConfig {
  /** Absolute URL of the GraphQL endpoint. */
  endpoint: string;
  /**
   * Static headers sent on every request (e.g. { Authorization: "Bearer ..." }).
   * "Content-Type: application/json" is always applied and does not need to be provided here.
   */
  headers?: Record<string, string>;
  /**
   * Human-readable name used in thrown error messages so a failure can be traced
   * back to the right platform (e.g. "GitHub", "Leetcode"). Defaults to "GraphQL".
   */
  label?: string;
  /**
   * Extra fetch options merged into every request - e.g. { next: { revalidate } }
   * or { cache: "no-store" }. "method", "body", and "headers" are managed
   * internally and intentionally excluded.
   */
  fetchOptions?: Omit<RequestInit, 'method' | 'body' | 'headers'>;
}

/**
 * Runs a single GraphQL query against any endpoint.
 * Throws on HTTP errors and on GraphQL-level "errors".
 */
async function graphqlRequest<T>(
  config: GraphQLClientConfig,
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const { endpoint, headers = {}, label = 'GraphQL', fetchOptions = {} } = config;

  const res = await fetch(endpoint, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `${label} GraphQL HTTP ${res.status} ${res.statusText}${body ? `: ${body}` : ''}`
    );
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(`${label} GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`);
  }

  if (!json.data) {
    throw new Error(`${label} GraphQL returned an empty response.`);
  }

  return json.data;
}

export function createGraphQLClient(config: GraphQLClientConfig) {
  return <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> =>
    graphqlRequest<T>(config, query, variables);
}
