'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { RAIL_OFFSET, railSegment } from './rail';

interface RailSegmentProps {
  first?: boolean;
  last?: boolean;
}

/*
 * Each row owns its slice of the rail and resolves it against the same viewport line as the dots,
 * so the fill stays continuous without anything measuring the list: rows are contiguous, so one
 * reads 1 at the exact scroll position the next reads 0.
 *
 * The scroll link is raw rather than sprung - a spring would let a row lag behind the one below it
 * and tear a gap in the line, and reading the same value as the dots is what keeps a dot lighting
 * precisely as the fill sweeps through it.
 */
export default function RailSegment({ first, last }: Readonly<RailSegmentProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...RAIL_OFFSET],
  });

  return (
    <span ref={ref} aria-hidden className={`${railSegment(first, last)} bg-line`}>
      <motion.span
        style={{ scaleY: scrollYProgress }}
        // Only the opening row fades in; a gradient per row would stripe the rail.
        className={`absolute inset-0 origin-top ${
          first ? 'bg-linear-to-b from-accent/30 to-accent' : 'bg-accent'
        }`}
      />
    </span>
  );
}
