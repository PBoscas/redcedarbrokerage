'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FadeIn, ScaleReveal } from '@/components/ui/motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';

const storyImages = [
  'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/1.jpg',
  'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/2.jpg',
  'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/3.jpg',
  'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/4.jpg',
  'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/5.jpg',
];

const kitchenImages = [
  { src: 'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/Weaver-Before-small.jpg', alt: 'Kitchen before renovation' },
  { src: 'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/Framing-Stage-2-Small.jpg', alt: 'Kitchen framing stage' },
  { src: 'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/Kit-2-Small.jpg', alt: 'Kitchen renovation progress' },
  { src: 'https://b3448231.smushcdn.com/3448231/wp-content/uploads/2015/11/Kit-1-Small.jpg', alt: 'Kitchen after renovation' },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="container-wide">
          <Link href="/about" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cedar transition-colors mb-8">
            <ChevronLeft className="h-4 w-4" /> About Red Cedar
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">Our Story</p>
              <h1 className="text-display text-4xl md:text-5xl text-charcoal mb-6">
                The Story Behind <span className="text-cedar">the Name</span>
              </h1>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                A different kind of real estate company — one that focuses on clients&apos;
                needs and strives to make the real estate experience as fun, smooth, and
                rewarding as it can (and should) be.
              </p>
            </FadeIn>
            <ScaleReveal>
              <div className="aspect-[4/3] bg-sand rounded-lg overflow-hidden relative">
                <Image
                  src={storyImages[0]}
                  alt="The Red Cedar story — the house that started it all"
                  fill
                  className="object-cover"
                />
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <FadeIn>
            <div className="prose prose-lg text-muted-foreground max-w-none space-y-6">
              <p>
                When Peter created Red Cedar Real Estate, his goal was to build a different kind of
                real estate company — one that focuses on clients&apos; needs and strives to make the
                real estate experience as fun, smooth, and rewarding as it can (and should) be.
                Because he understood what it feels like to sit on the other side of a real estate
                transaction, he wanted to incorporate a meaningful part of his own first home-buying
                experience into the company&apos;s name and culture.
              </p>
              <p>
                The first time Peter and his wife visited the property that would eventually become
                their home, they drove right past it without even noticing. The house was so
                overgrown with trees and bushes that it could barely be seen from the street. When
                they finally spotted it, the only visible features were red cedar shingles and an
                unsightly green door. Despite its appearance, they immediately recognized its potential.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Story Photo Gallery */}
      <section className="py-4 bg-white">
        <div className="container-wide">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {storyImages.map((src, i) => (
                <div key={i} className="relative aspect-square rounded overflow-hidden bg-sand">
                  <Image
                    src={src}
                    alt={`Red Cedar story photo ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Renovation */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <FadeIn>
            <div className="prose prose-lg text-muted-foreground max-w-none space-y-6">
              <p>
                What followed was an extensive renovation of a dilapidated 1928 bungalow in the
                quaint Baltimore neighborhood of Beverly Hills. The property was transformed with
                modern upgrades, including tankless water heaters and home automation systems,
                turning a house that could barely be seen from the street into a place they were
                proud to call home.
              </p>
              <p>
                Although the original red cedar shingles have long since been removed or covered,
                the pride and enthusiasm Peter felt when he purchased and transformed that house
                into a home has stayed with him ever since. His mission is to help every client
                experience that same feeling. The red cedar shingles were the first thing he saw
                when discovering his home, and his vision is for Red Cedar Real Estate to be the
                first company people think of when they want to sell their home or pursue
                homeownership.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Kitchen */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-8">The Kitchen</h2>
              <div className="prose prose-lg text-muted-foreground max-w-none space-y-6">
                <p>
                  The original kitchen in the house was barely 10 feet wide and less than 5 feet
                  deep and was functionally useless with an odd &ldquo;L&rdquo; shape that made it almost
                  impossible to open cabinets. Based on the number of Raid cans and mouse traps it
                  was also very likely infested with critters.
                </p>
                <p>
                  Because lifestyles were so different in 1928 the kitchen was also completely
                  separated from the living and dining rooms and did not fit modern open-floorplan
                  concepts. Our goal was to gut the kitchen and open the space.
                </p>
                <p>
                  Unfortunately, there wasn&apos;t any other space on the main floor to integrate into
                  the kitchen so the only option was to expand outward. We removed the entire back
                  portion of the house on the first and second floors and constructed an addition
                  to add a larger kitchen, family room and half bath on the main floor and an
                  entire master bedroom suite on the second floor.
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 gap-3">
              {kitchenImages.map((img, i) => (
                <ScaleReveal key={i} delay={i * 0.1}>
                  <div className="relative aspect-square rounded overflow-hidden bg-sand">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScaleReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              Experience the Red Cedar Difference
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              The same pride and enthusiasm that built our name drives every client relationship today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/agents" className="inline-flex items-center justify-center px-8 py-4 text-cedar border border-cedar/30 font-medium text-sm rounded hover:bg-cedar/5 transition-colors">
                Meet Our Agents
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
