'use client';

import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
const MAX_TILT = 14;
const spring = { stiffness: 220, damping: 18, mass: 0.6 };

export default function Avatar() {
  const reduced = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const smoothX = useSpring(offsetX, spring);
  const smoothY = useSpring(offsetY, spring);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);

  // Mouse only - a tap would leave the orb stuck mid-tilt with no leave event.
  const track = ({
    clientX,
    clientY,
    currentTarget,
    pointerType,
  }: PointerEvent<HTMLDivElement>) => {
    if (reduced || pointerType !== 'mouse') return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    offsetX.set((clientX - left) / width - 0.5);
    offsetY.set((clientY - top) / height - 0.5);
  };

  const settle = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      aria-hidden
      onPointerMove={track}
      onPointerLeave={settle}
      style={{ rotateX, rotateY, transformPerspective: 320 }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      transition={spring}
      className="
        size-10 rounded-full border border-line-strong
        bg-[radial-gradient(circle_at_30%_25%,var(--accent),transparent_55%),linear-gradient(135deg,var(--bg-sunken),var(--line-strong))] lg:size-12.5
      "
    />
  );
}
