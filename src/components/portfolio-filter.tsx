'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Grid } from 'lucide-react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  count: number;
}

function FilterButton({
  label,
  isActive,
  onClick,
  icon,
  count,
}: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-300 md:gap-2 md:px-4 md:py-2 ${
        isActive
          ? 'bg-primary text-primary-foreground border-primary shadow-primary/25 shadow-lg'
          : 'bg-background/80 border-border hover:border-primary/50 hover:bg-accent/50 backdrop-blur-sm'
      } `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex items-center text-xs md:text-sm">{icon}</span>
      <span className="text-xs font-medium whitespace-nowrap md:text-sm">
        {label}
      </span>
      <motion.span
        className={`rounded-full px-1 py-0.5 text-xs md:px-1.5 ${
          isActive
            ? 'bg-primary-foreground/20 text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        } `}
        key={count}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {count}
      </motion.span>

      {isActive && (
        <motion.div
          className="border-primary/30 absolute inset-0 rounded-full border-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
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

export function PortfolioFilter({
  activeFilter,
  onFilterChange,
  counts,
}: PortfolioFilterProps) {
  const filters = [
    {
      key: 'all',
      label: 'All Work',
      icon: <Grid className="h-3 w-3 md:h-4 md:w-4" />,
      count: counts.all,
    },
    {
      key: 'photography',
      label: 'Photography',
      icon: <Camera className="h-3 w-3 md:h-4 md:w-4" />,
      count: counts.photography,
    },
    {
      key: 'video',
      label: 'Video',
      icon: <Video className="h-3 w-3 md:h-4 md:w-4" />,
      count: counts.video,
    },
  ];

  const currentCount =
    activeFilter === 'all'
      ? counts.all
      : activeFilter === 'photography'
        ? counts.photography
        : counts.video;

  const ratio = Math.max(
    0,
    Math.min(1, counts.all ? currentCount / counts.all : 0)
  );

  return (
    <motion.div
      className="sticky top-0 z-20 mb-4 flex flex-col gap-2 px-2 md:mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        <AnimatePresence mode="wait">
          {filters.map((filter, index) => (
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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
      </div>

      <div className="bg-muted mx-auto h-1 w-full max-w-3xl overflow-hidden rounded-full">
        <motion.div
          className="bg-primary h-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(ratio * 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
