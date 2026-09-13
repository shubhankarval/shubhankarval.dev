export default function AvailabilityBadge({ label }: { label: string }) {
  return (
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line py-0.5 pr-2.25 pl-1.75 font-mono text-[10px] text-text-muted">
      <span aria-hidden className="availability-dot size-1.5 rounded-full bg-accent" />
      {label}
    </span>
  );
}
