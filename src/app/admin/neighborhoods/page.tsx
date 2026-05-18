import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import { MapPin, Home } from 'lucide-react';

export default async function NeighborhoodsPage() {
  const neighborhoods = await sql`
    SELECT n.id, n.slug, n.name, n.tagline, n.hero_image_url, n.region, n.created_at,
           (SELECT COUNT(*) FROM mls_listings l WHERE l.city ILIKE n.name AND l.status IN ('Active', 'Active Under Contract', 'Coming Soon')) as listing_count
    FROM neighborhoods n
    ORDER BY n.name
  `;

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Neighborhood Guides</h1>
            <p className="text-sm text-muted-foreground">
              Manage neighborhood pages, descriptions, and featured properties.
            </p>
          </div>
        </div>
      </FadeIn>

      {neighborhoods.length === 0 ? (
        <FadeIn delay={0.05}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-sand-light flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-cedar/40" />
            </div>
            <h2 className="text-lg font-medium text-charcoal mb-1">No neighborhoods yet.</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Neighborhood guides will appear here once created.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {neighborhoods.map((hood, i) => (
            <FadeIn key={hood.id} delay={0.05 * (i + 1)}>
              <div className="bg-white rounded-lg border border-border overflow-hidden hover:border-cedar/30 hover:shadow-sm transition-all">
                <div className="h-32 bg-sand-light flex items-center justify-center">
                  {hood.hero_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={hood.hero_image_url} alt={hood.name} className="object-cover w-full h-full" />
                  ) : (
                    <MapPin className="h-8 w-8 text-cedar/30" />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-charcoal mb-1">{hood.name}</h3>
                  {hood.tagline && (
                    <p className="text-xs text-muted-foreground mb-3">{hood.tagline}</p>
                  )}

                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Home className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-charcoal">{hood.listing_count}</span>
                      <span className="text-xs text-muted-foreground">active listings</span>
                    </div>
                    {hood.region && (
                      <span className="text-xs text-muted-foreground">{hood.region}</span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
