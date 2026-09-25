import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr';
import Chip from '@components/ui/Chip';
import StackGroup from './StackGroup';
import { stack, type StackEntry } from '@content/stack';

const core: StackEntry[] = stack.flatMap((group) => group.entries.filter((entry) => entry.core));

const tail = stack
  .map((group) => ({
    ...group,
    entries: group.entries.filter((entry) => !entry.core),
  }))
  .filter((group) => group.entries.length > 0);

const tailCount = tail.reduce((count, group) => count + group.entries.length, 0);

/*
 * Below "lg" the full always-open list in Sidebar is hidden, so this fills in with the same
 * content in less space: below "sm", the toggle sits on the heading's own row, with only the
 * tools worth leading with shown below it and the rest one tap away; from "sm" up there's room
 * to show every group without hiding anything.
 */
export default function StackDisclosure() {
  return (
    <div className="-mt-6 sm:-mt-3 lg:hidden">
      <details className="group sm:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-2xs tracking-widest text-text-faint uppercase">
            Stack
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1 font-mono text-2xs whitespace-nowrap text-text-faint">
            <span className="group-open:hidden">+{tailCount} more</span>
            <span className="hidden group-open:inline">less</span>
            <CaretDownIcon
              aria-hidden
              size={11}
              className="transition-transform group-open:rotate-180"
            />
          </span>
        </summary>
        <span className="flex flex-wrap gap-0.75">
          {core.map((entry) => (
            <Chip key={entry.label} emphasis>
              {entry.label}
            </Chip>
          ))}
        </span>
        <div className="mt-2 grid gap-1.25">
          {tail.map((group) => (
            <div key={group.label} className="flex flex-wrap items-center gap-1">
              <span className="font-mono text-2xs text-text-faint">{group.label}</span>
              {group.entries.map((entry) => (
                <Chip key={entry.label}>{entry.label}</Chip>
              ))}
            </div>
          ))}
        </div>
      </details>

      <div className="hidden sm:block">
        <span className="font-mono text-2xs tracking-widest text-text-faint uppercase">Stack</span>
        <div className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {stack.map((group) => (
            <StackGroup
              key={group.label}
              label={group.label}
              entries={group.entries}
              className="mt-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
