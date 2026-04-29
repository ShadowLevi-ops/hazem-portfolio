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
  const buttonId = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const countId = `${buttonId}-count`;

  return (
    <motion.button
      id={buttonId}
      onClick={onClick}
      aria-label={`Filter portfolio by ${label}`}
      aria-pressed={isActive}
      aria-describedby={countId}
      className={`relative flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[10px] font-light tracking-tight transition-all duration-300 md:gap-2.5 md:px-5 md:py-2.5 md:text-sm ${
        isActive
          ? 'bg-primary/15 text-primary border-primary/45 shadow-sm'
          : 'bg-background/45 border-border/50 hover:border-primary/30 hover:bg-accent/30 text-muted-foreground hover:text-foreground backdrop-blur-md'
      } `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span
        className="flex items-center text-[10px] md:text-base"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-[10px] font-light tracking-tight whitespace-nowrap uppercase md:text-sm">
        {label}
      </span>
      <motion.span
        id={countId}
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-light md:px-2 md:text-xs ${
          isActive
            ? 'bg-primary/20 text-primary'
            : 'bg-muted/50 text-muted-foreground'
        } `}
        key={count}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        aria-label={`${count} items`}
      >
        {count}
      </motion.span>

      {isActive && (
        <motion.div
          className="border-primary/20 absolute inset-0 rounded-md border"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
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
      icon: <Grid className="h-2.5 w-2.5 md:h-4 md:w-4" />,
      count: counts.all,
    },
    {
      key: 'photography',
      label: 'Photography',
      icon: <Camera className="h-2.5 w-2.5 md:h-4 md:w-4" />,
      count: counts.photography,
    },
    {
      key: 'video',
      label: 'Video',
      icon: <Video className="h-2.5 w-2.5 md:h-4 md:w-4" />,
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
      className="z-20 mb-8 flex flex-col items-center gap-4 bg-transparent px-2 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      role="region"
      aria-label="Portfolio filters"
    >
      <div
        className="flex flex-wrap justify-center gap-1 md:gap-2"
        role="group"
        aria-label="Filter options"
      >
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

      <div
        className="bg-muted/30 mx-auto h-px w-full max-w-2xl overflow-hidden"
        role="progressbar"
        aria-label="Filter progress"
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="bg-primary/60 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(ratio * 100)}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
