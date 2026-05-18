import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import {
  MessageSquare, Clock, Mail, Phone, Home, UserPlus, Tag, Briefcase, HelpCircle, Users,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface InquiryRow {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
  agent_name: string | null;
}

const statusBadge: Record<string, string> = {
  new: 'bg-cedar/10 text-cedar',
  read: 'bg-blue-50 text-blue-700',
  responded: 'bg-green-50 text-green-700',
  archived: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  read: 'Read',
  responded: 'Responded',
  archived: 'Archived',
};

const typeLabels: Record<string, string> = {
  buying: 'Buying',
  selling: 'Selling',
  relocating: 'Relocating',
  agent_inquiry: 'Agent Inquiry',
  general: 'General',
  recruiting: 'Recruiting',
};

const typeIcons: Record<string, typeof Home> = {
  buying: Home,
  selling: Tag,
  relocating: Briefcase,
  agent_inquiry: HelpCircle,
  general: MessageSquare,
  recruiting: Users,
};

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function InquiriesPage() {
  const rows = await sql`
    SELECT cs.id, cs.type, cs.name, cs.email, cs.phone, cs.message, cs.status, cs.created_at,
           a.first_name || ' ' || a.last_name as agent_name
    FROM contact_submissions cs
    LEFT JOIN agents a ON a.id = cs.agent_id
    ORDER BY cs.created_at DESC
    LIMIT 50
  ` as InquiryRow[];

  const newCount = rows.filter((r) => r.status === 'new').length;

  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Inquiries</h1>
            <p className="text-sm text-muted-foreground">
              Manage and respond to incoming client inquiries.
            </p>
          </div>
          {newCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-cedar/10 text-cedar rounded-full text-xs font-medium">
                {newCount} new
              </span>
            </div>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-charcoal mb-1">No inquiries yet</p>
              <p className="text-xs text-muted-foreground">
                Inquiries from the contact form will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {rows.map((inquiry) => {
                const TypeIcon = typeIcons[inquiry.type] || MessageSquare;
                return (
                  <div key={inquiry.id} className="p-4 hover:bg-sand-light/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <TypeIcon className="h-4 w-4 text-cedar" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-charcoal">{inquiry.name}</p>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge[inquiry.status] || 'bg-gray-100 text-gray-600'}`}>
                            {statusLabels[inquiry.status] || inquiry.status}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sand-light text-muted-foreground font-medium">
                            {typeLabels[inquiry.type] || inquiry.type}
                          </span>
                        </div>

                        {inquiry.message && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-1.5">{inquiry.message}</p>
                        )}

                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {inquiry.email}</span>
                          {inquiry.phone && (
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {inquiry.phone}</span>
                          )}
                          {inquiry.agent_name && (
                            <span className="flex items-center gap-1"><UserPlus className="h-3 w-3" /> {inquiry.agent_name}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {formatRelativeTime(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
