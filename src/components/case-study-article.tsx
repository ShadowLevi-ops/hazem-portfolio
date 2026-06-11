import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CaseStudyVideo } from '@/components/case-study-video';
import { getCaseStudyPortfolioItem, type CaseStudy } from '@/data/case-studies';

type CaseStudyArticleProps = {
  study: CaseStudy;
};

export function CaseStudyArticle({ study }: CaseStudyArticleProps) {
  const item = getCaseStudyPortfolioItem(study);
  const videoSrc = item?.mediaUrl ?? '';
  const poster = item?.thumbnailUrl;

  return (
    <main className="section-shell section-block">
      <article className="mx-auto max-w-4xl space-y-8">
        <Link
          href="/#case-studies"
          className="text-muted-foreground hover:text-foreground -mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back
        </Link>

        <header className="section-header">
          <p className="section-kicker">Case Study</p>
          <h1 className="section-title">{study.title}</h1>
          <p className="section-copy">{study.summary}</p>
        </header>

        {videoSrc ? (
          <CaseStudyVideo src={videoSrc} poster={poster} title={study.title} />
        ) : null}

        <section className="surface-card space-y-4 rounded-xl p-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl">Challenge</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {study.challenge}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-xl">Approach</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {study.approach}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-xl">Outcome</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {study.outcome}
            </p>
          </div>
        </section>

        {study.results ? (
          <section className="surface-card space-y-5 rounded-xl p-6">
            <div className="space-y-2">
              <h2 className="font-serif text-xl">Results</h2>
              <p className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                {study.results.platform}
              </p>
              <p className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
                {study.results.period}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {study.results.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {study.results.metrics.map(metric => (
                <div
                  key={metric.label}
                  className="border-border/60 bg-background/50 rounded-lg border px-3 py-3"
                >
                  <p className="text-muted-foreground text-[10px] tracking-[0.1em] uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <p className="text-sm">
          Related service:{' '}
          <Link
            href={study.relatedService.href}
            className="underline underline-offset-4"
          >
            {study.relatedService.label}
          </Link>
        </p>
      </article>
    </main>
  );
}
