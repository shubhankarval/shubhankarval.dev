import SectionHeader from '@components/ui/SectionHeader';
import { getGithubStats } from '@lib/github';
import ContributionGrid from './ContributionGrid';
import FeedItem from './FeedItem';

const WEEKS_SHOWN = 25;
const COMMITS_SHOWN = 4;

export default async function Activity() {
  const stats = await getGithubStats();
  const fetchedAt = Date.parse(stats.fetchedAt);

  return (
    <section>
      <SectionHeader title="Activity" meta={`last ${WEEKS_SHOWN} weeks`} />
      <ContributionGrid weeks={stats.contributionWeeks.slice(-WEEKS_SHOWN)} />
      {stats.recentCommits.slice(0, COMMITS_SHOWN).map((commit) => (
        <FeedItem key={commit.sha} {...commit} now={fetchedAt} />
      ))}
    </section>
  );
}
