import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Study: Tottenham CNY Campaign',
  description:
    'A cross-cultural sports campaign crafted for social channels with fast-turnaround storytelling and brand fit.',
};

export default function TottenhamCnyCaseStudyPage() {
  return (
    <main className="section-shell section-block">
      <article className="mx-auto max-w-4xl space-y-6">
        <header className="section-header">
          <p className="section-kicker">Case Study</p>
          <h1 className="section-title">Tottenham CNY Campaign</h1>
          <p className="section-copy">
            Fast-turnaround campaign storytelling for a seasonal sports
            audience.
          </p>
        </header>

        <section className="surface-card space-y-3 rounded-xl p-6">
          <h2 className="font-serif text-xl">Challenge</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Create culturally relevant content under a tight campaign window
            while preserving global brand consistency.
          </p>
          <h2 className="font-serif text-xl">Approach</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Built a concise narrative structure and delivered platform-native
            edits that balanced brand and local relevance.
          </p>
          <h2 className="font-serif text-xl">Outcome</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Delivered polished assets ready for campaign deployment with minimal
            turnaround friction.
          </p>
        </section>

        <p className="text-sm">
          Related service:{' '}
          <Link
            href="/services/social-media"
            className="underline underline-offset-4"
          >
            Social Media Content
          </Link>
        </p>
      </article>
    </main>
  );
}
