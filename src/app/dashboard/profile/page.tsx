import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAgentByUserId, getAgentSpecialties, getAgentServiceAreas, getAgentAwards } from '@/lib/queries/agents';
import ProfileForm from './profile-form';

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const agent = await getAgentByUserId(session.user.id);
  if (!agent) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-display text-2xl text-charcoal mb-1">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          No agent profile is linked to your account. Please contact your administrator.
        </p>
      </div>
    );
  }

  const [specialties, serviceAreas, awards] = await Promise.all([
    getAgentSpecialties(agent.id),
    getAgentServiceAreas(agent.id),
    getAgentAwards(agent.id),
  ]);

  return (
    <ProfileForm
      agent={agent}
      specialties={specialties}
      serviceAreas={serviceAreas}
      awards={awards}
    />
  );
}
