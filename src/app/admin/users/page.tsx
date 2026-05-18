import { FadeIn } from '@/components/ui/motion';
import { sql } from '@/lib/db';
import {
  Users, Shield, ShieldCheck, Mail,
} from 'lucide-react';

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  createdAt: string;
  banned: boolean | null;
  agent_title: string | null;
  agent_status: string | null;
}

async function getUsers(): Promise<UserRow[]> {
  try {
    const rows = await sql`
      SELECT u.id, u.name, u.email, u.role, u."createdAt", u.banned,
             a.title as agent_title, a.status as agent_status
      FROM neon_auth."user" u
      LEFT JOIN agents a ON a.user_id = u.id
      ORDER BY u.name
    `;
    return rows as unknown as UserRow[];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

const roleBadge: Record<string, string> = {
  admin: 'bg-cedar/10 text-cedar',
  user: 'bg-blue-50 text-blue-700',
};

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function getUserStatus(user: UserRow): { label: string; active: boolean } {
  if (user.banned) return { label: 'Banned', active: false };
  if (user.agent_status === 'active') return { label: 'Active Agent', active: true };
  if (user.agent_status) return { label: `Agent (${user.agent_status})`, active: false };
  return { label: 'Active', active: true };
}

export default async function UsersPage() {
  const users = await getUsers();

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
          <span className="text-xs text-muted-foreground italic">
            Users are created when agents sign up.
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const status = getUserStatus(user);
                  const role = user.role || 'user';
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center">
                            <Users className="h-4 w-4 text-cedar" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-charcoal">{user.name || '(no name)'}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[role] || 'bg-gray-50 text-gray-700'}`}>
                          {role === 'admin' ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                          {role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block h-2 w-2 rounded-full mr-2 ${status.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-sm text-charcoal">{status.label}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}
