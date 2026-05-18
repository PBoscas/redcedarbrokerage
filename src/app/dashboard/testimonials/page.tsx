import { FadeIn } from '@/components/ui/motion';
import { Plus, Star, Edit, Trash2, Quote } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/session';
import { getAgentByUserId } from '@/lib/queries/agents';
import { sql } from '@/lib/db';

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
      <div className="flex items-center justify-between mb-8">
        <FadeIn>
          <h1 className="text-display text-2xl text-charcoal mb-1">My Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage client testimonials on your profile.</p>
        </FadeIn>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <FadeIn>
          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <Quote className="h-8 w-8 text-cedar/20 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-charcoal mb-1">No testimonials yet</h3>
            <p className="text-sm text-muted-foreground">
              Add client testimonials to showcase on your public agent profile.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="h-4 w-4 text-cedar/30" />
                    {t.featured && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm font-medium text-charcoal">{t.client_name}</p>
                  {t.client_title && <p className="text-xs text-muted-foreground">{t.client_title}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-cedar transition-colors" aria-label="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
