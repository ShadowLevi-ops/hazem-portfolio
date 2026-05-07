import type { Metadata } from 'next';
import { BookFormClient } from '@/components/book-form-client';

export const metadata: Metadata = {
  title: 'Book a Project',
  description:
    'Start a project with GiltMedia. Share your brand, timeline, and budget to receive a tailored production plan.',
};

export default function BookPage() {
  return (
    <main className="section-shell section-block">
      <section className="mx-auto max-w-4xl">
        <div className="section-header">
          <p className="section-kicker">Bookings</p>
          <h1 className="section-title">Start Your Project</h1>
          <p className="section-copy">
            Tell us what you are launching and we&apos;ll shape a creative plan
            around your goals, timeline, and audience.
          </p>
        </div>

        <BookFormClient />
      </section>
    </main>
  );
}
