/*
 * The viewport line the rail fills to. Dots resolve their own state against the same anchor,
 * so a dot lights exactly as the line sweeps through it without measuring anything.
 *
 * Kept well above centre so the rail reads as empty on load: progress only leaves Ø once
 * the list's top has passed this line, which requires a viewport taller than ~1440px to be
 * true on first paint.
 */

export const RAIL_OFFSET = ['start 30%', 'end 30%'] as const;
