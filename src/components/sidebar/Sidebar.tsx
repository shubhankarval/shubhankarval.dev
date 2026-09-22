import { profile } from '@content/profile';
import { stack } from '@content/stack';
import LocalTime from './LocalTime';
import NamePronunciation from './NamePronunciation';
import SideNav from './SideNav';
import StackGroup from './StackGroup';

export default function Sidebar() {
  return (
    <aside
      className="
        grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_18.5rem] md:items-end lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:grid-cols-1
        lg:items-stretch lg:overflow-y-auto lg:pr-2
      "
    >
      <div>
        <div
          aria-hidden
          className="
            size-10 rounded-full border border-line-strong
            bg-[radial-gradient(circle_at_30%_25%,var(--accent),transparent_55%),linear-gradient(135deg,var(--bg-sunken),var(--line-strong))] lg:size-12.5
          "
        />

        <h1
          className="
            mt-4 font-serif text-[clamp(1.75rem,8.5vw,2.125rem)] leading-[1.05] tracking-[-0.02em] whitespace-nowrap [word-spacing:0.1em] lg:text-3xl
          "
        >
          {profile.name}
        </h1>

        <NamePronunciation name={profile.name} ipa={profile.ipa} respelling={profile.respelling} />

        <p className="mt-3.5 text-sm text-text-muted">{profile.role}</p>

        <div className="mt-1.5 flex items-baseline justify-between gap-2 border-t border-line pt-2 font-mono text-2xs text-text-faint">
          <span>{profile.location}</span>
          <LocalTime timeZone={profile.timeZone} />
        </div>
      </div>

      <SideNav links={profile.links} className="lg:order-last" />

      <div className="hidden lg:block">
        <span className="font-mono text-2xs tracking-widest text-text-faint uppercase">Stack</span>
        {stack.map((group) => (
          <StackGroup key={group.label} label={group.label} entries={group.entries} />
        ))}
      </div>
    </aside>
  );
}
