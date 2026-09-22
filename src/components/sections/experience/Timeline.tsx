import type { ReactNode } from 'react';

import RailProgressProvider from './RailProgress';
import { RAIL_GEOMETRY } from './rail';

// The provider synchronizes each row's rail segment and dot.
export default function Timeline({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ol
      className={`glass relative isolate overflow-hidden rounded-lg border border-line ${RAIL_GEOMETRY}`}
    >
      <RailProgressProvider>{children}</RailProgressProvider>
    </ol>
  );
}
