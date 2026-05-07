import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Social Media Content Services',
  description:
    'Social-first creative production and rollout support for brands that want stronger engagement and content consistency.',
};

export default function SocialMediaServicePage() {
  return (
    <main className="section-shell section-block">
      <section className="mx-auto max-w-4xl">
        <div className="section-header">
          <p className="section-kicker">Service</p>
          <h1 className="section-title">Social Media Content</h1>
          <p className="section-copy">
            Repeatable, high-quality content systems for weekly publishing and
            campaign bursts.
          </p>
        </div>
        <div className="surface-card space-y-4 rounded-xl p-6">
          <h2 className="font-serif text-xl">What&apos;s included</h2>
          <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
            <li>Content pillars and short-form strategy.</li>
            <li>Batch production for Reels, Shorts, and TikTok.</li>
            <li>Editing formats tailored per channel.</li>
          </ul>
          <Link
            href="/book"
            className="inline-block text-sm underline underline-offset-4"
          >
            Book a social content project
          </Link>
        </div>
      </section>
    </main>
  );
}
