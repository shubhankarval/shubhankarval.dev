import SectionHeader from '@components/ui/SectionHeader';
import { getGithubStats } from '@lib/github';
import ContributionGrid from './ContributionGrid';
import FeedItem from './FeedItem';

const WEEKS_SHOWN = 45;
const WEEKS_SHOWN_MOBILE = 25;
const COMMITS_SHOWN = 4;
const COMMITS_SHOWN_MOBILE = 3;

export default async function Activity() {
  const stats = await getGithubStats();
  const fetchedAt = Date.parse(stats.fetchedAt);

  return (
    <section>
      <SectionHeader
        title="Activity"
        meta={
          <>
            <span className="max-sm:hidden">{WEEKS_SHOWN} weeks</span>
            <span className="sm:hidden">{WEEKS_SHOWN_MOBILE} weeks</span>
          </>
        }
      />
      <ContributionGrid
        weeks={stats.contributionWeeks.slice(-WEEKS_SHOWN)}
        mobileWeeks={WEEKS_SHOWN_MOBILE}
      />
      {stats.recentCommits.slice(0, COMMITS_SHOWN).map((commit, index) => (
        <FeedItem
          key={commit.sha}
          {...commit}
          now={fetchedAt}
          className={
            index >= COMMITS_SHOWN_MOBILE
              ? 'max-sm:hidden'
              : index === COMMITS_SHOWN_MOBILE - 1
                ? 'max-sm:border-b-0'
                : ''
          }
        />
      ))}
    </section>
  );
}
