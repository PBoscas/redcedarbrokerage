import type { Metadata } from 'next';
import { PropertyDetailContent } from '@/components/sections/property-detail';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} | Featured Homes`,
    description: `Explore ${title} — an exceptional property represented by Red Cedar Real Estate.`,
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  return <PropertyDetailContent slug={slug} />;
}
