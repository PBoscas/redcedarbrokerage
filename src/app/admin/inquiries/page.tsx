'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  MessageSquare, Search, MoreHorizontal,
  Clock, Mail, Phone, Home, UserPlus, Tag,
} from 'lucide-react';

const placeholderInquiries = [
  { name: 'Jennifer Kim', email: 'jennifer@email.com', phone: '(443) 555-0201', type: 'Buying', property: '3021 Brightwood Ct', message: 'Interested in scheduling a showing this weekend.', date: '2 hours ago', status: 'New', priority: 'High' },
  { name: 'David & Sarah Lee', email: 'dlee@email.com', phone: '(410) 555-0202', type: 'Selling', property: null, message: 'Looking to sell our home in Ellicott City. Want a market analysis.', date: '5 hours ago', status: 'New', priority: 'High' },
  { name: 'Marcus Johnson', email: 'marcus.j@email.com', phone: '(443) 555-0203', type: 'Recruiting', property: null, message: 'Interested in joining Red Cedar as an agent.', date: '1 day ago', status: 'In Progress', priority: 'Medium' },
  { name: 'Amy Chen', email: 'amy.chen@email.com', phone: '(410) 555-0204', type: 'Buying', property: '8742 Tamar Dr', message: 'Can you provide more details about this listing?', date: '2 days ago', status: 'Responded', priority: 'Low' },
  { name: 'Tom Richards', email: 'tom.r@email.com', phone: '(443) 555-0205', type: 'General', property: null, message: 'Question about your buyer representation services.', date: '3 days ago', status: 'Responded', priority: 'Low' },
  { name: 'Lisa Patel', email: 'lpatel@email.com', phone: '(410) 555-0206', type: 'Buying', property: '1455 River Hill Rd', message: 'Would love to schedule a private tour.', date: '4 days ago', status: 'Closed', priority: 'Medium' },
];

const statusBadge: Record<string, string> = {
  New: 'bg-cedar/10 text-cedar',
  'In Progress': 'bg-blue-50 text-blue-700',
  Responded: 'bg-green-50 text-green-700',
  Closed: 'bg-gray-100 text-gray-600',
};

const priorityDot: Record<string, string> = {
  High: 'bg-red-500',
  Medium: 'bg-amber-500',
  Low: 'bg-gray-300',
};

const typeIcon: Record<string, typeof Home> = {
  Buying: Home,
  Selling: Tag,
  Recruiting: UserPlus,
  General: MessageSquare,
};

export default function InquiriesPage() {
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-cedar/10 text-cedar rounded-full text-xs font-medium">
              2 new
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search inquiries..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
              />
            </div>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Statuses</option>
              <option>New</option>
              <option>In Progress</option>
              <option>Responded</option>
              <option>Closed</option>
            </select>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Types</option>
              <option>Buying</option>
              <option>Selling</option>
              <option>Recruiting</option>
              <option>General</option>
            </select>
          </div>

          <div className="divide-y divide-border">
            {placeholderInquiries.map((inquiry) => {
              const TypeIcon = typeIcon[inquiry.type] || MessageSquare;
              return (
                <div key={inquiry.email + inquiry.date} className="p-4 hover:bg-sand-light/30 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TypeIcon className="h-4 w-4 text-cedar" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${priorityDot[inquiry.priority]}`} />
                        <p className="text-sm font-medium text-charcoal">{inquiry.name}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge[inquiry.status] || ''}`}>
                          {inquiry.status}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sand-light text-muted-foreground font-medium">
                          {inquiry.type}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-1 mb-1.5">{inquiry.message}</p>

                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {inquiry.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {inquiry.phone}</span>
                        {inquiry.property && (
                          <span className="flex items-center gap-1"><Home className="h-3 w-3" /> {inquiry.property}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {inquiry.date}
                      </span>
                      <button className="p-1 rounded hover:bg-sand-light transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
