'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import { montserrat } from '@/lib/fonts';
import {
  attemptVideoPlay,
  attachTouchVideoUnlock,
  isCoarsePointerDevice,
  shouldPreferStaticMedia,
} from '@/lib/video-playback';

export function AnimatedHero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const ref = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();
  const [shouldPlayHeroVideo, setShouldPlayHeroVideo] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  const preferStaticMedia = useMemo(() => shouldPreferStaticMedia(), []);
  const heroVideoSrc = useMemo(
    () =>
      isCoarsePointerDevice() ? '/videos/previews/11.mp4' : '/videos/11.mp4',
    []
  );

  useEffect(() => {
    attachTouchVideoUnlock();
  }, []);

  useEffect(() => {
    // Start animation immediately for faster perceived loading
    controls.start('visible');
  }, [controls]);

  useEffect(() => {
    if (preferStaticMedia) return;
    setShouldPlayHeroVideo(true);
    analytics.track({ name: 'hero_video_enable' });
  }, [preferStaticMedia]);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setHeroInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || !shouldPlayHeroVideo) return;

    if (!heroInView) {
      video.pause();
      return;
    }

    const play = () => {
      void attemptVideoPlay(video);
    };

    video.addEventListener('loadeddata', play);
    video.addEventListener('canplay', play);
    video.addEventListener('canplaythrough', play);
    video.load();
    play();

    return () => {
      video.removeEventListener('loadeddata', play);
      video.removeEventListener('canplay', play);
      video.removeEventListener('canplaythrough', play);
    };
  }, [shouldPlayHeroVideo, heroInView, heroVideoSrc]);

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
      className="relative isolate z-[1] flex min-h-[74vh] w-full flex-col items-center justify-center overflow-hidden pt-0 pb-20 text-center md:min-h-[88vh] md:pt-0 md:pb-24"
    >
      {/* Hero background video (Asset 11 style treatment) */}
      <div className="absolute inset-0 z-0">
        {shouldPlayHeroVideo ? (
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover object-center"
            src={heroVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/VT-11.webp"
            aria-hidden="true"
          />
        ) : (
          <Image
            src="/videos/VT-11.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </div>
      {/* Contrast overlays for text legibility */}
      <div className="absolute inset-0 z-[1] bg-black/52" />
      <div className="from-background/70 via-background/45 to-background/75 absolute inset-0 z-[1] bg-gradient-to-b" />

      {/* Subtle accent glow on top of video */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          className="bg-primary/10 absolute top-24 left-12 h-36 w-36 rounded-full blur-3xl will-change-transform md:top-36 md:left-24 md:h-56 md:w-56"
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      <div className="section-shell relative z-[2]">
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

            {/* Hero title */}
            <motion.h1
              className={`${montserrat.className} hero-title mx-auto max-w-3xl text-center text-base leading-snug font-semibold tracking-[0.04em] uppercase sm:text-lg md:text-xl`}
              variants={itemVariants}
            >
              When you see sports,
              <span className="text-primary block sm:inline sm:px-1.5">
                we see a hundred ways to tell the story.
              </span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground mx-auto max-w-2xl px-2 text-center font-sans text-sm leading-relaxed md:text-base"
              variants={itemVariants}
            >
              Everything is worth telling — when you know how to write it.
              GiltMedia is a KL production team crafting campaign films and
              social cutdowns that turn your moments into stories people watch.
              Let us do it.
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
                See the Work
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
                Got a Launch?
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 z-[2] -translate-x-1/2 transform md:bottom-16"
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
