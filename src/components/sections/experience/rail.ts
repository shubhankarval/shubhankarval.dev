// Shared viewport anchor for rail segments and dots.

export const RAIL_OFFSET = ['start 30%', 'end 30%'] as const;

// Shared spring keeps the fill and dots moving at the same rate without overshoot.
export const RAIL_SPRING = {
  stiffness: 40,
  damping: 16,
  restDelta: 0.001,
} as const;

// Shared rail geometry keeps the segments, dots, and row padding aligned.
export const RAIL_GEOMETRY = [
  'text-base',
  '[--rail-pad:clamp(1rem,0.8919rem+0.5405vw,1.25rem)]',
  '[--rail-x:clamp(1.25rem,0.9797rem+1.3514vw,1.875rem)]',
  '[--rail-y:calc(var(--rail-pad)+0.5lh-3.5px)]',
].join(' ');

// Build a row's rail slice, stopping the first and last rows at their dots.
export const railSegment = (first = false, last = false) =>
  [
    'absolute left-(--rail-x) w-px',
    first ? 'top-(--rail-y)' : 'top-0',
    last ? 'bottom-[calc(100%-var(--rail-y)-7px)]' : '-bottom-px',
  ].join(' ');
