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
  interval = 4000 
}: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(1);

  // Optimized for vertical content - showing fewer items but taller
  const visibleItems = 2; // Show 2 items at once for better vertical focus
  const itemHeight = 400; // Increased height for vertical content

  useEffect(() => {
    if (!isPlaying || items.length <= visibleItems) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + direction;
        
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
  }, [isPlaying, items.length, visibleItems, direction, interval]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setDirection(-1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(items.length - visibleItems, prev + 1));
    setDirection(1);
  }, [items.length, visibleItems]);

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

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Main carousel container - optimized for vertical content */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm border"
        style={{ height: `${itemHeight * visibleItems}px` }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ 
            y: -currentIndex * itemHeight,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.8
          }}
        >
          {items.map((item, index) => {
            const isVideo = item.type === 'videography' || item.type === 'film';
            const isActive = index >= currentIndex && index < currentIndex + visibleItems;
            const relativePosition = index - currentIndex;
            
            return (
              <motion.div
                key={item.id}
                className={`absolute w-full cursor-pointer group ${isActive ? 'z-10' : 'z-0'}`}
                style={{ 
                  top: `${index * itemHeight}px`,
                  height: `${itemHeight}px`
                }}
                whileHover={{ scale: isActive ? 1.01 : 1, z: 20 }}
                onClick={() => onItemClick(index)}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.2,
                  scale: isActive ? 1 : 0.98,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Vertical content container */}
                <div className="relative w-full h-full flex justify-center items-center p-4">
                  {/* Vertical video/image frame - 9:16 aspect ratio */}
                  <div className="relative h-full aspect-[9/16] rounded-2xl overflow-hidden border-2 border-border/50 shadow-2xl">
                    <Image
                      src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Content overlay - positioned for vertical layout */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      {/* Top section - Type badge */}
                      <div className="flex justify-end">
                        <motion.div
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${isVideo 
                            ? 'bg-red-500/30 text-red-200 border border-red-400/50' 
                            : 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                          }`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {isVideo ? <Play className="h-3 w-3" /> : <Expand className="h-3 w-3" />}
                          {item.type}
                        </motion.div>
                      </div>
                      
                      {/* Center section - Play button for videos */}
                      {isVideo && (
                        <div className="flex justify-center items-center">
                          <motion.div
                            className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30"
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: "rgba(255,255,255,0.3)",
                              borderColor: "rgba(255,255,255,0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="h-8 w-8 text-white ml-1" />
                          </motion.div>
                        </div>
                      )}
                      
                      {/* Bottom section - Title and details */}
                      <div className="space-y-2">
                        <motion.h3 
                          className="text-white font-bold text-lg leading-tight"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.title}
                        </motion.h3>
                        
                        <motion.div 
                          className="space-y-1"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {item.camera && (
                            <p className="text-gray-300 text-xs">{item.camera}</p>
                          )}
                          {item.projectDetails && (
                            <p className="text-gray-400 text-xs">{item.projectDetails}</p>
                          )}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {relativePosition === 0 && (
                      <motion.div
                        className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-l-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </div>
                  
                  {/* Side content for horizontal space usage */}
                  <div className="hidden lg:flex flex-col justify-center ml-8 max-w-xs">
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: isActive ? 1 : 0.5 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {item.camera && <p>📷 {item.camera}</p>}
                        {item.projectDetails && <p>🎬 {item.projectDetails}</p>}
                        {item.client && <p>👥 {item.client}</p>}
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemClick(index);
                        }}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        View Full Screen
                        <Expand className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Control buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= items.length - visibleItems}
            className="p-3 rounded-full bg-black/60 text-white border border-white/30 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.max(1, items.length - visibleItems + 1) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex 
              ? 'w-8 bg-primary shadow-lg shadow-primary/50' 
              : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
} 