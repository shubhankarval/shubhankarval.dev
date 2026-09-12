'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { RAIL_OFFSET } from './rail';

export default function TimelineDot({ first = false }: Readonly<{ first?: boolean }>) {
  const ref = useRef<HTMLSpanElement>(null);

  // Spanning the dot itself makes the 7px it occupies the whole transition, so it fills as the
  // line crosses it rather than switching on.
  const { scrollYProgress } = useScroll({ target: ref, offset: [...RAIL_OFFSET] });

  return (
    <span
      ref={ref}
      aria-hidden
      className="absolute top-5.75 left-6.75 z-20 size-1.75 rounded-full border border-line-strong"
    >
      {/* Crossfading an overlay avoids interpolating between two CSS custom properties. */}
      <motion.span
        style={{ opacity: first ? 1 : scrollYProgress }}
        className="absolute -inset-px rounded-full bg-accent"
      />
    </span>
  );
}
