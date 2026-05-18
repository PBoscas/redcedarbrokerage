import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAgentByUserId } from '@/lib/queries/agents';
import { sql } from '@/lib/db';
import { TestimonialsList } from './testimonials-list';

interface TestimonialRow {
  id: string;
  client_name: string;
  quote: string;
  client_title: string | null;
  featured: boolean;
}

async function getAgentTestimonials(agentId: string): Promise<TestimonialRow[]> {
  const rows = await sql`
    SELECT id, client_name, quote, client_title, featured
    FROM agent_testimonials
    WHERE agent_id = ${agentId}
    ORDER BY featured DESC, created_at DESC
  `;
  return rows as TestimonialRow[];
}

export default async function TestimonialsPage() {
  const session = await getServerSession();
  if (!session?.user) redirect('/login');

  const agent = await getAgentByUserId(session.user.id);
  const testimonials = agent ? await getAgentTestimonials(agent.id) : [];

  return (
    <div className="max-w-4xl">
      <TestimonialsList testimonials={testimonials} />
    </div>
  );
}
