import type { Metadata } from 'next';
import { FeaturedHomesArchive } from '@/components/sections/featured-homes-archive';

export const metadata: Metadata = {
  title: 'Featured Homes',
  description:
    'Explore exceptional properties represented by Red Cedar Real Estate across the Washington DC, Maryland, and Virginia markets.',
};

export default function FeaturedHomesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-warm-white">
        <div className="container-wide">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Our Portfolio
          </p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            Featured <span className="text-cedar">Homes</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-body-lg">
            A curated collection of exceptional properties, each represented with
            the marketing craft and personal attention it deserves.
          </p>
        </div>
      </section>

      <FeaturedHomesArchive />
    </>
  );
}
