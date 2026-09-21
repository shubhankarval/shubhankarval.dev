'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { RAIL_OFFSET, RAIL_GEOMETRY } from './rail';

// Spans the list's full height so fill position maps 1:1 onto the reading line, which is what
// lets the dots resolve their own state against the same anchor. The rows mask the overhang.
// z-10 lifts it over the rows, which paint after it in tree order.
const rail = 'absolute inset-y-0 left-(--rail-x) z-10 w-px';

export default function Timeline({ children }: Readonly<{ children: ReactNode }>) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [...RAIL_OFFSET] });
  const smoothed = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  // The scroll link is positional, not decorative - only the spring easing is dropped.
  const progress = useReducedMotion() ? scrollYProgress : smoothed;

  return (
    <ol
      ref={ref}
      className={`glass relative isolate overflow-hidden rounded-lg border border-line ${RAIL_GEOMETRY}`}
    >
      <span aria-hidden className={`${rail} bg-line`} />
      <motion.span
        aria-hidden
        style={{ scaleY: progress }}
        className={`${rail} origin-top bg-linear-to-b from-accent/30 to-accent`}
      />
      {children}
    </ol>
  );
}
