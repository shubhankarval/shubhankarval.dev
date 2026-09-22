import type { ReactNode } from 'react';
import { RAIL_GEOMETRY } from './rail';

// The rail is drawn per row rather than once across the list, so the end rows can stop it at their
// own dot. Only the geometry the rows share lives here.
export default function Timeline({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ol
      className={`glass relative isolate overflow-hidden rounded-lg border border-line ${RAIL_GEOMETRY}`}
    >
      {children}
    </ol>
  );
}
