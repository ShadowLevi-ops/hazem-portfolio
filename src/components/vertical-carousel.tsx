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

  const visibleItems = 3;
  const itemHeight = 200;

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
    <div className="relative w-full max-w-4xl mx-auto">
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
                whileHover={{ scale: isActive ? 1.02 : 1, z: 20 }}
                onClick={() => onItemClick(index)}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.95,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/50">
                  <Image
                    src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-between p-6">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-white font-bold text-lg md:text-xl mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      <motion.div 
                        className="space-y-1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {item.camera && (
                          <p className="text-gray-300 text-sm">{item.camera}</p>
                        )}
                        {item.projectDetails && (
                          <p className="text-gray-400 text-sm">{item.projectDetails}</p>
                        )}
                      </motion.div>
                      
                      <motion.div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mt-3 ${isVideo 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                      >
                        {isVideo ? <Play className="h-3 w-3" /> : <Expand className="h-3 w-3" />}
                        {item.type}
                      </motion.div>
                    </div>
                    
                    <motion.div
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isVideo ? (
                        <Play className="h-6 w-6 text-white ml-1" />
                      ) : (
                        <Expand className="h-6 w-6 text-white" />
                      )}
                    </motion.div>
                  </div>
                  
                  {relativePosition === 1 && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
          
          <motion.button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= items.length - visibleItems}
            className="p-2 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.max(1, items.length - visibleItems + 1) }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex 
              ? 'w-8 bg-primary' 
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