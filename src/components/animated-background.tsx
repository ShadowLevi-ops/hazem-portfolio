'use client';

const PARTICLE_COUNT = 10;

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, id) => (
        <span
          key={id}
          className="animated-bg-particle bg-primary/20 dark:bg-primary/30"
          style={{
            left: `${(id * 19 + 9) % 96}%`,
            top: `${(id * 27 + 13) % 94}%`,
            width: `${(id % 3) + 2}px`,
            height: `${(id % 3) + 2}px`,
            animationDelay: `${id * 0.4}s`,
            animationDuration: `${3.5 + (id % 3) * 0.5}s`,
          }}
        />
      ))}

      <div className="from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 absolute inset-0 bg-gradient-to-br via-transparent" />
    </div>
  );
}
