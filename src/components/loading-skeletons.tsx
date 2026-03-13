'use client';

// Optimized lightweight skeleton for PortfolioFilter
export function PortfolioFilterSkeleton() {
  return (
    <div className="md:bg-background/90 z-20 mb-4 flex flex-col items-center gap-2 bg-transparent px-2 md:sticky md:top-20 md:z-30 md:mb-6 md:backdrop-blur-md">
      <div className="flex flex-wrap justify-center gap-1 md:gap-2">
        {[0, 1, 2].map(index => (
          <div
            key={index}
            className="bg-muted/60 h-8 w-20 animate-pulse rounded-full md:h-10 md:w-28"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          />
        ))}
      </div>
      <div className="bg-muted/30 mx-auto h-1 w-full max-w-3xl overflow-hidden rounded-full">
        <div className="bg-primary/30 h-full w-1/3 animate-pulse" />
      </div>
    </div>
  );
}

// Optimized lightweight skeleton for VerticalCarousel
export function VerticalCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <div className="from-background/50 to-background/80 relative overflow-hidden rounded-xl border bg-gradient-to-b backdrop-blur-sm md:rounded-2xl">
        <div className="p-3 md:p-6">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
            {skeletonItems.map((item, index) => (
              <div
                key={item}
                className="bg-muted/40 aspect-[9/16] overflow-hidden rounded-lg md:rounded-xl"
                style={{
                  animationDelay: `${Math.min(index * 30, 300)}ms`,
                  opacity: Math.min(0.4 + index * 0.05, 1),
                }}
              >
                <div className="relative h-full w-full animate-pulse">
                  <div className="from-muted/60 via-muted/40 to-muted/60 absolute inset-0 bg-gradient-to-br" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Optimized lightweight skeleton for entire Portfolio Section
export function PortfolioSectionSkeleton() {
  return (
    <section className="relative z-10 container mx-auto px-4 pt-8 pb-8 md:px-6 md:pt-12 md:pb-12 lg:px-8">
      <div className="mb-6 text-center md:mb-8">
        <div className="from-primary/20 mx-auto h-8 w-32 animate-pulse rounded-lg bg-gradient-to-r to-purple-500/20 md:h-10 md:w-40" />
      </div>

      <PortfolioFilterSkeleton />

      <div className="mt-4">
        <VerticalCarouselSkeleton />
      </div>
    </section>
  );
}
