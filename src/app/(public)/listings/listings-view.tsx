'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import { Home, Bed, Bath, Ruler } from 'lucide-react';
import { formatPrice, formatBaths, formatSqft, formatStreetAddress, formatCityLine, statusColor, statusLabel } from '@/lib/mls/format';
import type { ListingRow } from '@/lib/queries/listings';

type Tab = 'active' | 'pending' | 'sold';

interface ListingsViewProps {
  active: ListingRow[];
  pending: ListingRow[];
  sold: ListingRow[];
  counts: { active: number; pending: number; sold: number };
  photoMap: Record<string, string | null>;
  defaultTab: Tab;
}

function ListingImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-sand to-cedar/5 flex items-center justify-center">
        <Home className="h-10 w-10 text-cedar/20" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
  );
}

function ListingCard({
  listing,
  photoUrl,
}: {
  listing: ListingRow;
  photoUrl: string | null;
}) {
  return (
    <Link
      href={`/listings/${listing.listing_key}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-sand rounded overflow-hidden mb-4">
        <ListingImage src={photoUrl} alt={listing.address || 'Property photo'} />
        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block text-[0.65rem] tracking-[0.15em] uppercase font-medium px-3 py-1 rounded-full ${statusColor(listing.status)}`}
          >
            {statusLabel(listing.status)}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-1.5">
        <span className="text-lg font-semibold text-charcoal">
          {formatPrice(listing.list_price)}
        </span>
        {listing.status === 'Closed' && listing.close_price && (
          <span className="text-sm text-muted-foreground">
            Sold {formatPrice(listing.close_price)}
          </span>
        )}
      </div>

      {/* Address */}
      <h3 className="text-editorial text-base text-charcoal mb-0.5 group-hover:text-cedar transition-colors">
        {formatStreetAddress(listing)}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {formatCityLine(listing.city, listing.state, listing.zip)}
      </p>

      {/* Stats with icons */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {listing.bedrooms != null && (
          <span className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5" />
            {listing.bedrooms}
          </span>
        )}
        {(listing.bathrooms_full != null || listing.bathrooms_half != null) && (
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" />
            {formatBaths(listing.bathrooms_full, listing.bathrooms_half)}
          </span>
        )}
        {listing.living_area != null && (
          <span className="flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5" />
            {formatSqft(listing.living_area)} SF
          </span>
        )}
      </div>
    </Link>
  );
}

export function ListingsView({
  active,
  pending,
  sold,
  counts,
  photoMap,
  defaultTab,
}: ListingsViewProps) {
  const [tab, setTab] = useState<Tab>(defaultTab);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'pending', label: 'Under Contract', count: counts.pending },
    { key: 'sold', label: 'Sold', count: counts.sold },
  ];

  const listings = tab === 'active' ? active : tab === 'pending' ? pending : sold;

  return (
    <section className="pt-8 pb-16 md:pb-24 bg-warm-white">
      <div className="container-wide">
        {/* Tabs */}
        <FadeIn>
          <div className="flex gap-1 mb-10 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? 'text-cedar'
                    : 'text-muted-foreground hover:text-charcoal'
                }`}
              >
                {t.label}
                <span className="ml-2 text-xs opacity-60">({t.count})</span>
                {tab === t.key && (
                  <motion.div
                    layoutId="listing-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cedar"
                  />
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {listings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No listings to display.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.listing_key}
                    listing={listing}
                    photoUrl={photoMap[listing.listing_key] ?? null}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
