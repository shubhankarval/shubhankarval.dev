'use client';

import { useEffect, useState } from 'react';

export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
      timeZoneName: 'short',
    });

    const tick = () => {
      setTime(formatter.format(new Date()));
    };

    tick();
    const id = setInterval(tick, 30000);

    return () => {
      clearInterval(id);
    };
  }, [timeZone]);

  // Placeholder until mount - a server-rendered time would cause a hydration mismatch.
  return <span className="tabular-nums">{time ?? '-'}</span>;
}
