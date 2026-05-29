'use client';

type CaseStudyVideoProps = {
  src: string;
  poster?: string | undefined;
  title: string;
};

export function CaseStudyVideo({ src, poster, title }: CaseStudyVideoProps) {
  return (
    <div className="surface-card overflow-hidden rounded-xl">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="auto"
        className="aspect-video w-full bg-black object-contain"
        aria-label={`${title} campaign video`}
      />
    </div>
  );
}
