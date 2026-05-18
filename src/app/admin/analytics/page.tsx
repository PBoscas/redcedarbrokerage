import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import {
  BarChart3, Home, UserCheck, TrendingUp,
  Clock, MapPin, BarChart,
} from 'lucide-react';

export default async function AnalyticsPage() {
  const [listingRows, agentRows, cityRows] = await Promise.all([
    sql`SELECT
      COUNT(*) FILTER (WHERE status IN ('Active', 'Active Under Contract', 'Coming Soon')) as active,
      COUNT(*) FILTER (WHERE status IN ('Pending', 'Active Under Contract')) as pending,
      COUNT(*) FILTER (WHERE status = 'Closed') as sold,
      COUNT(*) as total
    FROM mls_listings`,
    sql`SELECT COUNT(*) as count FROM agents WHERE status = 'active'`,
    sql`SELECT city, COUNT(*) as count FROM mls_listings WHERE city IS NOT NULL GROUP BY city ORDER BY count DESC LIMIT 8`,
  ]);

  const listings = listingRows[0] ?? { active: 0, pending: 0, sold: 0, total: 0 };
  const agentCount = agentRows[0]?.count ?? 0;
  const topCities = cityRows as { city: string; count: number }[];
  const maxCityCount = topCities.length > 0 ? Math.max(...topCities.map((c) => Number(c.count))) : 1;

  const overviewStats = [
    { label: 'Active Listings', value: String(listings.active), icon: Home },
    { label: 'Pending / Under Contract', value: String(listings.pending), icon: Clock },
    { label: 'Sold / Closed', value: String(listings.sold), icon: TrendingUp },
    { label: 'Active Agents', value: String(agentCount), icon: UserCheck },
  ];

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Listing statistics and market overview.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewStats.map((stat) => (
          <FadeIn key={stat.label}>
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-cedar" />
              </div>
              <p className="text-2xl font-semibold text-charcoal mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Listings by city */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cedar" /> Listings by City
            </h2>
            {topCities.length > 0 ? (
              <div className="space-y-3">
                {topCities.map((city) => (
                  <div key={city.city} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-charcoal truncate">{city.city}</p>
                        <p className="text-xs text-muted-foreground">{city.count}</p>
                      </div>
                      <div className="h-1.5 bg-sand-light rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cedar/30 rounded-full"
                          style={{ width: `${(Number(city.count) / maxCityCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No listing data yet</p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Listing totals summary */}
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-cedar" /> Listing Summary
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Active', count: Number(listings.active), color: 'bg-green-500/60' },
                { label: 'Pending / Under Contract', count: Number(listings.pending), color: 'bg-yellow-500/60' },
                { label: 'Sold / Closed', count: Number(listings.sold), color: 'bg-cedar/40' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-charcoal">{row.label}</p>
                      <p className="text-xs text-muted-foreground">{row.count}</p>
                    </div>
                    <div className="h-1.5 bg-sand-light rounded-full overflow-hidden">
                      <div
                        className={`h-full ${row.color} rounded-full`}
                        style={{
                          width: Number(listings.total) > 0
                            ? `${(row.count / Number(listings.total)) * 100}%`
                            : '0%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-charcoal">Total Listings</p>
                  <p className="text-sm font-semibold text-charcoal">{String(listings.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Google Analytics placeholder sections */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: 'Traffic Overview', description: 'Page views, unique visitors, session duration, and bounce rate' },
            { title: 'Traffic Sources', description: 'Organic search, direct, social media, and referral breakdown' },
            { title: 'Device Breakdown', description: 'Desktop, mobile, and tablet visitor statistics' },
          ].map((section) => (
            <div key={section.title} className="bg-white rounded-lg border border-border p-6">
              <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cedar" /> {section.title}
              </h2>
              <div className="py-8 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Coming soon</p>
                <p className="text-xs text-muted-foreground/70">
                  {section.description} will be available once Google Analytics is connected.
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
