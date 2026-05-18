import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from '@/lib/auth/session';
import { getAgentByUserId } from '@/lib/queries/agents';
import { FadeIn } from '@/components/ui/motion';

export default async function MediaPage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const agent = await getAgentByUserId(session.user.id);

  return (
    <div className="max-w-3xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">My Media</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your photos and media assets.
        </p>
      </FadeIn>

      {agent?.headshot_url && (
        <div className="mb-8">
          <p className="text-sm font-medium text-charcoal mb-3">Current Headshot</p>
          <div className="relative h-40 w-40 rounded-lg overflow-hidden border border-border bg-white">
            <Image
              src={agent.headshot_url}
              alt={`${agent.first_name} ${agent.last_name}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border bg-white p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Media management features are coming soon. To update your headshot, visit your{' '}
          <Link href="/dashboard/profile" className="text-cedar hover:underline font-medium">
            Profile page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
