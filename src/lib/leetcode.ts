import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';

import type { LeetcodeStats, LeetcodeQueryResponse } from '@/types/leetcode';
import { createGraphQLClient } from '@lib/graphql';

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME;
const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

const PROBLEMS_SOLVED_QUERY = `
query userProblemsSolved($username: String!) {
  matchedUser(username: $username) {
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

const leetcodeGraphQL = createGraphQLClient({
  endpoint: LEETCODE_GRAPHQL_ENDPOINT,
  label: 'LeetCode',
});

export async function getLeetcodeStats(): Promise<LeetcodeStats> {
  'use cache';
  cacheLife('hours');
  cacheTag('leetcode');

  const username = LEETCODE_USERNAME;
  if (!username) {
    throw new Error('Missing LeetCode username in environment variables.');
  }

  const response = await leetcodeGraphQL<LeetcodeQueryResponse>(PROBLEMS_SOLVED_QUERY, {
    username,
  });

  const solvedProblems = response?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const stats: LeetcodeStats = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  if (solvedProblems) {
    for (const { difficulty, count } of solvedProblems) {
      switch (difficulty) {
        case 'Easy':
          stats.easy = count;
          break;
        case 'Medium':
          stats.medium = count;
          break;
        case 'Hard':
          stats.hard = count;
          break;
      }
    }
  }

  return stats;
}
