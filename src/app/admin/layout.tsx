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

  const userRole = (session.user as { role?: string }).role;
  if (userRole !== 'admin') {
    redirect('/dashboard');
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
