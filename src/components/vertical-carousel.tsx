"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Expand, Pause, ChevronUp, ChevronDown } from "lucide-react";
import type { PortfolioItem } from "@/types/portfolio";

interface VerticalCarouselProps {
  items: PortfolioItem[];
  onItemClick: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
}

export function VerticalCarousel({ 
  items, 
  onItemClick, 
  autoPlay = true, 
  interval = 8000 // Slower interval for better viewing
}: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(1);

  // Grid with slow vertical auto-scroll - Three wheel layout
  const visibleItems = 6; // Show 6 items in 3x2 grid
  const scrollStep = 3; // Scroll 3 items at a time (one row)

  useEffect(() => {
    if (!isPlaying || items.length <= visibleItems) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + (direction * scrollStep);
        
        if (next >= items.length - visibleItems + 1) {
          setDirection(-1);
          return items.length - visibleItems;
        } else if (next < 0) {
          setDirection(1);
          return 0;
        }
        
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, items.length, visibleItems, direction, interval, scrollStep]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - scrollStep));
    setDirection(-1);
  }, [scrollStep]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(items.length - visibleItems, prev + scrollStep));
    setDirection(1);
  }, [items.length, visibleItems, scrollStep]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        No items to display
      </div>
    );
  }

  // Calculate visible items for grid
  const visibleItemsArray = items.slice(currentIndex, currentIndex + visibleItems);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Grid container with overflow hidden for vertical carousel effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm border">
        {/* Auto-scrolling grid with full-scale masonry 9:16 ratio */}
        <motion.div
          key={currentIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
            duration: 1.2
          }}
          className="p-6"
        >
          {/* Three-wheel layout - Full-scale masonry with 9:16 aspect ratio */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {visibleItemsArray.map((item, index) => {
              const isVideo = item.type === 'videography' || item.type === 'film';
              const actualIndex = currentIndex + index;
              
              // Subtle staggered animation for continuous flow
              const staggerDelay = index * 0.15;
              
              return (
                <motion.div
                  key={`${item.id}-${actualIndex}`}
                  className="relative cursor-pointer group rounded-xl overflow-hidden border border-border/50 aspect-[9/16] shadow-lg hover:shadow-2xl"
                  whileHover={{ 
                    scale: 1.03, 
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => onItemClick(actualIndex)}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.95,
                    y: 40
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: staggerDelay,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Subtle continuous scroll animation on the image */}
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 6 + (index * 0.5), // Vary duration for organic feel
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: staggerDelay
                    }}
                  >
                    <Image
                      src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 28vw"
                    />
                  </motion.div>
                  
                  {/* Enhanced overlay with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-transparent to-black/20 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Top section - Type badge with animation */}
                    <div className="flex justify-end">
                      <motion.div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${isVideo 
                          ? 'bg-red-500/25 text-red-200 border border-red-400/40' 
                          : 'bg-blue-500/25 text-blue-200 border border-blue-400/40'
                        }`}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.3 + staggerDelay, 
                          type: "spring",
                          stiffness: 300
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isVideo ? <Play className="h-3 w-3" /> : <Expand className="h-3 w-3" />}
                        {item.type}
                      </motion.div>
                    </div>
                    
                    {/* Center section - Enhanced play button for videos */}
                    {isVideo && (
                      <div className="flex justify-center items-center flex-1">
                        <motion.div
                          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 group-hover:bg-white/25 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: staggerDelay
                          }}
                        >
                          <Play className="h-6 w-6 text-white ml-1" />
                        </motion.div>
                      </div>
                    )}
                    
                    {/* Bottom section - Enhanced title and details */}
                    <div className="space-y-2">
                      <motion.h3 
                        className="text-white font-bold text-base leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + staggerDelay }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + staggerDelay }}
                      >
                        {item.camera && (
                          <p className="text-gray-200 text-sm truncate">{item.camera}</p>
                        )}
                        {item.projectDetails && (
                          <p className="text-gray-300 text-sm truncate">{item.projectDetails}</p>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Enhanced hover expand indicator */}
                    <motion.div
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                        <Expand className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Enhanced vertical control buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-20">
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-black/70 text-white border border-white/40 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.85)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-black/70 text-white border border-white/40 backdrop-blur-md shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.85)" }}
            whileTap={{ scale: 0.9 }}
            animate={isPlaying ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= items.length - visibleItems}
            className="p-3 rounded-full bg-black/70 text-white border border-white/40 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.85)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Enhanced progress indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: Math.max(1, Math.ceil((items.length - visibleItems + 1) / scrollStep)) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index * scrollStep)}
            className={`h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / scrollStep) === index 
              ? 'w-8 bg-primary shadow-lg shadow-primary/50' 
              : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
} 