import type { Metadata } from 'next';
import { InsightArticle } from '@/components/sections/insight-article';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title,
    description: `Read "${title}" — an insight article from Red Cedar Real Estate.`,
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  return <InsightArticle slug={slug} />;
}
