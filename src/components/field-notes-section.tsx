'use client';

import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    id: 'brief',
    number: '01',
    title: 'Brief',
    copy: "Who we're filming, the story arc, and which channels the cut needs to serve.",
    circleRotate: -8,
  },
  {
    id: 'shoot',
    number: '02',
    title: 'Shoot',
    copy: 'Sit-down interview, two-camera. Room tone locked before the first question.',
    circleRotate: 12,
  },
  {
    id: 'ship',
    number: '03',
    title: 'Ship',
    copy: 'Horizontal master + quote-led cutdowns for club feeds and fanclub reposts.',
    circleRotate: -5,
  },
] as const;

const MARGIN_NOTES = [
  {
    id: 'format',
    side: 'left' as const,
    rotate: -7,
    top: '6%',
    content: (
      <>
        format: <span className="field-marker-ring">16:9 master</span>
      </>
    ),
  },
  {
    id: 'prep',
    side: 'left' as const,
    rotate: 4,
    top: '50%',
    content: (
      <>
        talking points sent{' '}
        <span className="field-marker-underline">day before</span>
      </>
    ),
  },
  {
    id: 'pack',
    side: 'right' as const,
    rotate: 6,
    top: '10%',
    content: <>deliverables → 1 hero + 3–4 quote cuts</>,
  },
  {
    id: 'turnaround',
    side: 'right' as const,
    rotate: -5,
    top: '56%',
    content: (
      <>
        rough cut by <span className="field-marker-underline">Wednesday</span>
      </>
    ),
  },
] as const;

function MarkerCircle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        d="M36 8c14 1 26 12 27 26 1 16-11 29-27 30-15-1-28-14-27-30 1-14 13-25 27-26z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
      <path
        d="M12 38c4 8 12 14 22 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function FieldArrowDefs() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden>
      <defs>
        <filter
          id="field-arrow-texture"
          x="-8%"
          y="-20%"
          width="116%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.55"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function FieldArrow({
  direction = 'right',
  variant = 'red',
  className,
  style,
}: {
  direction?: 'left' | 'right' | 'down';
  variant?: 'red' | 'gold' | 'primary';
  className?: string;
  style?: CSSProperties;
}) {
  const colorClass =
    variant === 'gold'
      ? 'text-primary'
      : variant === 'primary'
        ? 'text-primary/85'
        : 'text-[#e84855]';

  const rotation =
    direction === 'left'
      ? 'rotate(180deg)'
      : direction === 'down'
        ? 'rotate(90deg)'
        : undefined;

  return (
    <svg
      viewBox="0 0 96 24"
      fill="none"
      aria-hidden
      className={`field-arrow ${colorClass} ${className ?? ''}`}
      style={{ ...style, transform: rotation }}
    >
      <g filter="url(#field-arrow-texture)">
        <path
          d="M2 13.5 C24 10.5 48 16 72 12.5"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          opacity="0.92"
        />
        <path
          d="M68 8.5 L82 12.5 L69 17"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 15 C24 12 48 17.5 72 14"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.38"
        />
      </g>
    </svg>
  );
}

function FieldCurveArrow({
  flip,
  className,
  style,
}: {
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 36"
      fill="none"
      aria-hidden
      className={`field-arrow field-arrow--curve text-[#e84855] ${className ?? ''}`}
      style={{
        ...style,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    >
      <g filter="url(#field-arrow-texture)">
        <path
          d="M4 20 C38 8 72 28 112 14"
          stroke="currentColor"
          strokeWidth="2.65"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M104 10 L114 14 L105 20"
          stroke="currentColor"
          strokeWidth="2.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 22.5 C38 10.5 72 30.5 112 16.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

function SurveyCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 4"
        opacity="0.45"
      />
      <path
        d="M24 6v36M6 24h36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

function MarginNote({
  content,
  rotate,
  side,
  top,
  delay,
}: {
  content: ReactNode;
  rotate: number;
  side: 'left' | 'right';
  top: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === 'left' ? -16 : 16,
        rotate: rotate - 4,
      }}
      whileInView={{ opacity: 1, x: 0, rotate }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={`field-note field-note--${side} field-note-sticky absolute hidden lg:block`}
      style={{ top }}
    >
      <span className="field-note-sticky__tape" aria-hidden />
      <span className="field-note-sticky__fiber" aria-hidden />
      <FieldCurveArrow
        flip={side === 'right'}
        className="field-note__curve-arrow"
      />
      <p className="font-marker field-note-sticky__text text-[14px] leading-snug">
        {content}
      </p>
    </motion.div>
  );
}

export function FieldNotesSection() {
  return (
    <section
      id="process"
      className="section-shell border-border/35 border-b py-14 md:py-20"
      aria-labelledby="field-notes-heading"
    >
      <motion.div
        className="relative mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-header mb-8 md:mb-12">
          <p className="section-kicker">Field reports</p>
          <h2 id="field-notes-heading" className="section-title">
            From brief to feed
          </h2>
          <p className="section-copy">
            Three checkpoints. Real timelines. No deck theatre.
          </p>
        </div>

        <div className="field-notes-map relative overflow-hidden rounded-xl px-4 py-10 md:px-10 md:py-14">
          <span className="field-notes-stamp" aria-hidden>
            FIELD REPORT // GM-017
          </span>
          <span className="field-notes-grid-ref font-marker" aria-hidden>
            GRID REF: GM-KL-017
          </span>

          <div
            className="field-notes-texture-stack pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div className="field-notes-topo" />
            <div className="field-notes-grain field-notes-grain--coarse" />
            <div className="field-notes-grain field-notes-grain--fine" />
            <div className="field-notes-vignette" />
            <div className="field-notes-crease" />
            <div className="field-notes-stain field-notes-stain--a" />
            <div className="field-notes-stain field-notes-stain--b" />
            <div className="field-notes-scuff field-notes-scuff--tl" />
            <div className="field-notes-scuff field-notes-scuff--br" />
            <div className="field-notes-fold field-notes-fold--br" />
            <svg
              className="field-notes-scribble"
              viewBox="0 0 420 120"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 88 C80 72 140 96 210 78 S340 62 408 84"
                stroke="#e84855"
                strokeWidth="1.75"
                strokeLinecap="round"
                opacity="0.22"
              />
              <path
                d="M28 34 L52 28 M94 42 L118 36"
                stroke="#e84855"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.18"
              />
              <circle
                cx="332"
                cy="38"
                r="11"
                stroke="#e84855"
                strokeWidth="1.4"
                strokeDasharray="2 3"
                opacity="0.2"
              />
            </svg>
          </div>

          <FieldArrow
            direction="down"
            variant="gold"
            className="field-notes-corner field-notes-corner--north"
          />
          <FieldArrow
            direction="right"
            variant="gold"
            className="field-notes-corner field-notes-corner--west"
          />

          {MARGIN_NOTES.map((note, index) => (
            <MarginNote key={note.id} {...note} delay={0.15 + index * 0.08} />
          ))}

          <div className="relative z-10 mx-auto max-w-4xl">
            <FieldArrowDefs />

            <div
              className="field-notes-flow-arrows pointer-events-none absolute inset-x-[6%] top-[1.85rem] hidden md:block"
              aria-hidden
            >
              <FieldArrow
                direction="right"
                variant="red"
                className="absolute left-[27%] w-[14%] max-w-[5.5rem]"
              />
              <FieldArrow
                direction="right"
                variant="red"
                className="absolute left-[59%] w-[14%] max-w-[5.5rem]"
              />
            </div>

            <div className="field-notes-track hidden md:block" aria-hidden />

            <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <div className="relative mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                    <MarkerCircle
                      className="field-marker-circle absolute h-[4.75rem] w-[4.75rem] text-[#e84855]"
                      style={{ transform: `rotate(${step.circleRotate}deg)` }}
                    />
                    <SurveyCross className="text-primary relative z-[1] h-14 w-14" />
                    <span className="font-marker field-step-number absolute -top-1 -right-3 z-[2] text-lg">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-[16rem] text-sm leading-relaxed">
                    {step.copy}
                  </p>

                  {index < STEPS.length - 1 ? (
                    <FieldArrow
                      direction="down"
                      variant="red"
                      className="field-notes-step-arrow mx-auto mt-6 md:hidden"
                    />
                  ) : null}
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3 lg:hidden">
            {MARGIN_NOTES.map(note => (
              <span
                key={note.id}
                className="field-note-sticky field-note-sticky--mobile font-marker inline-block px-3 py-2 text-sm"
                style={{ transform: `rotate(${note.rotate * 0.6}deg)` }}
              >
                {note.content}
              </span>
            ))}
          </div>

          <p className="font-marker field-notes-coords relative z-10 mt-8 text-center text-sm md:mt-10 md:text-base">
            coordinates: 3.1390° N, 101.6869° E — Kuala Lumpur
          </p>
        </div>
      </motion.div>
    </section>
  );
}
