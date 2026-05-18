'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerChild } from '@/components/ui/motion';

const PLACEHOLDER_INSIGHTS = [
  { slug: 'dmv-spring-market-2026', title: 'DMV Spring Market Outlook 2026', category: 'Market Insights', excerpt: 'What buyers and sellers should expect as the spring market heats up across Washington DC, Maryland, and Virginia.', date: 'March 2026' },
  { slug: 'first-time-buyer-guide', title: 'The First-Time Buyer\'s Guide to the DMV', category: 'Buying Guide', excerpt: 'A comprehensive guide to navigating one of the country\'s most competitive housing markets as a first-time buyer.', date: 'February 2026' },
  { slug: 'staging-that-sells', title: 'Staging That Sells: Maximizing Your Home\'s Appeal', category: 'Selling Guide', excerpt: 'How strategic staging and preparation can meaningfully impact your home\'s sale price and time on market.', date: 'January 2026' },
  { slug: 'best-neighborhoods-families', title: 'Best DMV Neighborhoods for Families', category: 'DMV Lifestyle', excerpt: 'Top family-friendly communities across the DMV, with insights on schools, parks, and community character.', date: 'December 2025' },
];

export function InsightsArchive() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PLACEHOLDER_INSIGHTS.map((article) => (
            <motion.div key={article.slug} variants={staggerChild}>
              <Link href={`/insights/${article.slug}`} className="group block">
                <div className="relative aspect-[16/9] bg-sand rounded overflow-hidden mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-cedar/10 to-sand group-hover:from-cedar/15 transition-colors duration-500" />
                </div>
                <span className="text-xs tracking-[0.15em] uppercase text-cedar font-medium">{article.category}</span>
                <h2 className="text-editorial text-xl text-charcoal mt-2 mb-3 group-hover:text-cedar transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{article.excerpt}</p>
                <p className="text-xs text-muted-foreground">{article.date}</p>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
