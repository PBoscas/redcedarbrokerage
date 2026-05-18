import { sql } from '@/lib/db';
import { FadeIn } from '@/components/ui/motion';
import { Newspaper, Clock, Tag } from 'lucide-react';

const statusBadge: Record<string, string> = {
  true: 'bg-green-50 text-green-700',
  false: 'bg-gray-100 text-gray-600',
};

function formatDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function InsightsPage() {
  const articles = await sql`
    SELECT i.id, i.slug, i.title, i.excerpt, i.published, i.published_at, i.created_at,
           ic.name as category_name,
           a.first_name || ' ' || a.last_name as author_name
    FROM insights i
    LEFT JOIN insight_categories ic ON ic.id = i.category_id
    LEFT JOIN agents a ON a.id = i.author_id
    ORDER BY i.created_at DESC
    LIMIT 50
  `;

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
        </div>
      </FadeIn>

      {articles.length === 0 ? (
        <FadeIn delay={0.05}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-sand-light flex items-center justify-center mb-4">
              <Newspaper className="h-8 w-8 text-cedar/40" />
            </div>
            <h2 className="text-lg font-medium text-charcoal mb-1">No articles yet.</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Insights and articles will appear here once created.
            </p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.05}>
          <div className="bg-white rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Article</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                          <Newspaper className="h-4 w-4 text-cedar" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{article.title}</p>
                          {article.author_name && (
                            <p className="text-xs text-muted-foreground">by {article.author_name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {article.category_name && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Tag className="h-3 w-3" /> {article.category_name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[String(article.published)] || 'bg-gray-100 text-gray-600'}`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDate(article.published_at || article.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
