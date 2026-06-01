'use client';

import { useEffect, type FormEvent } from 'react';
import { analytics } from '@/lib/analytics';
import {
  buildProjectBriefMessage,
  getWhatsAppUrl,
  QUICK_WHATSAPP_MESSAGE,
} from '@/lib/whatsapp';

const BUDGET_OPTIONS = [
  'Under RM 5,000',
  'RM 5,000 - RM 15,000',
  'RM 15,000 - RM 35,000',
  'RM 35,000+',
];

export function BookFormClient() {
  useEffect(() => {
    analytics.track({ name: 'book_form_view' });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = buildProjectBriefMessage({
      name: String(formData.get('name') ?? ''),
      brand: String(formData.get('brand') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      timeline: String(formData.get('timeline') ?? ''),
      brief: String(formData.get('brief') ?? ''),
    });

    analytics.track({
      name: 'book_form_submit',
      properties: { channel: 'whatsapp' },
    });

    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="surface-card flex flex-col gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <p className="text-muted-foreground text-[11px] tracking-[0.13em] uppercase">
            Quick message
          </p>
          <p className="mt-1 text-sm leading-relaxed">
            Skip the form — open WhatsApp with a ready-to-send intro.
          </p>
        </div>
        <a
          href={getWhatsAppUrl(QUICK_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="from-primary to-primary/80 text-primary-foreground hover:to-primary inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-gradient-to-r px-6 py-2.5 text-xs font-semibold tracking-[0.13em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          onClick={() =>
            analytics.track({
              name: 'cta_book_click',
              properties: { channel: 'whatsapp_book_page' },
            })
          }
        >
          Message on WhatsApp
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <form
          className="surface-card space-y-4 rounded-xl p-5 md:p-6"
          onSubmit={handleSubmit}
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            Fill in your project details and we&apos;ll open WhatsApp with
            everything pre-filled — just tap send.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                Full Name
              </span>
              <input
                required
                name="name"
                type="text"
                className="bg-background/70 border-border/70 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                Brand / Company
              </span>
              <input
                required
                name="brand"
                type="text"
                className="bg-background/70 border-border/70 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Brand name"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                Budget Range
              </span>
              <select
                name="budget"
                required
                className="bg-background/70 border-border/70 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                defaultValue=""
              >
                <option value="" disabled>
                  Select budget
                </option>
                {BUDGET_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                Timeline
              </span>
              <input
                required
                name="timeline"
                type="text"
                className="bg-background/70 border-border/70 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
                placeholder="e.g. Need launch by June"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
              Project Brief
            </span>
            <textarea
              required
              name="brief"
              rows={5}
              className="bg-background/70 border-border/70 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              placeholder="What are you trying to achieve?"
            />
          </label>

          <button
            type="submit"
            className="from-primary to-primary/80 text-primary-foreground hover:to-primary rounded-full border border-transparent bg-gradient-to-r px-6 py-2.5 text-xs font-semibold tracking-[0.13em] uppercase transition-all duration-300 hover:-translate-y-0.5"
          >
            Send via WhatsApp
          </button>
        </form>

        <aside className="space-y-4">
          <div className="surface-card rounded-xl p-5">
            <p className="text-muted-foreground text-[11px] tracking-[0.13em] uppercase">
              Typical response
            </p>
            <p className="mt-2 font-serif text-xl">Within 2 hours</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Share context now, get a practical production direction quickly.
            </p>
          </div>
          <div className="surface-card rounded-xl p-5">
            <p className="text-muted-foreground text-[11px] tracking-[0.13em] uppercase">
              Social proof
            </p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed">
              <li>Worked with sports, travel, and lifestyle brands.</li>
              <li>Campaign-ready edits for social-first launches.</li>
              <li>End-to-end production from concept to delivery.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
