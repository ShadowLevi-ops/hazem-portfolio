import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BookFormClient } from '@/components/book-form-client';

export const metadata: Metadata = {
  title: 'Book a Project',
  description:
    'Tell GiltMedia what you are launching — share your brand, timeline, and budget to get a production plan.',
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
          <h1 className="section-title">Tell us what you&apos;re launching</h1>
          <p className="section-copy">
            Drop your details below — we&apos;ll open WhatsApp pre-filled so you
            can send it in one tap. Include timeline if you&apos;ve got one.
          </p>
        </div>

        <BookFormClient />
      </section>
    </main>
  );
}
