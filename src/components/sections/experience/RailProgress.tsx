'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
  useReducedMotion,
} from 'motion/react';
import { RAIL_SPRING } from './rail';

interface RailProgress {
  /** Smoothed number of rows swept by the rail. */
  filled: MotionValue<number>;
  report: (index: number, progress: number) => void;
}

// Keep the fallback inert so rails outside a provider remain harmless.
const RailProgressContext = createContext<RailProgress>({
  filled: motionValue(0),
  report: () => {},
});

// Spring one shared progress value so row segments cannot develop gaps.
export default function RailProgressProvider({ children }: Readonly<{ children: ReactNode }>) {
  const rows = useRef<Map<number, number>>(new Map());
  const total = useMotionValue(0);
  const filled = useSpring(total, RAIL_SPRING);

  const report = useCallback(
    (index: number, progress: number) => {
      rows.current.set(index, progress);
      let sum = 0;
      for (const value of rows.current.values()) {
        sum += value;
      }
      total.set(sum);
    },
    [total]
  );

  const value = useMemo(() => ({ filled, report }), [filled, report]);

  return <RailProgressContext.Provider value={value}>{children}</RailProgressContext.Provider>;
}

// Seed the spring from the current scroll position to avoid animating on page load.
export function useSmoothed(source: MotionValue<number>) {
  const smoothed = useSpring(source, RAIL_SPRING);
  const reduced = useReducedMotion();

  useEffect(() => {
    smoothed.jump(source.get());
  }, [smoothed, source]);

  return reduced ? source : smoothed;
}

/** Reports a row's progress and returns its share of the smoothed total. */
export function useRailFill(index: number, progress: MotionValue<number>) {
  const { filled, report } = useContext(RailProgressContext);

  useMotionValueEvent(progress, 'change', (value) => report(index, value));

  // Motion values do not emit their initial value, so report it on mount.
  useEffect(() => {
    report(index, progress.get());
    return () => report(index, 0);
  }, [index, progress, report]);

  return useTransform(filled, (value) => Math.min(Math.max(value - index, 0), 1));
}
