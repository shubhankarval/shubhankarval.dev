'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useRailFill } from './RailProgress';
import { RAIL_OFFSET, railSegment } from './rail';

interface RailSegmentProps {
  index: number;
  last?: boolean;
}

// Keep row segments raw and smooth their shared total to prevent gaps between rows.
export default function RailSegment({ index, last }: Readonly<RailSegmentProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...RAIL_OFFSET],
  });

  const first = index === 0;
  const scaleY = useRailFill(index, scrollYProgress);

  return (
    <span ref={ref} aria-hidden className={`${railSegment(first, last)} bg-line`}>
      <motion.span
        style={{ scaleY }}
        // Use the gradient only on the opening row to avoid striping the rail.
        className={`absolute inset-0 origin-top ${
          first ? 'bg-linear-to-b from-accent/30 to-accent' : 'bg-accent'
        }`}
      />
    </span>
  );
}
