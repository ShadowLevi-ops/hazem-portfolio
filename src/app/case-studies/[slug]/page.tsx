import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyArticle } from '@/components/case-study-article';
import { CASE_STUDIES, getCaseStudy } from '@/data/case-studies';
import { SITE_URL } from '@/lib/site';

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map(study => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `Case Study: ${study.title}`,
    description: study.summary,
    alternates: {
      canonical: `${SITE_URL}/case-studies/${study.slug}/`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyArticle study={study} />;
}
