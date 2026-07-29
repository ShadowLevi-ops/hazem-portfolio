'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { SERVICES, SERVICE_PIPELINE, type ServiceItem } from '@/data/services';

const LAYOUT_CLASS: Record<ServiceItem['layout'], string> = {
  hero: 'services-bento-hero',
  tall: 'services-bento-tall',
  standard: 'services-bento-standard',
  wide: 'services-bento-wide',
};

function ServiceCard({
  service,
  index,
  isActive,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}) {
  const inner = (
    <>
      <div className="services-card-noise" aria-hidden />
      <div className="services-card-top">
        <span className="services-card-code">{service.code}</span>
        {service.format ? (
          <span className="services-card-format">{service.format}</span>
        ) : null}
      </div>

      <div className="services-card-body">
        <h3 className="services-card-title">{service.title}</h3>
        <p className="services-card-hook">{service.hook}</p>

        <ul
          className={`services-deliverables ${isActive ? 'is-visible' : ''}`}
          aria-hidden={!isActive}
        >
          {service.deliverables.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="services-card-foot">
        <span className="services-card-hint md:hidden">
          {isActive ? 'Asset stack' : 'Tap for assets'}
        </span>
        <span className="services-card-hint hidden md:inline">
          {isActive ? 'Asset stack' : 'Hover for assets'}
        </span>
        {service.href ? (
          <span className="services-card-link-icon" aria-hidden>
            <ArrowUpRight className="size-4" />
          </span>
        ) : null}
      </div>

      {service.layout === 'hero' ? (
        <div className="services-card-slate" aria-hidden>
          <span className="services-slate-take">TAKE</span>
          <span className="services-slate-num">01</span>
        </div>
      ) : null}
    </>
  );

  const className = `services-card group ${LAYOUT_CLASS[service.layout]} ${
    isActive ? 'is-active' : ''
  } ${service.href ? 'services-card--linked' : ''}`;

  const interactionProps = {
    initial: { opacity: 0, y: 16 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.4, delay: index * 0.06 } as const,
    onMouseEnter: onActivate,
    onMouseLeave: onDeactivate,
    onFocus: onActivate,
    onBlur: onDeactivate,
  };

  if (service.href) {
    return (
      <motion.article {...interactionProps} className={className}>
        <Link href={service.href} className="services-card-link">
          {inner}
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      {...interactionProps}
      className={className}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {inner}
    </motion.article>
  );
}

export function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="section-shell pb-16 md:pb-24"
      aria-labelledby="services-heading"
    >
      <motion.div
        className="services-board mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-header">
          <p className="section-kicker">Campaign rollout</p>
          <h2 id="services-heading" className="section-title">
            Services
          </h2>
          <p className="section-copy">
            Data-driven 4-phase stack. 22 core assets. Built to ship in waves —
            not dump and pray.
          </p>
        </div>

        <div className="services-pipeline" aria-label="Production pipeline">
          {SERVICE_PIPELINE.map(({ step, note }, i) => (
            <div key={step} className="services-pipeline-step">
              <span className="services-pipeline-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="services-pipeline-label">{step}</span>
              <span className="services-pipeline-note">{note}</span>
              {i < SERVICE_PIPELINE.length - 1 ? (
                <span className="services-pipeline-arrow" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="services-bento">
          <div
            className="services-film-edge services-film-edge--left"
            aria-hidden
          />
          <div
            className="services-film-edge services-film-edge--right"
            aria-hidden
          />

          <p className="services-board-stamp font-marker" aria-hidden>
            ROLLOUT STACK // GM-22
          </p>

          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeId === service.id}
              onActivate={() => setActiveId(service.id)}
              onDeactivate={() =>
                setActiveId(current =>
                  current === service.id ? null : current
                )
              }
              onToggle={() =>
                setActiveId(current =>
                  current === service.id ? null : service.id
                )
              }
            />
          ))}
        </div>

        <p className="services-board-footer text-muted-foreground mt-6 text-center text-xs tracking-[0.14em] uppercase md:text-[11px]">
          Refresh cycle · Audit · Scale · Recut — full brief on booking.
        </p>
      </motion.div>
    </section>
  );
}
