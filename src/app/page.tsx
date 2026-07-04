import { getGithubStats } from '@lib/github';

export default async function Home() {
  const stats = await getGithubStats();

  return (
    <div className="min-h-screen w-full p-6">
      <pre className="text-sm wrap-break-word whitespace-pre-wrap">
        {JSON.stringify(stats, null, 2)}
      </pre>
    </div>
  );
}
