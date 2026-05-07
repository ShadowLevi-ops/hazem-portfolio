import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Study: PUMA x SOLEWHAT Launch',
  description:
    'How GiltMedia produced social-first launch visuals for PUMA x SOLEWHAT with campaign clarity and high replay value.',
};

export default function PumaSolewhatCaseStudyPage() {
  return (
    <main className="section-shell section-block">
      <article className="mx-auto max-w-4xl space-y-6">
        <header className="section-header">
          <p className="section-kicker">Case Study</p>
          <h1 className="section-title">PUMA x SOLEWHAT Launch</h1>
          <p className="section-copy">
            Social-first launch coverage built for speed, style consistency, and
            audience retention.
          </p>
        </header>

        <section className="surface-card space-y-3 rounded-xl p-6">
          <h2 className="font-serif text-xl">Challenge</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Deliver launch assets that felt premium while staying agile for fast
            social distribution windows.
          </p>
          <h2 className="font-serif text-xl">Approach</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Designed a modular capture plan, then edited hero and cutdown
            variants for multi-platform rollouts.
          </p>
          <h2 className="font-serif text-xl">Outcome</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Produced a cohesive launch package that improved content consistency
            and extended campaign shelf life.
          </p>
        </section>

        <p className="text-sm">
          Related service:{' '}
          <Link
            href="/services/videography"
            className="underline underline-offset-4"
          >
            Videography
          </Link>
        </p>
      </article>
    </main>
  );
}
