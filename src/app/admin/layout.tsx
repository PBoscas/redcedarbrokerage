import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { AdminLayoutShell } from './admin-layout-shell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as { name?: string; email?: string; role?: string };
  const userRole = user.role;
  if (userRole !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <AdminLayoutShell
      userName={user.name || user.email || 'Admin'}
      userRole={userRole || 'admin'}
    >
      {children}
    </AdminLayoutShell>
  );
}
