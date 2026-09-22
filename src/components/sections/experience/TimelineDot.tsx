'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';

import { useSmoothed } from './RailProgress';
import { RAIL_OFFSET } from './rail';

const dot =
  'absolute top-(--rail-y) left-[calc(var(--rail-x)-3px)] z-20 size-1.75 rounded-full border border-line-strong bg-glass-solid transition-colors';

export default function TimelineDot({ first = false }: Readonly<{ first?: boolean }>) {
  const ref = useRef<HTMLSpanElement>(null);

  // Track the dot's full size so it fills as the line crosses it.
  const { scrollYProgress } = useScroll({ target: ref, offset: [...RAIL_OFFSET] });
  const opacity = useSmoothed(scrollYProgress);

  return (
    <span ref={ref} aria-hidden className={dot}>
      {/* Crossfade an overlay instead of interpolating CSS custom properties. */}
      <motion.span
        style={{ opacity: first ? 1 : opacity }}
        className="absolute -inset-px rounded-full bg-accent"
      />
    </span>
  );
}
