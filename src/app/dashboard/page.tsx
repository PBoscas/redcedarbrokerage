import { FadeIn } from '@/components/ui/motion';
import {
  BarChart3, Home, MessageSquare,
  User, ArrowRight, CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAgentByUserId } from '@/lib/queries/agents';
import { getListingCounts } from '@/lib/queries/listings';

function computeProfileCompleteness(agent: {
  first_name: string;
  last_name: string;
  title: string;
  bio_short: string;
  bio_full: string | null;
  headshot_url: string | null;
  phone: string | null;
  email: string;
  position_statement: string | null;
}) {
  const fields = [
    !!agent.first_name,
    !!agent.last_name,
    !!agent.title,
    !!agent.bio_short,
    !!agent.bio_full,
    !!agent.headshot_url,
    !!agent.phone,
    !!agent.email,
    !!agent.position_statement,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

const quickActions = [
  { label: 'Edit My Profile', href: '/dashboard/profile', icon: User },
  { label: 'Manage Properties', href: '/dashboard/properties', icon: Home },
  { label: 'View Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
  { label: 'View Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const agent = await getAgentByUserId(session.user.id);
  const listingCounts = await getListingCounts();
  const profileScore = agent ? computeProfileCompleteness(agent) : 0;

  const stats = [
    { label: 'Active Listings', value: String(listingCounts.active), icon: Home, change: 'Brokerage' },
    { label: 'Sold', value: String(listingCounts.sold), icon: CheckCircle, change: 'All time' },
    { label: 'Pending', value: String(listingCounts.pending), icon: MessageSquare, change: 'Current' },
    { label: 'Profile Score', value: `${profileScore}%`, icon: User, change: profileScore >= 80 ? 'Good' : 'Needs work' },
  ];

  const missingFields: string[] = [];
  if (agent) {
    if (!agent.bio_full) missingFields.push('full biography');
    if (!agent.headshot_url) missingFields.push('headshot photo');
    if (!agent.position_statement) missingFields.push('position statement');
  }

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">
          Welcome back, {agent?.first_name ?? session.user.name?.split(' ')[0] ?? 'Agent'}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Here&apos;s an overview of your Red Cedar profile and activity.
        </p>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <FadeIn key={stat.label}>
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-cedar" />
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-2xl font-semibold text-charcoal mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Quick actions */}
      <FadeIn delay={0.1}>
        <h2 className="text-sm font-medium text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-border hover:border-cedar/30 hover:shadow-sm transition-all"
            >
              <action.icon className="h-4 w-4 text-cedar" />
              <span className="text-sm text-charcoal">{action.label}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
            </Link>
          ))}
        </div>
      </FadeIn>

      {/* Profile completeness */}
      {profileScore < 100 && missingFields.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-charcoal mb-1">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your profile is {profileScore}% complete. Add your {missingFields.join(', ')} to improve it.
                </p>
                <div className="w-full bg-sand rounded-full h-2 mb-3">
                  <div className="bg-cedar rounded-full h-2" style={{ width: `${profileScore}%` }} />
                </div>
                <Link
                  href="/dashboard/profile"
                  className="text-sm text-cedar font-medium hover:underline"
                >
                  Complete Profile
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
