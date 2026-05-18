'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  BarChart3, Eye, Users, MousePointerClick,
  TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, Globe, Smartphone, Monitor,
} from 'lucide-react';

const overviewStats = [
  { label: 'Page Views', value: '15,423', change: '+12.3%', up: true, icon: Eye },
  { label: 'Unique Visitors', value: '4,891', change: '+8.7%', up: true, icon: Users },
  { label: 'Avg. Session Duration', value: '3m 24s', change: '+5.1%', up: true, icon: Clock },
  { label: 'Bounce Rate', value: '42.3%', change: '-2.1%', up: false, icon: MousePointerClick },
];

const topPages = [
  { page: '/properties', views: 4210, percentage: 27 },
  { page: '/', views: 3856, percentage: 25 },
  { page: '/agents', views: 2104, percentage: 14 },
  { page: '/neighborhoods/east-grand-rapids', views: 1543, percentage: 10 },
  { page: '/insights', views: 1203, percentage: 8 },
  { page: '/contact', views: 987, percentage: 6 },
  { page: '/buyers', views: 876, percentage: 6 },
  { page: '/sellers', views: 644, percentage: 4 },
];

const trafficSources = [
  { source: 'Organic Search', visits: 6840, percentage: 44 },
  { source: 'Direct', visits: 3720, percentage: 24 },
  { source: 'Social Media', visits: 2325, percentage: 15 },
  { source: 'Referral', visits: 1550, percentage: 10 },
  { source: 'Email', visits: 988, percentage: 7 },
];

const deviceBreakdown = [
  { device: 'Desktop', icon: Monitor, percentage: 52 },
  { device: 'Mobile', icon: Smartphone, percentage: 40 },
  { device: 'Tablet', icon: Monitor, percentage: 8 },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Website performance and visitor insights for the last 30 days.
            </p>
          </div>
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </FadeIn>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewStats.map((stat) => (
          <FadeIn key={stat.label}>
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-cedar" />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-green-700' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-charcoal mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Chart placeholder */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-charcoal flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cedar" /> Traffic Overview
            </h2>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 rounded bg-cedar/10 text-cedar font-medium">Views</button>
              <button className="text-xs px-2 py-1 rounded text-muted-foreground hover:bg-sand-light transition-colors">Visitors</button>
            </div>
          </div>
          <div className="h-48 bg-sand-light/50 rounded flex items-center justify-center">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Chart visualization placeholder
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top pages */}
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-lg border border-border p-6 lg:col-span-1">
            <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-cedar" /> Top Pages
            </h2>
            <div className="space-y-3">
              {topPages.map((page) => (
                <div key={page.page} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-charcoal truncate">{page.page}</p>
                    <div className="mt-1 h-1.5 bg-sand-light rounded-full overflow-hidden">
                      <div className="h-full bg-cedar/30 rounded-full" style={{ width: `${page.percentage}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Traffic sources */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cedar" /> Traffic Sources
            </h2>
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-charcoal">{source.source}</p>
                      <p className="text-xs text-muted-foreground">{source.percentage}%</p>
                    </div>
                    <div className="h-1.5 bg-sand-light rounded-full overflow-hidden">
                      <div className="h-full bg-cedar/30 rounded-full" style={{ width: `${source.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Devices */}
        <FadeIn delay={0.25}>
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-cedar" /> Devices
            </h2>
            <div className="space-y-4">
              {deviceBreakdown.map((device) => (
                <div key={device.device} className="flex items-center gap-3">
                  <device.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-charcoal">{device.device}</p>
                      <p className="text-xs text-muted-foreground">{device.percentage}%</p>
                    </div>
                    <div className="h-1.5 bg-sand-light rounded-full overflow-hidden">
                      <div className="h-full bg-cedar/30 rounded-full" style={{ width: `${device.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
