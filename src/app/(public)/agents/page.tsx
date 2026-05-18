import type { Metadata } from 'next';
import { AgentsArchive } from '@/components/sections/agents-archive';
import { getPublicAgents, getAgentSpecialties } from '@/lib/queries/agents';

export const metadata: Metadata = {
  title: 'Our Agents',
  description:
    'Meet the exceptional real estate professionals of Red Cedar Real Estate, serving buyers and sellers across Maryland.',
};

export default async function AgentsPage() {
  const rawAgents = await getPublicAgents();

  const agents = await Promise.all(
    rawAgents.map(async (a) => {
      const specialties = await getAgentSpecialties(a.id);
      return {
        slug: a.slug,
        first_name: a.first_name,
        last_name: a.last_name,
        title: a.title,
        bio_short: a.bio_short,
        headshot_url: a.headshot_url,
        specialties: specialties.map((s) => s.name),
      };
    })
  );

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-warm-white">
        <div className="container-wide">
          <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">
            Our Team
          </p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            Agents Who Set the <span className="text-cedar">Standard</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-body-lg">
            Our agents bring deep local expertise, premium service, and a
            technology-forward approach to every client relationship.
          </p>
        </div>
      </section>

      <AgentsArchive agents={agents} />
    </>
  );
}
