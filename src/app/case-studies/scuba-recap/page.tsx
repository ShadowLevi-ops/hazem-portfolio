import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Study: Scuba Trip Recap',
  description:
    'Travel-focused recap video production optimized for immersive storytelling and social engagement.',
};

export default function ScubaRecapCaseStudyPage() {
  return (
    <main className="section-shell section-block">
      <article className="mx-auto max-w-4xl space-y-6">
        <header className="section-header">
          <p className="section-kicker">Case Study</p>
          <h1 className="section-title">Scuba Trip Recap</h1>
          <p className="section-copy">
            Turning destination footage into a cohesive story viewers watch
            through.
          </p>
        </header>

        <section className="surface-card space-y-3 rounded-xl p-6">
          <h2 className="font-serif text-xl">Challenge</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Convert long-form travel coverage into short, engaging edits with
            clear narrative momentum.
          </p>
          <h2 className="font-serif text-xl">Approach</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Structured highlights around moments of progression and contrast,
            then paced edits for retention in short-form feeds.
          </p>
          <h2 className="font-serif text-xl">Outcome</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Produced a recap package with stronger watchability and reusable
            snippets for campaign reposting.
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
