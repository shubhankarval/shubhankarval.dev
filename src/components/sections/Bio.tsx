import Note from '@components/ui/Note';

export default function Bio() {
  return (
    <section>
      <p className="max-w-[62ch] text-base leading-[1.7]">
        I build developer tooling and the unglamorous infrastructure underneath it — and I make it
        measurably faster.
      </p>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-[1.75] text-text-muted">
        <p className="max-w-[66ch]">
          Seven years on build systems, deploy pipelines, and CLIs. Currently at{' '}
          <Note note="Series B • developer infrastructure • ~40 engineers">Vector Labs</Note>, where
          I own the release pipeline that ships{' '}
          <Note note="p95 pipeline duration: 4m12s, down from 11m">about 60 deploys a day</Note>.
          Before that, platform work at{' '}
          <Note note="Northgate • 90+ services moved to k8s">a Series C fintech</Note> and a
          seed-stage startup where I was the{' '}
          <b className="font-medium text-text">first infrastructure hire</b>.
        </p>
        <p className="max-w-[66ch]">
          The work I like best is the unglamorous kind: shaving a build from eleven minutes to four,
          deleting a caching layer nobody needed, rewriting an error message so the next person
          doesn&apos;t file a ticket. I care about latency budgets, small binaries, and interfaces
          that respect the person using them.
        </p>
        <p className="max-w-[66ch]">
          I&apos;d rather delete a system than tune it, and I write down what I learn — usually as{' '}
          <Note href="#writing" note="18 posts • ~40k reads • rss available">
            field notes
          </Note>{' '}
          other teams can steal from.
        </p>
      </div>
    </section>
  );
}
