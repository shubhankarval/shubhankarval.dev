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
        first: 10
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          nameWithOwner
          # Every branch, not just the default one, newest tip first.
          # 10 repos x 10 branches x 5 commits stays well inside the node limit.
          branches: refs(
            refPrefix: "refs/heads/"
            first: 10
            orderBy: { field: TAG_COMMIT_DATE, direction: DESC }
          ) {
            nodes {
              target {
                ... on Commit {
                  history(first: 5, author: { id: $userId }) {
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
  }
`;
