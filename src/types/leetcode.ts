type ProblemsSolvedQueryResponse = {
  submitStatsGlobal: {
    acSubmissionNum: {
      difficulty: string;
      count: number;
    }[];
  };
};

export type LeetcodeQueryResponse = {
  matchedUser: ProblemsSolvedQueryResponse;
};

export type LeetcodeStats = {
  easy: number;
  medium: number;
  hard: number;
};
