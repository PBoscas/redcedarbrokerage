'use client';

import Link from 'next/link';
import { FadeIn } from '@/components/ui/motion';
import { ChevronLeft, Clock, User } from 'lucide-react';

interface InsightArticleProps {
  slug: string;
}

export function InsightArticle({ slug }: InsightArticleProps) {
  const title = slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <>
      <div className="pt-24 bg-warm-white">
        <div className="container-narrow">
          <Link href="/insights" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cedar transition-colors">
            <ChevronLeft className="h-4 w-4" /> All Insights
          </Link>
        </div>
      </div>

      <article className="pt-8 pb-20 bg-warm-white">
        <div className="container-narrow">
          <FadeIn>
            <span className="text-xs tracking-[0.15em] uppercase text-cedar font-medium">Market Insights</span>
            <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-charcoal mt-3 mb-6">{title}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
              <span className="flex items-center gap-2"><User className="h-4 w-4" /> Red Cedar Team</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 6 min read</span>
              <span>March 2026</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose prose-lg text-muted-foreground max-w-none prose-headings:text-charcoal prose-headings:font-serif">
              <p>
                The DMV real estate market continues to evolve, shaped by shifting interest rates, inventory dynamics, and the unique character of the Washington DC metropolitan area. This article explores the key trends and considerations for buyers and sellers heading into the spring market.
              </p>
              <h2>Market Overview</h2>
              <p>
                As we enter spring 2026, the DMV market presents a nuanced picture. While inventory remains tight in many established neighborhoods, new construction and suburban communities are offering more options for buyers willing to explore beyond the traditional hotspots.
              </p>
              <h2>For Buyers</h2>
              <p>
                Buyers should enter the market with strong pre-approval, realistic expectations, and a clear understanding of their priorities. The most successful buyers work with agents who know the neighborhoods deeply and can identify opportunities before they hit the broader market.
              </p>
              <h2>For Sellers</h2>
              <p>
                Well-prepared, well-marketed homes continue to perform strongly. Sellers who invest in professional photography, strategic staging, and competitive pricing are seeing strong results, often with multiple offers within the first week.
              </p>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
