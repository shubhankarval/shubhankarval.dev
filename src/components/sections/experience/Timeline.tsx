import type { ReactNode } from 'react';

import RailProgressProvider from './RailProgress';
import { RAIL_GEOMETRY } from './rail';

// The provider shares one spring progress value across the rows' rail segments.
export default function Timeline({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ol
      className={`glass relative isolate overflow-hidden rounded-lg border border-line ${RAIL_GEOMETRY}`}
    >
      <RailProgressProvider>{children}</RailProgressProvider>
    </ol>
  );
}
