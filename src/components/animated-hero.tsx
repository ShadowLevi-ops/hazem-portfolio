'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  Camera,
  Video,
  Award,
  MapPin,
  Mail,
  MessageSquare,
} from 'lucide-react';

export function AnimatedHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
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
      className="relative container mx-auto flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-12 text-center md:min-h-[85vh] md:px-8 md:pt-28 md:pb-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-5 h-16 w-16 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl md:top-20 md:left-10 md:h-20 md:w-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-5 bottom-10 h-24 w-24 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl md:right-10 md:bottom-20 md:h-32 md:w-32"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="mx-auto w-full max-w-4xl space-y-6 md:space-y-8"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
          <motion.h1
            className="text-center text-2xl font-bold whitespace-nowrap sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={itemVariants}
          >
            <span className="from-primary bg-gradient-to-r via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Hazem Designs
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-muted-foreground text-center text-sm font-semibold sm:text-base md:text-xl lg:text-2xl xl:text-3xl"
            variants={itemVariants}
          >
            <span className="whitespace-nowrap">
              Visual Storyteller & Creative Director
            </span>
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-muted-foreground mx-auto max-w-2xl text-center text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl"
          variants={itemVariants}
        >
          Capturing moments that matter through the lens of creativity and
          passion. Specializing in photography and videography that tells your
          unique story.
        </motion.p>

        {/* Contact info */}
        <motion.div
          className="text-muted-foreground flex flex-col flex-wrap items-center justify-center gap-4 text-sm sm:flex-row md:gap-6 md:text-base"
          variants={itemVariants}
        >
          <motion.div
            className="hover:text-primary flex cursor-pointer items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="h-4 w-4" />
            <span>Kuala Lumpur, MY</span>
          </motion.div>
          <motion.a
            href="mailto:hazem@noveltyventures.uk"
            className="hover:text-primary flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-4 w-4" />
            <span>hazem@noveltyventures.uk</span>
          </motion.a>
          <motion.a
            href="https://wa.me/0173767247"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-4 w-4" />
            <span>+60 17-376 7247</span>
          </motion.a>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          className="mx-auto grid max-w-sm grid-cols-3 gap-4 pt-4 md:max-w-md md:gap-8 md:pt-6"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-primary mb-2 flex justify-center transition-colors group-hover:text-purple-500">
                {stat.icon}
              </div>
              <motion.div
                className="text-foreground text-xl font-bold md:text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.5 + index * 0.1,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground mt-1 text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform md:bottom-12"
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
