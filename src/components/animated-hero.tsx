'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function AnimatedHero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    // Start animation immediately for faster perceived loading
    controls.start('visible');
  }, [controls]);

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
      className="section-shell relative flex min-h-[66vh] flex-col items-center justify-center overflow-hidden pt-12 pb-20 text-center md:min-h-[76vh] md:pt-16 md:pb-24"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="bg-primary/5 absolute top-20 left-10 h-32 w-32 rounded-full blur-3xl will-change-transform md:top-32 md:left-20 md:h-48 md:w-48"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
        <motion.div
          className="bg-primary/3 absolute right-10 bottom-20 h-40 w-40 rounded-full blur-3xl will-change-transform md:right-20 md:bottom-32 md:h-56 md:w-56"
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="mx-auto w-full max-w-5xl space-y-4 will-change-transform md:space-y-6"
      >
        {/* Logo and Title */}
        <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
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
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="text-muted-foreground flex flex-col flex-wrap items-center justify-center gap-4 text-xs sm:flex-row md:gap-6 md:text-sm"
          variants={itemVariants}
        >
          <div className="hover:text-primary flex cursor-pointer items-center gap-2.5 transition-colors duration-300">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-light tracking-tight">Kuala Lumpur, MY</span>
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
            onClick={() => scrollToSection('portfolio')}
          >
            View Portfolio
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background/50 hover:bg-background/70 rounded-full border-white/20 px-7 tracking-[0.12em] uppercase backdrop-blur-sm"
            onClick={() => scrollToSection('contact')}
          >
            Start a Project
          </Button>
        </motion.div>
      </motion.div>

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
