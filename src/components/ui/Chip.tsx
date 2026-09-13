import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  emphasis?: boolean;
}

export default function Chip({ children, emphasis = false }: Readonly<ChipProps>) {
  return (
    <span
      className={`rounded-[3px] border bg-bg-raised px-1.5 font-mono text-2xs ${
        emphasis ? 'border-line-strong text-text' : 'border-line text-text-muted'
      }`}
    >
      {children}
    </span>
  );
}
