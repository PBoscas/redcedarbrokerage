import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListingByKey, getListingPhotos } from '@/lib/queries/listings';
import { getAgentByFullName } from '@/lib/queries/agents';
import { formatPrice, formatBaths, formatSqft, statusColor, statusLabel } from '@/lib/mls/format';
import { ArrowLeft, Bed, Bath, Ruler, Calendar } from 'lucide-react';
import { ListingDetailImages } from './images';

export const dynamic = 'force-dynamic';

interface ListingDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ListingDetailProps) {
  const { id } = await params;
  const listing = await getListingByKey(id);
  if (!listing) return { title: 'Listing Not Found' };

  return {
    title: `${listing.address} | Red Cedar Real Estate`,
    description: listing.public_remarks?.slice(0, 160) || `${listing.address} - ${listing.city}, ${listing.state}`,
  };
}

export default async function ListingDetailPage({ params }: ListingDetailProps) {
  const { id } = await params;
  const [listing, photos] = await Promise.all([
    getListingByKey(id),
    getListingPhotos(id),
  ]);

  if (!listing) notFound();

  const heroPhoto = photos[0]?.media_url ?? null;
  const galleryPhotos = photos.slice(1, 25);

  // Try to match the listing agent to a Red Cedar agent
  const listingAgent = listing.list_agent_name
    ? await getAgentByFullName(listing.list_agent_name)
    : null;
  const contactHref = listingAgent
    ? `/contact?agent=${listingAgent.slug}`
    : `/contact?listing=${listing.listing_id}`;

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] bg-charcoal overflow-hidden">
        <ListingDetailImages heroUrl={heroPhoto} alt={listing.address || 'Property'} />
        <div className="absolute inset-0 bg-black/30" />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container-wide">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Listings
            </Link>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="container-wide">
            <span
              className={`inline-block text-[0.65rem] tracking-[0.15em] uppercase font-medium px-3 py-1 rounded-full ${statusColor(listing.status)}`}
            >
              {statusLabel(listing.status)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - Details */}
            <div className="lg:col-span-2">
              {/* Address + Price */}
              <div className="mb-8">
                <h1 className="text-display text-3xl md:text-4xl text-charcoal mb-2">
                  {listing.address}
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  {[listing.city, listing.state, listing.zip].filter(Boolean).join(', ')}
                </p>
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-semibold text-charcoal">
                    {formatPrice(listing.list_price)}
                  </span>
                  {listing.status === 'Closed' && listing.close_price && (
                    <span className="text-lg text-muted-foreground">
                      Sold for {formatPrice(listing.close_price)}
                    </span>
                  )}
                  {listing.original_list_price &&
                    listing.original_list_price !== listing.list_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(listing.original_list_price)}
                      </span>
                    )}
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 p-6 bg-sand-light rounded-lg">
                {listing.bedrooms != null && (
                  <div className="flex items-center gap-3">
                    <Bed className="h-5 w-5 text-cedar" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                )}
                {(listing.bathrooms_full != null || listing.bathrooms_half != null) && (
                  <div className="flex items-center gap-3">
                    <Bath className="h-5 w-5 text-cedar" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">
                        {formatBaths(listing.bathrooms_full, listing.bathrooms_half)}
                      </p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                )}
                {listing.living_area != null && (
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-cedar" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">
                        {formatSqft(listing.living_area)}
                      </p>
                      <p className="text-xs text-muted-foreground">Sq Ft</p>
                    </div>
                  </div>
                )}
                {listing.year_built != null && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-cedar" />
                    <div>
                      <p className="text-lg font-semibold text-charcoal">{listing.year_built}</p>
                      <p className="text-xs text-muted-foreground">Year Built</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {listing.public_remarks && (
                <div className="mb-10">
                  <h2 className="text-editorial text-xl text-charcoal mb-4">About This Property</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {listing.public_remarks}
                  </p>
                </div>
              )}

              {/* Photo Gallery */}
              {galleryPhotos.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-editorial text-xl text-charcoal mb-4">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryPhotos.map((photo) => (
                      <div
                        key={photo.media_key}
                        className="relative aspect-[4/3] bg-sand rounded overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.media_url}
                          alt={photo.media_category || 'Property photo'}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Property Details Card */}
                <div className="bg-white border border-border rounded-lg p-6">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-charcoal mb-4">
                    Property Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">MLS #</dt>
                      <dd className="text-charcoal font-medium">{listing.listing_id}</dd>
                    </div>
                    {listing.property_sub_type && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd className="text-charcoal">{listing.property_sub_type}</dd>
                      </div>
                    )}
                    {listing.architectural_style && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Style</dt>
                        <dd className="text-charcoal">{listing.architectural_style}</dd>
                      </div>
                    )}
                    {listing.stories != null && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Stories</dt>
                        <dd className="text-charcoal">{listing.stories}</dd>
                      </div>
                    )}
                    {listing.garage_spaces != null && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Garage</dt>
                        <dd className="text-charcoal">{listing.garage_spaces} spaces</dd>
                      </div>
                    )}
                    {listing.lot_size_acres != null && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Lot Size</dt>
                        <dd className="text-charcoal">{listing.lot_size_acres} acres</dd>
                      </div>
                    )}
                    {listing.subdivision && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Subdivision</dt>
                        <dd className="text-charcoal">{listing.subdivision}</dd>
                      </div>
                    )}
                    {listing.county && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">County</dt>
                        <dd className="text-charcoal">{listing.county}</dd>
                      </div>
                    )}
                    {listing.days_on_market != null && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Days on Market</dt>
                        <dd className="text-charcoal">{listing.days_on_market}</dd>
                      </div>
                    )}
                    {listing.association_fee != null && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">HOA Fee</dt>
                        <dd className="text-charcoal">
                          {formatPrice(listing.association_fee)}
                          {listing.association_fee_freq ? `/${listing.association_fee_freq}` : ''}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Listing Agent */}
                {listing.list_agent_name && (
                  <div className="bg-white border border-border rounded-lg p-6">
                    <h3 className="text-sm font-semibold tracking-wide uppercase text-charcoal mb-3">
                      Listing Agent
                    </h3>
                    <p className="text-charcoal font-medium">{listing.list_agent_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      MLS ID: {listing.list_agent_mls_id}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={contactHref}
                  className="block w-full text-center px-6 py-3 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors"
                >
                  {listingAgent
                    ? `Contact ${listingAgent.first_name} ${listingAgent.last_name}`
                    : 'Inquire About This Property'
                  }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
