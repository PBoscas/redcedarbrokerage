import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import {
  formatStreetAddress,
  formatCityLine,
  formatPrice,
  formatBaths,
  formatSqft,
  statusColor,
  statusLabel,
} from '@/lib/mls/format';
import type { ListingRow } from '@/lib/queries/listings';
import {
  Home, MapPin, Bed, Bath, DollarSign, ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  const rows = await sql`
    SELECT l.*,
      (SELECT COUNT(*) FROM mls_listings WHERE status IN ('Active', 'Active Under Contract', 'Coming Soon')) as active_count,
      (SELECT COUNT(*) FROM mls_listings WHERE status = 'Closed') as sold_count
    FROM mls_listings l
    ORDER BY
      CASE WHEN l.status IN ('Active', 'Coming Soon') THEN 0
           WHEN l.status IN ('Pending', 'Active Under Contract') THEN 1
           ELSE 2 END,
      l.list_price DESC
    LIMIT 50
  ` as (ListingRow & { active_count: number; sold_count: number })[];

  const activeCount = rows.length > 0 ? Number(rows[0].active_count) : 0;
  const soldCount = rows.length > 0 ? Number(rows[0].sold_count) : 0;

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Property Management</h1>
            <p className="text-sm text-muted-foreground">
              {activeCount} active &middot; {soldCount} sold &middot; {rows.length} shown below
            </p>
          </div>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Public Listings
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Home className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-charcoal mb-1">No listings found</p>
              <p className="text-xs text-muted-foreground">MLS listings will appear here once synced.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Property</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Details</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Agent</th>
                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">DOM</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((listing) => (
                    <tr key={listing.listing_key} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                            <Home className="h-4 w-4 text-cedar" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-charcoal">{formatStreetAddress(listing)}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {formatCityLine(listing.city, listing.state, listing.zip)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-charcoal flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          {formatPrice(listing.status === 'Closed' ? listing.close_price : listing.list_price).replace('$', '')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {listing.bedrooms ?? '—'}</span>
                          <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {formatBaths(listing.bathrooms_full, listing.bathrooms_half)}</span>
                          <span>{formatSqft(listing.living_area)} sqft</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(listing.status)}`}>
                          {statusLabel(listing.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{listing.list_agent_name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{listing.days_on_market ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
