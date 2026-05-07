'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

export function AnimatedHero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const ref = useRef(null);
  const controls = useAnimation();
  const [shouldPlayHeroVideo, setShouldPlayHeroVideo] = useState(false);

  const lowDataMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const saveData = Boolean(connection?.saveData);
    const effectiveType = connection?.effectiveType || '';
    const isSlow = effectiveType.includes('2g') || effectiveType === '3g';
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    return saveData || isSlow || reducedMotion;
  }, []);

  useEffect(() => {
    // Start animation immediately for faster perceived loading
    controls.start('visible');
  }, [controls]);

  useEffect(() => {
    if (lowDataMode) return;
    // Start immediately on capable connections for snappier hero motion.
    setShouldPlayHeroVideo(true);
    analytics.track({ name: 'hero_video_enable' });
  }, [lowDataMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0, transform: 'translate3d(0,0,0)' },
    visible: {
      y: 0,
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <header
      ref={ref}
      className="relative flex min-h-[74vh] w-full flex-col items-center justify-center overflow-hidden pt-0 pb-20 text-center md:min-h-[88vh] md:pt-0 md:pb-24"
    >
      {/* Hero background video (Asset 11 style treatment) */}
      <div className="absolute inset-0 -z-20">
        {shouldPlayHeroVideo ? (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/VT-11.jpg"
            aria-hidden="true"
          >
            <source src="/videos/11.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/videos/VT-11.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </div>
      {/* Contrast overlays for text legibility */}
      <div className="absolute inset-0 -z-10 bg-black/52" />
      <div className="from-background/70 via-background/45 to-background/75 absolute inset-0 -z-10 bg-gradient-to-b" />

      {/* Subtle accent glow on top of video */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="bg-primary/10 absolute top-24 left-12 h-36 w-36 rounded-full blur-3xl will-change-transform md:top-36 md:left-24 md:h-56 md:w-56"
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      <div className="section-shell">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto w-full max-w-5xl space-y-4 will-change-transform md:space-y-6"
        >
          {/* Logo and Title */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center will-change-transform"
              variants={itemVariants}
            >
              <Image
                src="/giltmedia2.svg"
                alt="Gilt Media Logo"
                width={300}
                height={300}
                className="h-32 w-auto will-change-transform sm:h-40 md:h-48 lg:h-56 xl:h-64"
                priority
                style={{ transform: 'translate3d(0,0,0)' }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.h2
              className="text-muted-foreground text-center font-sans text-xs tracking-[0.2em] uppercase sm:text-sm md:text-base"
              variants={itemVariants}
            >
              <span>At the intersection of culture and creativity</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mx-auto max-w-2xl px-2 text-center font-sans text-sm leading-relaxed md:text-base"
              variants={itemVariants}
            >
              GiltMedia is a Kuala Lumpur studio for brands, agencies, and
              visionaries who want culturally tuned visual work—from campaign
              films and social-first edits that feels premium and built to
              perform.
            </motion.p>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="text-muted-foreground flex flex-col flex-wrap items-center justify-center gap-4 text-xs sm:flex-row md:gap-6 md:text-sm"
            variants={itemVariants}
          >
            <div className="hover:text-primary flex cursor-pointer items-center gap-2.5 transition-colors duration-300">
              <MapPin className="h-3.5 w-3.5" />
              <span className="font-light tracking-tight">
                Kuala Lumpur, MY
              </span>
            </div>
            <div className="bg-border h-4 w-px" />
            <a
              href="mailto:hazem@noveltyventures.uk"
              className="hover:text-primary flex items-center gap-2.5 transition-colors duration-300"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="font-light tracking-tight">
                hazem@noveltyventures.uk
              </span>
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 pt-2 md:gap-4"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="from-primary to-primary/80 hover:to-primary rounded-full border border-transparent bg-gradient-to-r px-7 tracking-[0.12em] uppercase shadow-md shadow-black/10 hover:-translate-y-0.5"
              asChild
            >
              <Link
                href="#portfolio"
                onClick={() => {
                  scrollToSection('portfolio');
                  analytics.track({
                    name: 'hero_cta_click',
                    properties: { cta: 'portfolio' },
                  });
                }}
              >
                View Portfolio
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/50 hover:bg-background/70 rounded-full border-white/20 px-7 tracking-[0.12em] uppercase backdrop-blur-sm"
              asChild
            >
              <Link
                href="/book"
                onClick={() =>
                  analytics.track({
                    name: 'hero_cta_click',
                    properties: { cta: 'book' },
                  })
                }
              >
                Start a Project
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 transform md:bottom-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="border-muted-foreground/20 flex h-12 w-6 justify-center rounded-full border"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="bg-primary/40 mt-2.5 h-2.5 w-0.5 rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </header>
  );
}
