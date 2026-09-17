import type { ContributionDay, ContributionWeek } from '@/types/github';

const LEVEL_CLASS: Record<ContributionDay['level'], string> = {
  0: 'bg-bg-sunken/55',
  1: 'bg-accent/25',
  2: 'bg-accent/50',
  3: 'bg-accent/75',
  4: 'bg-accent',
};

const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: '2-digit',
  timeZone: 'UTC',
});

function startLabel(date: string): string {
  const [month, year] = MONTH_YEAR.format(new Date(`${date}T00:00:00Z`)).split(' ');
  return `${month.toLowerCase()} '${year}`;
}

interface ContributionGridProps {
  weeks: ContributionWeek[];
}

export default function ContributionGrid({ weeks }: Readonly<ContributionGridProps>) {
  const total = weeks.reduce(
    (sum, week) => sum + week.days.reduce((acc, day) => acc + day.count, 0),
    0
  );

  return (
    <div className="mb-4 pt-1">
      <div className="flex gap-0.75">
        {weeks.map((week, index) => (
          <div
            key={week.days[0].date}
            // GitHub's window starts mid-week, so a short first column holds the
            // tail of that week and has to sit against the bottom row.
            className={`flex flex-col gap-0.75 ${index === 0 ? 'justify-end' : ''}`}
          >
            {week.days.map((day) => (
              <span
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={`size-2.5 rounded-xs ${LEVEL_CLASS[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-2xs font-light text-text-faint">
        <span>{startLabel(weeks[0].days[0].date)}</span>
        <span>{total.toLocaleString()} contributions</span>
        <span>now</span>
      </div>
    </div>
  );
}
