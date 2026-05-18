'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Users, UserCheck, Home, MessageSquare, Eye,
  FileText, TrendingUp, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const overviewStats = [
  { label: 'Total Agents', value: '12', icon: UserCheck, href: '/admin/agents' },
  { label: 'Active Properties', value: '24', icon: Home, href: '/admin/properties' },
  { label: 'New Inquiries', value: '8', icon: MessageSquare, href: '/admin/inquiries' },
  { label: 'Page Views (30d)', value: '15,423', icon: Eye, href: '/admin/analytics' },
];

const recentInquiries = [
  { name: 'Jennifer K.', type: 'Buying', date: '2 hours ago' },
  { name: 'David & Sarah L.', type: 'Selling', date: '5 hours ago' },
  { name: 'Marcus J.', type: 'Recruiting', date: '1 day ago' },
];

export default function AdminOverviewPage() {
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
            <div className="space-y-3">
              {recentInquiries.map((inquiry, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm text-charcoal">{inquiry.name}</p>
                    <p className="text-xs text-muted-foreground">{inquiry.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{inquiry.date}</span>
                </div>
              ))}
            </div>
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
