'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Users, Shield, ShieldCheck, MoreHorizontal,
  Search, Plus, Mail,
} from 'lucide-react';

const placeholderUsers = [
  { name: 'Sarah Mitchell', email: 'sarah@redcedar.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
  { name: 'James Park', email: 'james@redcedar.com', role: 'Agent', status: 'Active', lastLogin: '1 day ago' },
  { name: 'Lisa Chen', email: 'lisa@redcedar.com', role: 'Agent', status: 'Active', lastLogin: '3 days ago' },
  { name: 'Robert Adams', email: 'robert@redcedar.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
  { name: 'Maria Gonzalez', email: 'maria@redcedar.com', role: 'Agent', status: 'Inactive', lastLogin: '2 weeks ago' },
];

const roleBadge: Record<string, string> = {
  Admin: 'bg-cedar/10 text-cedar',
  Agent: 'bg-blue-50 text-blue-700',
  Editor: 'bg-amber-50 text-amber-700',
};

export default function UsersPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage admin, editor, and agent accounts.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          {/* Search / Filter bar */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
              />
            </div>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Agent</option>
              <option>Editor</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {placeholderUsers.map((user) => (
                <tr key={user.email} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center">
                        <Users className="h-4 w-4 text-cedar" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">{user.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[user.role] || ''}`}>
                      {user.role === 'Admin' ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm text-charcoal">{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 rounded hover:bg-sand-light transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}
