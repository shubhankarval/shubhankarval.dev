import Chip from '@components/ui/Chip';
import type { StackEntry } from '@content/stack';

interface StackGroupProps {
  label: string;
  entries: StackEntry[];
  className?: string;
}

export default function StackGroup({
  label,
  entries,
  className = 'mt-3',
}: Readonly<StackGroupProps>) {
  return (
    <div className={className}>
      <span className="font-mono text-2xs text-text-faint">{label}</span>
      <div className="mt-1 flex flex-wrap gap-0.75">
        {entries.map((entry) => (
          <Chip key={entry.label} emphasis={entry.core}>
            {entry.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
