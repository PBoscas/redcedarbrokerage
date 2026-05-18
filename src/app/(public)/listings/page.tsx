import type { Metadata } from 'next';
import {
  getActiveListings,
  getPendingListings,
  getSoldListings,
  getListingCounts,
  getListingPrimaryPhoto,
} from '@/lib/queries/listings';
import { ListingsView } from './listings-view';

export const metadata: Metadata = {
  title: 'Listings',
  description:
    'Browse active, pending, and recently sold homes from Red Cedar Real Estate across central Maryland.',
};

export const dynamic = 'force-dynamic';

export default async function ListingsPage() {
  const [active, pending, sold, counts] = await Promise.all([
    getActiveListings(),
    getPendingListings(),
    getSoldListings(50),
    getListingCounts(),
  ]);

  // Get primary photos for all listings
  const allListings = [...active, ...pending, ...sold];
  const uniqueKeys = [...new Set(allListings.map((l) => l.listing_key))];
  const photoMap: Record<string, string | null> = {};

  await Promise.all(
    uniqueKeys.map(async (key) => {
      photoMap[key] = await getListingPrimaryPhoto(key);
    })
  );

  // Smart default tab: first non-empty tab
  const defaultTab = counts.active > 0 ? 'active' as const
    : counts.pending > 0 ? 'pending' as const
    : 'sold' as const;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 bg-warm-white">
        <div className="container-wide">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            MLS Listings
          </p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            Our <span className="text-cedar">Listings</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-body-lg">
            Browse homes currently represented by Red Cedar Real Estate agents
            across central Maryland.
          </p>
        </div>
      </section>

      <ListingsView
        active={active}
        pending={pending}
        sold={sold}
        counts={counts}
        photoMap={photoMap}
        defaultTab={defaultTab}
      />
    </>
  );
}
