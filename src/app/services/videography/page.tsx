import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Videography Services',
  description:
    'Social-first videography services for campaign launches, brand storytelling, and high-performing short-form content.',
};

export default function VideographyServicePage() {
  return (
    <main className="section-shell section-block">
      <section className="mx-auto max-w-4xl">
        <div className="section-header">
          <p className="section-kicker">Service</p>
          <h1 className="section-title">Videography</h1>
          <p className="section-copy">
            Performance-minded video production for social campaigns, brand
            launches, and content ecosystems.
          </p>
        </div>
        <div className="surface-card space-y-4 rounded-xl p-6">
          <h2 className="font-serif text-xl">What&apos;s included</h2>
          <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
            <li>Creative direction and shotlist aligned to campaign goals.</li>
            <li>Production tailored to platform-native formats.</li>
            <li>Post-production with social-first cutdowns.</li>
          </ul>
          <Link
            href="/book"
            className="inline-block text-sm underline underline-offset-4"
          >
            Book a videography project
          </Link>
        </div>
      </section>
    </main>
  );
}
