/*
 * The viewport line the rail fills to. Dots resolve their own state against the same anchor,
 * so a dot lights exactly as the line sweeps through it without measuring anything.
 *
 * Kept well above centre so the rail reads as empty on load: progress only leaves 0 once
 * the list's top has passed this line, which requires a viewport taller than ~1440px to be
 * true on first paint.
 */

export const RAIL_OFFSET = ['start 30%', 'end 30%'] as const;

/*
 * Rail geometry, declared once on the list and read by the rail, the dots, the row masks, and the
 * row padding, so the four can never drift apart.
 * The gutter and padding interpolate across the same 320-1060px window as the type ramp, so the
 * component scales with the text rather than spending a fifth of a narrow card on empty space.
 *
 * y is derived from the row's own leading instead of a frozen pixel offset, which is what keeps
 * the 7px dot centred on the company name as the fluid scale grows it. text-base pins 1lh to that
 * name's line height; every element that reads rail-y inherits it.
 */
export const RAIL_GEOMETRY = [
  'text-base',
  '[--rail-pad:clamp(1rem,0.8919rem+0.5405vw,1.25rem)]',
  '[--rail-x:clamp(1.25rem,0.9797rem+1.3514vw,1.875rem)]',
  '[--rail-y:calc(var(--rail-pad)+0.5lh-3.5px)]',
].join(' ');
