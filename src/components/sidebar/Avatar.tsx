'use client';

import { useEffect, useRef, type PointerEvent, type MouseEvent } from 'react';

const MAX_TILT_DEG = 11;
const TAP_SETTLE_MS = 420;

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// DevTools touch emulation and real touchscreens both report no hover capability - pointerType on
// the event itself isn't reliable across Chrome versions, so gate on the media feature instead.
const cannotHover = () => matchMedia('(hover: none)').matches;

export default function Avatar() {
  // Captured on enter, while the orb is untransformed - reading it mid-tilt feeds back on itself.
  const rect = useRef<DOMRect | null>(null);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
    };
  }, []);

  const enter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && !reducedMotion()) {
      rect.current = e.currentTarget.getBoundingClientRect();
    }
  };
  const track = (e: PointerEvent<HTMLDivElement>) => {
    if (!rect.current) return;
    const { left, top, width, height } = rect.current;
    const px = ((e.clientX - left) / width) * 2 - 1;
    const py = ((e.clientY - top) / height) * 2 - 1;

    // The scale is what actually reads as motion - at this size a few degrees of rotation on a
    // flat gradient circle is nearly invisible on its own.
    e.currentTarget.style.transform = `perspective(500px) rotateY(${px * MAX_TILT_DEG}deg) rotateX(${-py * MAX_TILT_DEG}deg) scale(1.06)`;
  };

  const settle = (e: PointerEvent<HTMLDivElement>) => {
    rect.current = null;
    e.currentTarget.style.transform = '';
  };

  // Touch has no hover, so a tap plays the same tilt as a one-shot before settling back.
  const tap = (e: MouseEvent<HTMLDivElement>) => {
    if (!cannotHover() || reducedMotion()) return;

    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    const px = ((e.clientX - left) / width) * 2 - 1;
    const py = ((e.clientY - top) / height) * 2 - 1;

    target.style.transform = `perspective(500px) rotateY(${px * MAX_TILT_DEG}deg) rotateX(${-py * MAX_TILT_DEG}deg) scale(1.06)`;

    if (tapTimeout.current) clearTimeout(tapTimeout.current);

    tapTimeout.current = setTimeout(() => {
      target.style.transform = '';
    }, TAP_SETTLE_MS);
  };

  return (
    <div
      aria-hidden
      onPointerEnter={enter}
      onPointerMove={track}
      onPointerLeave={settle}
      onClick={tap}
      className="
        size-10 rounded-full border border-line-strong
        bg-[radial-gradient(circle_at_30%_25%,var(--accent),transparent_55%),linear-gradient(135deg,var(--bg-sunken),var(--line-strong))]
        transition-transform duration-420 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform lg:size-12.5
      "
    />
  );
}
