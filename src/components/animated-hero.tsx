'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Camera, Video, Award, MapPin, Mail } from 'lucide-react';

export function AnimatedHero() {
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

  const stats = [
    {
      icon: <Camera className="h-4 w-4 md:h-5 md:w-5" />,
      label: 'Photography',
      value: '50+',
    },
    {
      icon: <Video className="h-4 w-4 md:h-5 md:w-5" />,
      label: 'Video Projects',
      value: '30+',
    },
    {
      icon: <Award className="h-4 w-4 md:h-5 md:w-5" />,
      label: 'Happy Clients',
      value: '100+',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative container mx-auto flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-6 pb-8 text-center md:min-h-[70vh] md:px-8 md:pt-16 md:pb-12"
    >
      {/* Optimized background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-5 h-16 w-16 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl will-change-transform md:top-20 md:left-10 md:h-20 md:w-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
        <motion.div
          className="absolute right-5 bottom-10 h-24 w-24 rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 blur-xl will-change-transform md:right-10 md:bottom-20 md:h-32 md:w-32"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="mx-auto w-full max-w-4xl space-y-4 will-change-transform md:space-y-6"
      >
        {/* Logo and Title */}
        <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
          {/* Logo */}
          <motion.div
            className="flex justify-center will-change-transform"
            variants={itemVariants}
          >
            <img
              src="/giltmedia2.svg"
              alt="Gilt Media Logo"
              className="h-40 w-auto will-change-transform sm:h-48 md:h-56 lg:h-64 xl:h-72"
              loading="eager"
              decoding="async"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
          </motion.div>

          <motion.h1
            className="text-center text-base font-bold sm:text-lg md:text-xl lg:text-2xl"
            variants={itemVariants}
          >
            <span className="from-primary bg-gradient-to-r via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Commercial Grade Vertical Films That Just Works
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-muted-foreground text-center text-xs font-semibold sm:text-sm md:text-base lg:text-lg"
            variants={itemVariants}
          >
            <span>I also made this website from scratch, so yeah.</span>
          </motion.h2>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="text-muted-foreground flex flex-col flex-wrap items-center justify-center gap-3 text-sm sm:flex-row md:gap-4 md:text-base"
          variants={itemVariants}
        >
          <div className="hover:text-primary flex cursor-pointer items-center gap-2 transition-colors">
            <MapPin className="h-4 w-4" />
            <span>Kuala Lumpur, MY</span>
          </div>
          <a
            href="mailto:hazem@noveltyventures.uk"
            className="hover:text-primary flex items-center gap-2 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>hazem@noveltyventures.uk</span>
          </a>
        </motion.div>

        {/* Simplified stats */}
        <motion.div
          className="mx-auto grid max-w-sm grid-cols-3 gap-4 pt-2 md:max-w-md md:gap-6 md:pt-4"
          variants={itemVariants}
        >
          {stats.map(stat => (
            <div key={stat.label} className="group text-center">
              <div className="text-primary mb-2 flex justify-center transition-colors">
                {stat.icon}
              </div>
              <div className="text-foreground text-xl font-bold md:text-2xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-1 text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 transform md:bottom-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="bg-muted-foreground/50 mt-2 h-3 w-1 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
