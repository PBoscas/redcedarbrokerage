import { FadeIn } from '@/components/ui/motion';
import { Home, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getActiveListings, getSoldListings, getPendingListings } from '@/lib/queries/listings';
import { formatStreetAddress, formatCityLine } from '@/lib/mls/format';

export default async function PropertiesPage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const [active, pending, sold] = await Promise.all([
    getActiveListings(),
    getPendingListings(),
    getSoldListings(20),
  ]);

  const allProperties = [
    ...active.map((l) => ({ ...l, displayStatus: 'Active' as const })),
    ...pending.filter((l) => !active.find((a) => a.listing_key === l.listing_key)).map((l) => ({ ...l, displayStatus: 'Pending' as const })),
    ...sold.map((l) => ({ ...l, displayStatus: 'Sold' as const })),
  ];

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <FadeIn>
          <h1 className="text-display text-2xl text-charcoal mb-1">Brokerage Properties</h1>
          <p className="text-sm text-muted-foreground">
            {active.length} active, {pending.length} pending, {sold.length} recently sold
          </p>
        </FadeIn>
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors"
        >
          <ExternalLink className="h-4 w-4" /> View Public Listings
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Property</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Agent</th>
              </tr>
            </thead>
            <tbody>
              {allProperties.slice(0, 50).map((property) => (
                <tr key={property.listing_key} className="border-b border-border last:border-0 hover:bg-sand-light/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-sand flex items-center justify-center flex-shrink-0">
                        <Home className="h-4 w-4 text-cedar/40" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {formatStreetAddress(property) || 'Address unavailable'}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatCityLine(property.city, property.state, property.zip)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full ${
                      property.displayStatus === 'Active' ? 'bg-green-50 text-green-700' :
                      property.displayStatus === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {property.displayStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">
                    ${(property.displayStatus === 'Sold' ? property.close_price : property.list_price)?.toLocaleString() ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {property.list_agent_name ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
