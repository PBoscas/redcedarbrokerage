import { FadeIn } from '@/components/ui/motion';
import {
  UserCheck, Phone, Mail, MapPin,
  Search, Plus, MoreHorizontal,
} from 'lucide-react';
import { getAllAgents } from '@/lib/queries/agents';

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
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add Agent
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
            />
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
                <button className="p-1 rounded hover:bg-sand-light transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
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
                {agent.license_number && (
                  <span className="text-xs text-muted-foreground">
                    License #{agent.license_number}
                  </span>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
