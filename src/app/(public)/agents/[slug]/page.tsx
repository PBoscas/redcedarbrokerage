import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AgentDetailContent } from '@/components/sections/agent-detail';
import {
  getAgentBySlug,
  getAgentSpecialties,
  getAgentServiceAreas,
  getAgentAwards,
} from '@/lib/queries/agents';

interface AgentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AgentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent) {
    return { title: 'Agent Not Found' };
  }

  const fullName = `${agent.first_name} ${agent.last_name}`;

  return {
    title: `${fullName} | Red Cedar Real Estate`,
    description: agent.bio_short || `Learn more about ${fullName}, a trusted real estate professional at Red Cedar Real Estate.`,
  };
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const [specialties, serviceAreas, awards] = await Promise.all([
    getAgentSpecialties(agent.id),
    getAgentServiceAreas(agent.id),
    getAgentAwards(agent.id),
  ]);

  return (
    <AgentDetailContent
      agent={{
        slug: agent.slug,
        first_name: agent.first_name,
        last_name: agent.last_name,
        title: agent.title,
        bio_short: agent.bio_short,
        bio_full: agent.bio_full,
        headshot_url: agent.headshot_url,
        email: agent.email,
        phone: agent.phone,
        license_number: agent.license_number,
        license_state: agent.license_state,
        specialties: specialties.map((s) => s.name),
        service_areas: serviceAreas.map((a) => a.name),
        awards: awards.map((a) => ({ title: a.title, issuer: a.issuer })),
      }}
    />
  );
}
