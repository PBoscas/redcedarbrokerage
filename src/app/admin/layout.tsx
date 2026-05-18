'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/logo';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth/client';
import {
  LayoutDashboard, Users, Shield, UserCheck, Home, FileText,
  Map, Newspaper, Image, MessageSquare, Award, BarChart3,
  Settings, LogOut, ExternalLink, Menu, X, Globe,
} from 'lucide-react';
import { useState } from 'react';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Agents', href: '/admin/agents', icon: UserCheck },
  { label: 'Properties', href: '/admin/properties', icon: Home },
  { label: 'Homepage', href: '/admin/homepage', icon: Globe },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Insights', href: '/admin/insights', icon: Newspaper },
  { label: 'Neighborhoods', href: '/admin/neighborhoods', icon: Map },
  { label: 'Media Library', href: '/admin/media', icon: Image },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-sand-light flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-charcoal text-white transform transition-transform lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Logo variant="full" light />
            <button className="lg:hidden p-1 text-white/60" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-3 py-2">
            <span className="px-3 text-[0.65rem] tracking-[0.2em] uppercase text-white/30 font-medium">
              Admin Panel
            </span>
          </div>

          <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto" aria-label="Admin navigation">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors',
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white rounded transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Back to Site
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white rounded transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-border flex items-center px-6 gap-4">
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-xs bg-cedar/10 text-cedar px-2 py-1 rounded font-medium">Super Admin</span>
            <div className="w-8 h-8 rounded-full bg-cedar/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-cedar" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
