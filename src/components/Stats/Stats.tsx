import { getGithubStats } from '@lib/github';
import { getLeetcodeStats } from '@lib/leetcode';

export default async function Stats() {
  const githubStats = await getGithubStats();
  const leetcodeStats = await getLeetcodeStats();

  return (
    <div className="min-h-screen w-full p-6">
      <pre className="text-sm wrap-break-word whitespace-pre-wrap">
        {JSON.stringify({ github: githubStats, leetcode: leetcodeStats }, null, 2)}
      </pre>
    </div>
  );
}
