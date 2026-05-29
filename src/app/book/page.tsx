import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BookFormClient } from '@/components/book-form-client';

export const metadata: Metadata = {
  title: 'Book a Project',
  description:
    'Start a project with GiltMedia. Share your brand, timeline, and budget to receive a tailored production plan.',
};

export default function BookPage() {
  return (
    <main className="section-shell pt-6 pb-16 md:pt-8 md:pb-24">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground -mt-1 mb-6 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors md:mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back
        </Link>

        <div className="section-header">
          <p className="section-kicker">Bookings</p>
          <h1 className="section-title">Start Your Project</h1>
          <p className="section-copy">
            Tell us what you are launching — your details open in WhatsApp
            pre-filled so we can shape a creative plan around your goals,
            timeline, and audience.
          </p>
        </div>

        <BookFormClient />
      </section>
    </main>
  );
}
