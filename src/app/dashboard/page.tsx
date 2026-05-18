'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  BarChart3, Eye, Home, MessageSquare,
  User, ArrowRight, CheckCircle, AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Profile Views', value: '1,247', icon: Eye, change: '+12%' },
  { label: 'Property Views', value: '3,891', icon: Home, change: '+8%' },
  { label: 'Inquiries', value: '23', icon: MessageSquare, change: '+3' },
  { label: 'Profile Score', value: '85%', icon: CheckCircle, change: 'Good' },
];

const quickActions = [
  { label: 'Edit My Profile', href: '/dashboard/profile', icon: User },
  { label: 'Manage Properties', href: '/dashboard/properties', icon: Home },
  { label: 'View Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
  { label: 'View Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">Welcome back</h1>
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
      <FadeIn delay={0.2}>
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-charcoal mb-1">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your profile is 85% complete. Add a biography and upload your headshot to reach 100%.
              </p>
              <div className="w-full bg-sand rounded-full h-2 mb-3">
                <div className="bg-cedar rounded-full h-2" style={{ width: '85%' }} />
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
    </div>
  );
}
