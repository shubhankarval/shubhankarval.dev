export const BOOTSTRAP_QUERY = /* GraphQL */ `
  query GithubBootstrap($login: String!) {
    user(login: $login) {
      id
    }
  }
`;

export const STATS_QUERY = /* GraphQL */ `
  query GithubStats($login: String!, $userId: ID!) {
    user(login: $login) {
      # Day-level calendar backing the contribution heatmap
      last12: contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
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
                history(first: 8, author: { id: $userId }) {
                  nodes {
                    oid
                    messageHeadline
                    committedDate
                    url
                    additions
                    deletions
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
