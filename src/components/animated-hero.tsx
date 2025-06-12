"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, MessageSquare, Camera, Video, Award } from "lucide-react";

const titleWords = ["Commercial-grade", "vertical", "stories", "that", "stop", "the", "scroll."];
const description = "I transform brands with expertly crafted Instagram content that fits perfectly in your audience's feed. From luxury Parisian moments to Bali's natural beauty to vibrant music scenes—I deliver professional vertical snippets designed to boost engagement and elevate your brand's social presence.";

export function AnimatedHero() {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (currentWordIndex < titleWords.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + (prev ? " " : "") + titleWords[currentWordIndex]);
        setCurrentWordIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!showDescription) {
      const timer = setTimeout(() => {
        setShowDescription(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, showDescription]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const stats = [
    { icon: <Camera className="h-5 w-5" />, label: "Photography", value: "50+" },
    { icon: <Video className="h-5 w-5" />, label: "Video Projects", value: "30+" },
    { icon: <Award className="h-5 w-5" />, label: "Happy Clients", value: "100+" },
  ];

  return (
    <section 
      ref={ref}
      className="container mx-auto flex flex-col items-center justify-center text-center pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden px-4 md:px-8 min-h-[80vh]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto"
      >
        {/* Main title with typing effect */}
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 min-h-[2em] flex items-center justify-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {typedText}
          </span>
          {currentWordIndex < titleWords.length && (
            <motion.span
              className="inline-block w-1 h-8 md:h-12 lg:h-16 bg-primary ml-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.h1>

        {/* Description with fade-in effect */}
        <motion.p 
          className="text-sm md:text-base font-medium max-w-3xl mx-auto mb-8 text-justify italic text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showDescription ? 1 : 0, y: showDescription ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        > 
          {description}
        </motion.p>

        {/* Contact info with staggered animation */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm md:text-base text-muted-foreground mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="h-4 w-4" />
            <span>Kuala Lumpur, MY</span>
          </motion.div>
          <motion.a 
            href="mailto:hazem@noveltyventures.uk"
            className="flex items-center gap-2 hover:text-primary transition-colors"
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
            className="flex items-center gap-2 hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-4 w-4" />
            <span>+60 17-376 7247</span>
          </motion.a>
        </motion.div>

        {/* Animated stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="flex justify-center mb-2 text-primary group-hover:text-purple-500 transition-colors"
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div 
                className="text-xl md:text-2xl font-bold text-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1 + index * 0.2 
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 