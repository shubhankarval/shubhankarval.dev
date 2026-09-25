import SectionHeader from '@components/ui/SectionHeader';
import { experience, experienceRange } from '@content/experience';
import Timeline from './Timeline';
import TimelineItem from './TimelineItem';

export default function Experience() {
  return (
    <section>
      <SectionHeader title="Experience" meta={experienceRange} />
      <Timeline>
        {experience.map((role, i) => (
          <TimelineItem
            key={`${role.company}-${role.period}`}
            {...role}
            index={i}
            count={experience.length}
          />
        ))}
      </Timeline>
    </section>
  );
}
