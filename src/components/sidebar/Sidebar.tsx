import { profile } from '@content/profile';
import { stack } from '@content/stack';
import AvailabilityBadge from './AvailabilityBadge';
import LocalTime from './LocalTime';
import NamePronunciation from './NamePronunciation';
import SideNav from './SideNav';
import StackGroup from './StackGroup';

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:scrollbar-thin lg:overflow-y-auto lg:pr-2">
      <div>
        <div
          aria-hidden
          className="
            size-12 rounded-full border border-line-strong
            bg-[radial-gradient(circle_at_30%_25%,var(--accent),transparent_55%),linear-gradient(135deg,var(--bg-sunken),var(--line-strong))]
          "
        />
        <h1 className="mt-3 font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.02em] whitespace-nowrap">
          {profile.name}
        </h1>
        <NamePronunciation name={profile.name} ipa={profile.ipa} respelling={profile.respelling} />
        <p className="mt-3 text-sm text-text-muted">{profile.role}</p>
        <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2 font-mono text-[11px] text-text-faint">
          <span>{profile.location}</span>
          <LocalTime timeZone={profile.timeZone} />
        </div>
        <AvailabilityBadge label={profile.availability} />
      </div>

      <div>
        <span className="font-mono text-[10px] tracking-widest text-text-faint uppercase">
          Stack
        </span>
        {stack.map((group) => (
          <StackGroup key={group.label} label={group.label} entries={group.entries} />
        ))}
      </div>

      <SideNav links={profile.links} />
    </aside>
  );
}
