import SectionHeader from '@components/ui/SectionHeader';
import { projects, projectsHref } from '@content/projects';
import ProjectCard from './ProjectCard';

export default function Work() {
  return (
    <section>
      <SectionHeader title="Work" link={{ label: 'see all', href: projectsHref, arrow: true }} />
      <div className="grid gap-3 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
