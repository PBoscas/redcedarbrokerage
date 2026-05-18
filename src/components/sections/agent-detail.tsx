'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FadeIn, StaggerContainer, staggerChild, ScaleReveal } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Award, Star, Home,
  ArrowRight, Quote,
} from 'lucide-react';

interface AgentDetailData {
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  bio_short: string;
  bio_full: string | null;
  headshot_url: string | null;
  email: string;
  phone: string | null;
  license_number: string | null;
  license_state: string | null;
  specialties: string[];
  service_areas: string[];
  awards: { title: string; issuer: string | null }[];
}

interface AgentDetailContentProps {
  agent: AgentDetailData;
}

export function AgentDetailContent({ agent }: AgentDetailContentProps) {
  const fullName = `${agent.first_name} ${agent.last_name}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
            {/* Portrait */}
            <ScaleReveal>
              <div className="relative aspect-[3/4] bg-sand rounded overflow-hidden">
                {agent.headshot_url ? (
                  <Image
                    src={agent.headshot_url}
                    alt={fullName}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-sand to-sand-light flex items-end justify-center pb-8">
                    <div className="w-24 h-24 rounded-full bg-cedar/10" />
                  </div>
                )}
              </div>
            </ScaleReveal>

            {/* Info */}
            <div className="lg:pt-8">
              <FadeIn>
                <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-3 font-medium">
                  Red Cedar Real Estate
                </p>
                <h1 className="text-display text-4xl md:text-5xl text-charcoal mb-2">
                  {fullName}
                </h1>
                <p className="text-lg text-cedar mb-6">{agent.title}</p>
                <p className="text-muted-foreground leading-relaxed max-w-lg mb-8">
                  {agent.bio_short}
                </p>

                {/* Quick info */}
                <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                  {agent.license_state && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cedar" />
                      {agent.license_state}
                    </span>
                  )}
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-cedar transition-colors">
                      <Phone className="h-4 w-4 text-cedar" />
                      {agent.phone}
                    </a>
                  )}
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-cedar transition-colors">
                    <Mail className="h-4 w-4 text-cedar" />
                    {agent.email}
                  </a>
                </div>

                {/* Specialties + Service Areas */}
                {(agent.specialties.length > 0 || agent.service_areas.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {agent.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs text-cedar/70 bg-cedar/5 px-3 py-1.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                    {agent.service_areas.map((a) => (
                      <span
                        key={a}
                        className="text-xs text-charcoal/60 bg-sand px-3 py-1.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contact?agent=${agent.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors"
                  >
                    Contact {agent.first_name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone}`}
                      className="inline-flex items-center justify-center px-6 py-3 text-cedar border border-cedar/30 font-medium text-sm rounded hover:bg-cedar/5 transition-colors"
                    >
                      Call {agent.first_name}
                    </a>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      {agent.bio_full && (
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <FadeIn>
              <h2 className="text-display text-2xl md:text-3xl text-charcoal mb-8">
                About {agent.first_name}
              </h2>
              <div className="prose prose-lg text-muted-foreground max-w-none">
                {agent.bio_full.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Awards */}
      {agent.awards.length > 0 && (
        <section className="section-padding bg-sand-light">
          <div className="container-wide">
            <FadeIn className="text-center mb-12">
              <h2 className="text-display text-2xl md:text-3xl text-charcoal">
                Awards &amp; Recognition
              </h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agent.awards.map((award) => (
                <motion.div key={award.title} variants={staggerChild} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-cedar/5 mb-4">
                    <Award className="h-5 w-5 text-cedar" />
                  </div>
                  <h3 className="text-editorial text-lg text-charcoal mb-1">{award.title}</h3>
                  {award.issuer && (
                    <p className="text-sm text-muted-foreground">{award.issuer}</p>
                  )}
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Why Work With Me */}
      <section className="section-padding bg-sand-light">
        <div className="container-wide">
          <FadeIn className="text-center mb-12">
            <h2 className="text-display text-2xl md:text-3xl text-charcoal">
              Why Clients Choose {agent.first_name}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Proven Results',
                description: 'A track record of successful transactions and satisfied clients across Maryland.',
              },
              {
                icon: Home,
                title: 'Local Expertise',
                description: 'Deep knowledge of neighborhoods, market trends, and community dynamics.',
              },
              {
                icon: Award,
                title: 'Premium Service',
                description: 'Attentive, personalized service from first conversation through closing.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerChild} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-cedar/5 mb-4">
                  <item.icon className="h-5 w-5 text-cedar" />
                </div>
                <h3 className="text-editorial text-lg text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-cedar text-white">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-display text-2xl md:text-3xl text-white mb-4">
              Ready to Work with {agent.first_name}?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Whether buying, selling, or exploring your options, {agent.first_name} is
              here to help you navigate the Maryland market with confidence.
            </p>
            <Link
              href={`/contact?agent=${agent.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-cedar font-medium text-sm rounded hover:bg-white/90 transition-colors"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
