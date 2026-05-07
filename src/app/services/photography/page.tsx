import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Photography Services',
  description:
    'Commercial and editorial photography designed for brands that need premium visuals across digital campaigns.',
};

export default function PhotographyServicePage() {
  return (
    <main className="section-shell section-block">
      <section className="mx-auto max-w-4xl">
        <div className="section-header">
          <p className="section-kicker">Service</p>
          <h1 className="section-title">Photography</h1>
          <p className="section-copy">
            Premium still photography for campaigns, product launches, and brand
            storytelling.
          </p>
        </div>
        <div className="surface-card space-y-4 rounded-xl p-6">
          <h2 className="font-serif text-xl">What&apos;s included</h2>
          <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
            <li>Campaign moodboarding and visual direction.</li>
            <li>On-location and studio production support.</li>
            <li>Retouching and platform-ready export sets.</li>
          </ul>
          <Link
            href="/book"
            className="inline-block text-sm underline underline-offset-4"
          >
            Book a photography project
          </Link>
        </div>
      </section>
    </main>
  );
}
