import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NeighborhoodDetail } from '@/components/sections/neighborhood-detail';
import { getNeighborhoodBySlug } from '@/lib/queries/neighborhoods';

interface NeighborhoodPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return { title: 'Neighborhood Not Found' };
  }

  return {
    title: neighborhood.seo_title || `${neighborhood.name} Neighborhood Guide`,
    description: neighborhood.seo_description || `Explore ${neighborhood.name} — lifestyle, real estate, and community insights from Red Cedar Real Estate.`,
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  return (
    <NeighborhoodDetail
      neighborhood={{
        name: neighborhood.name,
        tagline: neighborhood.tagline,
        overview: neighborhood.overview,
        hero_image_url: neighborhood.hero_image_url,
        region: neighborhood.region,
        highlights: neighborhood.highlights,
      }}
    />
  );
}
