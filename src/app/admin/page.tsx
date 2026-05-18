import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import {
  Users, UserCheck, Home, MessageSquare, Eye,
  FileText, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

function timeAgo(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return then.toLocaleDateString();
}

export default async function AdminOverviewPage() {
  const [agentRows, listingRows, inquiryCountRows, recentInquiryRows] =
    await Promise.all([
      sql`SELECT COUNT(*) as count FROM agents WHERE status = 'active'`,
      sql`SELECT COUNT(*) as count FROM mls_listings WHERE status IN ('Active', 'Active Under Contract', 'Coming Soon')`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'new'`,
      sql`SELECT id, name, email, type, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5`,
    ]);

  const agentCount = agentRows[0]?.count ?? 0;
  const listingCount = listingRows[0]?.count ?? 0;
  const inquiryCount = inquiryCountRows[0]?.count ?? 0;
  const recentInquiries = recentInquiryRows as {
    id: string;
    name: string;
    email: string;
    type: string;
    created_at: string;
  }[];

  const overviewStats = [
    { label: 'Total Agents', value: String(agentCount), icon: UserCheck, href: '/admin/agents' },
    { label: 'Active Properties', value: String(listingCount), icon: Home, href: '/admin/properties' },
    { label: 'New Inquiries', value: String(inquiryCount), icon: MessageSquare, href: '/admin/inquiries' },
    { label: 'Page Views (30d)', value: '—', icon: Eye, href: '/admin/analytics' },
  ];

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">Admin Overview</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage Red Cedar Real Estate&apos;s website content and platform.
        </p>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewStats.map((stat) => (
          <FadeIn key={stat.label}>
            <Link href={stat.href} className="block bg-white rounded-lg border border-border p-5 hover:border-cedar/30 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-cedar" />
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-semibold text-charcoal mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent inquiries */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-charcoal">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs text-cedar hover:underline">View All</Link>
            </div>
            {recentInquiries.length > 0 ? (
              <div className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm text-charcoal">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.type}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{timeAgo(inquiry.created_at)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No inquiries yet</p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Quick actions */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-sm font-medium text-charcoal mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Edit Homepage', href: '/admin/homepage', icon: FileText },
                { label: 'Manage Agents', href: '/admin/agents', icon: UserCheck },
                { label: 'Manage Properties', href: '/admin/properties', icon: Home },
                { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
                { label: 'Manage Users', href: '/admin/users', icon: Users },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-sand-light transition-colors"
                >
                  <action.icon className="h-4 w-4 text-cedar" />
                  <span className="text-sm text-charcoal">{action.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
