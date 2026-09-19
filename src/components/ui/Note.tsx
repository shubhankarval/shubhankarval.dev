'use client';

import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';

const VIEWPORT_MARGIN = 16;
const trigger = 'peer cursor-help border-b border-line-strong';

// The viewport is not the boundary that matters once an ancestor clips: the page shell caps its
// width and hides the overflow, so past ~1064px it cuts the tooltip well before the screen edge.
function boundsFor(node: HTMLElement) {
  let left = VIEWPORT_MARGIN;
  let right = window.innerWidth - VIEWPORT_MARGIN;

  for (let el: HTMLElement | null = node.parentElement; el; el = el.parentElement) {
    if (getComputedStyle(el).overflowX === 'visible') continue;
    const rect = el.getBoundingClientRect();
    left = Math.max(left, rect.left);
    right = Math.min(right, rect.right);
  }

  return { left, right };
}

const tooltip = [
  'pointer-events-none absolute top-full left-0 z-5 mt-2',
  'w-max max-w-[min(16.25rem,calc(100vw_-_2rem))] px-2.25 py-1.5',
  'rounded-sm border border-line bg-bg-raised shadow-popover',
  'font-mono text-2xs text-text-muted',
  '-translate-y-[3px] opacity-0 transition',
  'peer-hover:translate-y-0 peer-hover:opacity-100',
  'peer-focus-visible:translate-y-0 peer-focus-visible:opacity-100',
].join(' ');

interface NoteProps {
  note: string;
  href?: string;
  children: ReactNode;
}

export default function Note({ note, href, children }: Readonly<NoteProps>) {
  const tooltipId = useId();
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // The tooltip hangs off the word it annotates, so one that wraps near the edge of a narrow screen
  // would land off-page. Slide it back inside instead of letting it get clipped. Measuring the
  // tooltip rather than the trigger matters: when the trigger wraps across lines its own rect spans
  // both fragments, while the tooltip anchors to the first one.
  const align = useCallback(() => {
    const box = tooltipRef.current;
    if (!box) return;
    box.style.left = '0px';
    const { left, right } = box.getBoundingClientRect();
    const bounds = boundsFor(box);
    const overflowRight = right - bounds.right;
    box.style.left = `${overflowRight > 0 ? -overflowRight : Math.max(0, bounds.left - left)}px`;
  }, []);

  useEffect(() => {
    align();
    window.addEventListener('resize', align);
    return () => window.removeEventListener('resize', align);
  }, [align]);

  const Trigger = href ? 'a' : 'span';

  return (
    // Realigning on interaction covers reflow the resize listener misses, such as a late font swap.
    <span className="relative" onPointerEnter={align} onFocus={align}>
      <Trigger
        className={trigger}
        aria-describedby={tooltipId}
        {...(href ? { href } : { tabIndex: 0 })}
      >
        {children}
      </Trigger>
      <span ref={tooltipRef} id={tooltipId} role="tooltip" className={tooltip}>
        {note}
      </span>
    </span>
  );
}
