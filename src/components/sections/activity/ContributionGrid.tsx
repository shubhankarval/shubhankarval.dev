import type { ContributionDay, ContributionWeek } from '@/types/github';

const LEVEL_CLASS: Record<ContributionDay['level'], string> = {
  0: 'border-line bg-bg-sunken',
  1: 'border-transparent bg-accent/25',
  2: 'border-transparent bg-accent/50',
  3: 'border-transparent bg-accent/75',
  4: 'border-transparent bg-accent',
};

interface ContributionGridProps {
  weeks: ContributionWeek[];
}

export default function ContributionGrid({ weeks }: Readonly<ContributionGridProps>) {
  return (
    <div className="mb-4 flex gap-0.75 overflow-hidden rounded-lg border border-line bg-bg-raised p-4">
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
              className={`size-2.5 rounded-xs border ${LEVEL_CLASS[day.level]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
