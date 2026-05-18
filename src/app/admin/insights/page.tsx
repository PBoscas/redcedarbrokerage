'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Newspaper, Search, Plus, MoreHorizontal,
  Clock, Eye, Tag,
} from 'lucide-react';

const placeholderArticles = [
  { title: 'Spring 2026 Howard County Market Update', category: 'Market Update', status: 'Published', date: 'Mar 5, 2026', views: 1243, author: 'Peter Boscas' },
  { title: '5 Tips for First-Time Homebuyers in Maryland', category: 'Buyer Tips', status: 'Published', date: 'Feb 28, 2026', views: 892, author: 'Joe Bird' },
  { title: 'Why Columbia Remains a Top Community', category: 'Neighborhoods', status: 'Published', date: 'Feb 20, 2026', views: 1056, author: 'Stephanie Ridgely' },
  { title: 'Understanding Home Inspections: A Complete Guide', category: 'Education', status: 'Draft', date: 'Mar 8, 2026', views: 0, author: 'Brian Pakulla' },
  { title: 'Staging Your Home to Sell: Before & After', category: 'Seller Tips', status: 'Published', date: 'Feb 14, 2026', views: 2104, author: 'Leah Mason' },
  { title: 'Interest Rate Forecast: What Buyers Need to Know', category: 'Market Update', status: 'Scheduled', date: 'Mar 15, 2026', views: 0, author: 'Sarah Mitchell' },
];

const statusBadge: Record<string, string> = {
  Published: 'bg-green-50 text-green-700',
  Draft: 'bg-gray-100 text-gray-600',
  Scheduled: 'bg-blue-50 text-blue-700',
};

export default function InsightsPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Insights &amp; Articles</h1>
            <p className="text-sm text-muted-foreground">
              Manage blog posts, market updates, and educational content.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Plus className="h-4 w-4" />
            New Article
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
              />
            </div>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Categories</option>
              <option>Market Update</option>
              <option>Buyer Tips</option>
              <option>Seller Tips</option>
              <option>Neighborhoods</option>
              <option>Education</option>
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Article</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Views</th>
                <th className="px-4 py-3 sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {placeholderArticles.map((article) => (
                <tr key={article.title} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                        <Newspaper className="h-4 w-4 text-cedar" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">{article.title}</p>
                        <p className="text-xs text-muted-foreground">by {article.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {article.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[article.status] || ''}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.date}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {article.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 rounded hover:bg-sand-light transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}
