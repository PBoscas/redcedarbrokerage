import type { Metadata } from 'next';
import { NeighborhoodsArchive } from '@/components/sections/neighborhoods-archive';
import { getAllNeighborhoods, getDistinctRegions } from '@/lib/queries/neighborhoods';

export const metadata: Metadata = {
  title: 'Neighborhoods',
  description: 'Explore the neighborhoods of Howard County, Maryland with expert guides from Red Cedar Real Estate.',
};

export default async function NeighborhoodsPage() {
  const [neighborhoods, regions] = await Promise.all([
    getAllNeighborhoods(),
    getDistinctRegions(),
  ]);

  return (
    <>
      <section className="pt-32 pb-16 bg-warm-white">
        <div className="container-wide">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">Local Expertise</p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            <span className="text-cedar">Neighborhood</span> Guides
          </h1>
          <p className="text-muted-foreground max-w-xl text-body-lg">
            Intimate knowledge of the communities that make Howard County one of the best places to live in Maryland.
          </p>
        </div>
      </section>
      <NeighborhoodsArchive neighborhoods={neighborhoods} regions={regions} />
    </>
  );
}
