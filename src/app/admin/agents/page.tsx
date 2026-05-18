import { FadeIn } from '@/components/ui/motion';
import {
  UserCheck, Phone, Mail, MapPin,
} from 'lucide-react';
import { getAllAgents } from '@/lib/queries/agents';
import Link from 'next/link';

export default async function AgentsPage() {
  const agents = await getAllAgents();

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Agent Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage agent profiles, bios, and listing assignments.
            </p>
          </div>
          <span className="text-sm text-muted-foreground">{agents.length} agents</span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, i) => (
          <FadeIn key={agent.id} delay={0.05 * (i + 1)}>
            <div className="bg-white rounded-lg border border-border p-5 hover:border-cedar/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sand-light flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-cedar" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {agent.first_name} {agent.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{agent.title}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                {agent.phone && (
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Phone className="h-3 w-3" /> {agent.phone}
                  </p>
                )}
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Mail className="h-3 w-3" /> {agent.email}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> Columbia, MD
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  agent.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : agent.status === 'draft'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-gray-50 text-gray-600'
                }`}>
                  {agent.status}
                </span>
                <div className="flex items-center gap-3">
                  {agent.license_number && (
                    <span className="text-xs text-muted-foreground">
                      License #{agent.license_number}
                    </span>
                  )}
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="text-xs text-cedar hover:text-cedar/80 font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
