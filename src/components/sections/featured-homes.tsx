'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, staggerChild } from '@/components/ui/motion';
import { ArrowRight, Home, Bed, Bath, Ruler } from 'lucide-react';
import { formatPrice, formatBaths, formatSqft, statusColor, statusLabel } from '@/lib/mls/format';

interface FeaturedListing {
  listing_key: string;
  status: string;
  list_price: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  bedrooms: number | null;
  bathrooms_full: number | null;
  bathrooms_half: number | null;
  living_area: number | null;
  photo_url: string | null;
}

interface FeaturedHomesSectionProps {
  listings: FeaturedListing[];
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

export function FeaturedHomesSection({ listings }: FeaturedHomesSectionProps) {
  if (listings.length === 0) return null;

  return (
    <section className="section-padding bg-sand-light">
      <div className="container-wide">
        <FadeIn className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Featured Homes
          </p>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            Homes We&apos;re Proud to Represent
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated selection of exceptional properties across central Maryland,
            each presented with the marketing and attention it deserves.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <motion.div key={listing.listing_key} variants={staggerChild}>
              <Link
                href={`/listings/${listing.listing_key}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-sand rounded overflow-hidden mb-5">
                  <ListingImage
                    src={listing.photo_url}
                    alt={listing.address || 'Property photo'}
                  />
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
                <span className="text-lg font-semibold text-charcoal mb-1 block">
                  {formatPrice(listing.list_price)}
                </span>

                {/* Address */}
                <h3 className="text-editorial text-base text-charcoal mb-0.5 group-hover:text-cedar transition-colors">
                  {listing.address}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {[listing.city, listing.state, listing.zip].filter(Boolean).join(', ')}
                </p>

                {/* Stats */}
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
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-14">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-cedar font-medium tracking-wide hover:gap-3 transition-all"
          >
            View All Listings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
