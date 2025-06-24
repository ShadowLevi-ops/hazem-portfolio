"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Expand } from "lucide-react";
import type { PortfolioItem } from "@/types/portfolio";

interface VerticalCarouselProps {
  items: PortfolioItem[];
  onItemClick: (index: number) => void;
}

export function VerticalCarousel({ 
  items, 
  onItemClick
}: VerticalCarouselProps) {

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        No items to display
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Static masonry grid container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm border">
        {/* Static grid with full-scale masonry 9:16 ratio */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
            duration: 1.2
          }}
          className="p-6"
        >
          {/* Static masonry layout - Full-scale with 9:16 aspect ratio */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, index) => {
              const isVideo = item.type === 'videography' || item.type === 'film';
              
              // Staggered animation for entrance
              const staggerDelay = index * 0.1;
              
              return (
                <motion.div
                  key={item.id}
                  className="relative cursor-pointer group rounded-xl overflow-hidden border border-border/50 aspect-[9/16] shadow-lg hover:shadow-2xl"
                  whileHover={{ 
                    scale: 1.03, 
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => onItemClick(index)}
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
                  {/* Static image without scroll animation */}
                  <div className="relative w-full h-full">
                    <Image
                      src={isVideo ? (item.thumbnailUrl || '/images/p1.PNG') : item.mediaUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  
                  {/* Enhanced overlay with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-transparent to-black/20 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Top section - Type badge */}
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
      </div>
    </div>
  );
} 