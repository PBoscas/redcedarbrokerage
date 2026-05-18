import { FadeIn } from '@/components/ui/motion';
import { Home, Users, BarChart3 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getListingCounts } from '@/lib/queries/listings';
import { sql } from '@/lib/db';

export default async function AnalyticsPage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const listingCounts = await getListingCounts();
  const agentCountRows = await sql`SELECT COUNT(*) as count FROM agents WHERE status = 'active'`;
  const agentCount = Number(agentCountRows[0]?.count) || 0;

  const stats = [
    { label: 'Active Listings', value: String(listingCounts.active), icon: Home, period: 'Current' },
    { label: 'Sold Properties', value: String(listingCounts.sold), icon: Home, period: 'All time' },
    { label: 'Pending', value: String(listingCounts.pending), icon: BarChart3, period: 'Current' },
    { label: 'Active Agents', value: String(agentCount), icon: Users, period: 'Team' },
  ];

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground mb-8">Brokerage performance overview.</p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <FadeIn key={stat.label}>
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-cedar" />
                <span className="text-xs text-muted-foreground">{stat.period}</span>
              </div>
              <p className="text-2xl font-semibold text-charcoal mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-sm font-medium text-charcoal mb-4">Detailed Analytics</h2>
          <div className="h-64 bg-sand-light rounded flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Detailed analytics and charts coming soon</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
