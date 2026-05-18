'use client';

import { FadeIn } from '@/components/ui/motion';
import { Eye, Home, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Profile Views', value: '1,247', icon: Eye, period: 'Last 30 days' },
  { label: 'Property Views', value: '3,891', icon: Home, period: 'Last 30 days' },
  { label: 'Inquiry Clicks', value: '23', icon: MessageSquare, period: 'Last 30 days' },
  { label: 'Engagement Rate', value: '3.2%', icon: TrendingUp, period: 'Last 30 days' },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground mb-8">Track your profile and property performance.</p>
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

      {/* Placeholder chart area */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-sm font-medium text-charcoal mb-4">Profile Views Over Time</h2>
          <div className="h-64 bg-sand-light rounded flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Chart visualization will appear here</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
