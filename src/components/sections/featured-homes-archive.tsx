'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StaggerContainer, staggerChild } from '@/components/ui/motion';

const PLACEHOLDER_HOMES = [
  { slug: '8742-tamar-dr', title: '8742 Tamar Drive', location: 'Columbia, Maryland', price: '$625,000', beds: 5, baths: 3, sqft: '3,200', status: 'Active' },
  { slug: '3021-brightwood-ct', title: '3021 Brightwood Court', location: 'Ellicott City, Maryland', price: '$875,000', beds: 4, baths: 3, sqft: '3,600', status: 'Active' },
  { slug: '1455-river-hill-rd', title: '1455 River Hill Road', location: 'Clarksville, Maryland', price: '$1,250,000', beds: 6, baths: 4, sqft: '4,500', status: 'Under Contract' },
  { slug: '6190-hidden-stream', title: '6190 Hidden Stream Drive', location: 'Fulton, Maryland', price: '$715,000', beds: 4, baths: 3, sqft: '3,200', status: 'Active' },
  { slug: '5014-dorsey-hall', title: '5014 Dorsey Hall Drive', location: 'Elkridge, Maryland', price: '$475,000', beds: 4, baths: 2, sqft: '2,200', status: 'Coming Soon' },
  { slug: '9320-vollmerhausen', title: '9320 Vollmerhausen Road', location: 'Highland, Maryland', price: '$950,000', beds: 5, baths: 3, sqft: '3,800', status: 'Active' },
];

export function FeaturedHomesArchive() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_HOMES.map((home) => (
            <motion.div key={home.slug} variants={staggerChild}>
              <Link href={`/featured-homes/${home.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-sand rounded overflow-hidden mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-sand to-cedar/5 flex items-center justify-center">
                    <div className="w-16 h-12 border-2 border-cedar/20 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-cedar/0 group-hover:bg-cedar/5 transition-colors duration-500" />
                </div>
                <span className="inline-block text-[0.65rem] tracking-[0.2em] uppercase text-cedar bg-cedar/5 px-3 py-1 rounded-full mb-3">
                  {home.status}
                </span>
                <h2 className="text-editorial text-lg text-charcoal mb-1 group-hover:text-cedar transition-colors">
                  {home.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">{home.location}</p>
                <div className="flex items-center gap-4 text-sm text-charcoal">
                  <span className="font-semibold">{home.price}</span>
                  <span className="text-muted-foreground">
                    {home.beds} BD &middot; {home.baths} BA &middot; {home.sqft} SF
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
