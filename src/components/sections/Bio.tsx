import Note from '@components/ui/Note';

export default function Bio() {
  return (
    <section>
      <p className="max-w-[62ch] text-base leading-[1.7]">
        I work across the whole stack - React and TypeScript on top, Spring Boot and AWS underneath
        - and build the AI tooling that gets it shipped faster.
      </p>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-[1.75] text-text-muted">
        <p className="max-w-[66ch]">
          Four years, 10+ production features, <b className="font-medium text-text">100k+</b>{' '}
          monthly users - currently at{' '}
          <Note note={`Software engineer II \u00B7 consumer credit \u00B7 Wilmington, DE`}>
            JPMorgan Chase
          </Note>
          . I designed the UI and built the API and graph layer for{' '}
          <Note href="work" note={`patent-pending \u00B7 500+ employees using it`}>
            Cobol Studio
          </Note>
          , a patent-pending tool that maps decades-old mainframe code into a graph database and
          uses AI to explain it in plain language, now used by{' '}
          <b className="font-medium text-text">500+</b> employees.
        </p>
        <p className="max-w-[66ch]">
          The AI agent skills I&apos;ve written are now part of how my team ships - scaffolding a
          repo end to end (platform, pipeline, and test setup), reviewing PRs against our own
          engineering standards, and generating Jest and Playwright suites that cover accessibility,
          not just the happy path.
        </p>
      </div>
    </section>
  );
}
