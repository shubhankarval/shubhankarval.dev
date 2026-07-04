// GraphQL documents + builders. Kept pure so they're easy to read and test.
export const BOOTSTRAP_QUERY = /* GraphQL */ `
  query GithubBootstrap($login: String!) {
    user(login: $login) {
      id
      contributionsCollection {
        contributionYears
      }
    }
  }
`;

// contributionsCollection spans at most 1 year, so all-time = sum of one
// aliased window per contribution year. The current year is capped to "now".
function buildYearAliases(years: number[]): string {
  const now = new Date().toISOString();
  const currentYear = new Date().getFullYear();

  return years
    .map((year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = year === currentYear ? now : `${year}-12-31T23:59:59Z`;
      return `
        y${year}: contributionsCollection(from: "${from}", to: "${to}") {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
          }
        }
      `;
    })
    .join('\n');
}

export function buildStatsQuery(years: number[]): string {
  return /* GraphQL */ `
    query GithubStats($login: String!, $userId: ID!, $mergedLast12Query: String!) {
      user(login: $login) {
        # All-time authored PR totals
        totalPullRequests: pullRequests {
          totalCount
        }
        mergedPullRequests: pullRequests(states: MERGED) {
          totalCount
        }

        # Rolling last-12-months window (GitHub's default range)
        last12: contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
          }
        }

        # Languages: public, owned, non-fork repos (top 100 by last push)
        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          privacy: PUBLIC
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }

        # Candidate repos for recent commits, newest push first
        recentRepos: repositories(
          first: 20
          ownerAffiliations: OWNER
          isFork: false
          privacy: PUBLIC
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            nameWithOwner
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 5, author: { id: $userId }) {
                    nodes {
                      oid
                      messageHeadline
                      committedDate
                      url
                    }
                  }
                }
              }
            }
          }
        }

        # All-time contributions, one window per year (summed in the mapper)
        ${buildYearAliases(years)}
      }

      # Merged PRs authored in the last 12 months (search is a top-level field)
      mergedLast12: search(query: $mergedLast12Query, type: ISSUE) {
        issueCount
      }
    }
  `;
}
