"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Film, Grid } from "lucide-react";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  count: number;
}

function FilterButton({ label, isActive, onClick, icon, count }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
        ${isActive 
          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25' 
          : 'bg-background/80 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-accent/50'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
      <motion.span 
        className={`
          text-xs px-1.5 py-0.5 rounded-full
          ${isActive 
            ? 'bg-primary-foreground/20 text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
          }
        `}
        key={count}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {count}
      </motion.span>
      
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

interface PortfolioFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    photography: number;
    video: number;
  };
}

export function PortfolioFilter({ activeFilter, onFilterChange, counts }: PortfolioFilterProps) {
  const filters = [
    { key: 'all', label: 'All Work', icon: <Grid className="h-4 w-4" />, count: counts.all },
    { key: 'photography', label: 'Photography', icon: <Camera className="h-4 w-4" />, count: counts.photography },
    { key: 'video', label: 'Video', icon: <Video className="h-4 w-4" />, count: counts.video },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {filters.map((filter, index) => (
          <motion.div
            key={filter.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FilterButton
              label={filter.label}
              isActive={activeFilter === filter.key}
              onClick={() => onFilterChange(filter.key)}
              icon={filter.icon}
              count={filter.count}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 