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
  interval = 6000 
}: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(1);

  // Grid with slow vertical auto-scroll
  const visibleItems = 6; // Show 6 items in grid
  const scrollStep = 1; // Slow scroll one item at a time

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
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Grid container with overflow hidden for vertical carousel effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm border">
        {/* Auto-scrolling grid with uniform card sizes */}
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.8
          }}
          className="p-4"
        >
          {/* Uniform grid - consistent card sizes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleItemsArray.map((item, index) => {
              const isVideo = item.type === 'videography' || item.type === 'film';
              const actualIndex = currentIndex + index;
              
              return (
                <motion.div
                  key={`${item.id}-${actualIndex}`}
                  className="relative cursor-pointer group rounded-xl overflow-hidden border border-border/50 aspect-[4/3]"
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  onClick={() => onItemClick(actualIndex)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <Image
                    src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  
                  {/* Original overlay styling */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* Top section - Type badge */}
                    <div className="flex justify-end">
                      <motion.div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isVideo 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      >
                        {isVideo ? <Play className="h-3 w-3" /> : <Expand className="h-3 w-3" />}
                        {item.type}
                      </motion.div>
                    </div>
                    
                    {/* Center section - Play button for videos */}
                    {isVideo && (
                      <div className="flex justify-center items-center flex-1">
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="h-5 w-5 text-white ml-1" />
                        </motion.div>
                      </div>
                    )}
                    
                    {/* Bottom section - Title and details */}
                    <div className="space-y-1">
                      <motion.h3 
                        className="text-white font-bold text-sm leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.div 
                        className="space-y-0.5"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {item.camera && (
                          <p className="text-gray-300 text-xs truncate">{item.camera}</p>
                        )}
                        {item.projectDetails && (
                          <p className="text-gray-400 text-xs truncate">{item.projectDetails}</p>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Hover expand indicator */}
                    <motion.div
                      className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Expand className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Vertical control buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
          
          <motion.button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= items.length - visibleItems}
            className="p-2 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center mt-6 gap-1">
        {Array.from({ length: Math.max(1, items.length - visibleItems + 1) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex 
              ? 'w-6 bg-primary shadow-md shadow-primary/50' 
              : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
} 