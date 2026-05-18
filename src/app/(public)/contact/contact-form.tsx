'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/motion';
import { BRAND } from '@/lib/constants/brand';
import {
  Home, TrendingUp, Plane, Users, HelpCircle,
  ArrowRight, ArrowLeft, MapPin, Phone, Mail, Check, UserCircle, ChevronDown,
} from 'lucide-react';

type InquiryType = 'buying' | 'selling' | 'relocating' | 'agent' | 'general' | null;

interface AgentOption {
  slug: string;
  name: string;
  title: string;
  headshot_url: string | null;
  phone: string | null;
  email: string;
}

interface ContactFormProps {
  agents: AgentOption[];
  preselectedAgentSlug: string | null;
}

const inquiryOptions = [
  { type: 'buying' as const, icon: Home, label: "I'm Buying", description: 'Looking to purchase a home in Maryland.' },
  { type: 'selling' as const, icon: TrendingUp, label: "I'm Selling", description: 'Considering listing my home.' },
  { type: 'relocating' as const, icon: Plane, label: "I'm Relocating", description: 'Moving to central Maryland.' },
  { type: 'agent' as const, icon: Users, label: 'Speak With an Agent', description: 'Connect with a specific agent.' },
  { type: 'general' as const, icon: HelpCircle, label: 'Something Else', description: 'General questions or other inquiries.' },
];

export function ContactForm({ agents, preselectedAgentSlug }: ContactFormProps) {
  const preselectedAgent = preselectedAgentSlug
    ? agents.find((a) => a.slug === preselectedAgentSlug) ?? null
    : null;

  const [selectedType, setSelectedType] = useState<InquiryType>(
    preselectedAgent ? 'agent' : null
  );
  const [selectedAgentSlug, setSelectedAgentSlug] = useState<string>(
    preselectedAgentSlug ?? ''
  );
  const [submitted, setSubmitted] = useState(false);

  const selectedAgent = agents.find((a) => a.slug === selectedAgentSlug) ?? null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-20 bg-warm-white min-h-[70vh] flex items-center">
        <div className="container-narrow text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-full bg-cedar/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-cedar" />
            </div>
            <h1 className="text-display text-3xl md:text-4xl text-charcoal mb-4">
              Thank You
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              {selectedAgent
                ? `We've forwarded your inquiry to ${selectedAgent.name}. They'll be in touch shortly.`
                : "We've received your inquiry and will be in touch shortly. A member of our team typically responds within one business day."
              }
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-warm-white">
        <div className="container-wide">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-cedar mb-4 font-medium">Contact</p>
            <h1 className="text-display text-4xl md:text-5xl text-charcoal mb-6">
              {preselectedAgent
                ? <>Contact <span className="text-cedar">{preselectedAgent.name}</span></>
                : <>Let&apos;s Start a <span className="text-cedar">Conversation</span></>
              }
            </h1>
            <p className="text-muted-foreground max-w-xl text-body-lg">
              {preselectedAgent
                ? `Send a message directly to ${preselectedAgent.name} and they'll get back to you promptly.`
                : "Tell us how we can help, and we'll connect you with the right person on our team."
              }
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
            {/* Left — form */}
            <div>
              <AnimatePresence mode="wait">
                {!selectedType ? (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-editorial text-xl text-charcoal mb-6">
                      How can we help?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {inquiryOptions.map((option) => (
                        <button
                          key={option.type}
                          onClick={() => setSelectedType(option.type)}
                          className="group flex items-start gap-4 p-5 bg-white rounded border border-border hover:border-cedar/30 hover:shadow-sm transition-all text-left"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded bg-cedar/5 flex items-center justify-center group-hover:bg-cedar/10 transition-colors">
                            <option.icon className="h-5 w-5 text-cedar" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-charcoal">{option.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!preselectedAgent && (
                      <button
                        onClick={() => { setSelectedType(null); setSelectedAgentSlug(''); }}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cedar transition-colors mb-6"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    )}

                    <h2 className="text-editorial text-xl text-charcoal mb-6">
                      {preselectedAgent
                        ? `Message for ${preselectedAgent.name}`
                        : inquiryOptions.find((o) => o.type === selectedType)?.label
                      }
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
                            Email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors"
                          placeholder="(443) 555-0100"
                        />
                      </div>

                      {/* Agent selector — always shown */}
                      <AgentSelector
                        agents={agents}
                        value={selectedAgentSlug}
                        onChange={setSelectedAgentSlug}
                        required={selectedType === 'agent'}
                        label={
                          selectedType === 'agent'
                            ? 'Which agent would you like to speak with? *'
                            : "Is there a specific agent you'd like to work with?"
                        }
                        placeholder={
                          selectedType === 'agent'
                            ? 'Select an agent...'
                            : 'No preference — connect me with anyone'
                        }
                      />

                      {(selectedType === 'buying' || selectedType === 'relocating') && (
                        <div>
                          <label htmlFor="areas" className="block text-sm font-medium text-charcoal mb-1.5">
                            Areas of Interest
                          </label>
                          <input
                            id="areas"
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors"
                            placeholder="e.g. Columbia, Ellicott City, Clarksville"
                          />
                        </div>
                      )}

                      {selectedType === 'selling' && (
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-charcoal mb-1.5">
                            Property Address
                          </label>
                          <input
                            id="address"
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors"
                            placeholder="Your property address"
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 transition-colors resize-none"
                          placeholder="Tell us more about what you're looking for..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors"
                      >
                        {selectedAgent ? `Send to ${selectedAgent.name}` : 'Send Inquiry'}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — info */}
            <div className="lg:pt-2 space-y-6">
              {/* Selected agent card */}
              {selectedAgent && (
                <FadeIn>
                  <div className="bg-white rounded-lg p-6 border border-cedar/20 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      {selectedAgent.headshot_url ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={selectedAgent.headshot_url}
                            alt={selectedAgent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-cedar/10 flex items-center justify-center flex-shrink-0">
                          <UserCircle className="h-7 w-7 text-cedar" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-charcoal">{selectedAgent.name}</p>
                        <p className="text-xs text-cedar">{selectedAgent.title}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {selectedAgent.phone && (
                        <a href={`tel:${selectedAgent.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cedar transition-colors">
                          <Phone className="h-3.5 w-3.5" /> {selectedAgent.phone}
                        </a>
                      )}
                      <a href={`mailto:${selectedAgent.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cedar transition-colors">
                        <Mail className="h-3.5 w-3.5" /> {selectedAgent.email}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Office info */}
              <div className="bg-white rounded-lg p-8 border border-border">
                <h3 className="text-editorial text-lg text-charcoal mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-cedar mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-charcoal">{BRAND.office.address}</p>
                      <p className="text-sm text-charcoal">
                        {BRAND.office.city}, {BRAND.office.state} {BRAND.office.zip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-cedar flex-shrink-0" />
                    <a href={`tel:${BRAND.office.phone}`} className="text-sm text-charcoal hover:text-cedar transition-colors">
                      {BRAND.office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cedar flex-shrink-0" />
                    <a href={`mailto:${BRAND.office.email}`} className="text-sm text-charcoal hover:text-cedar transition-colors">
                      {BRAND.office.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Agent selector with avatars ── */

interface AgentSelectorProps {
  agents: AgentOption[];
  value: string;
  onChange: (slug: string) => void;
  required?: boolean;
  label: string;
  placeholder: string;
}

function AgentSelector({ agents, value, onChange, required, label, placeholder }: AgentSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = agents.find((a) => a.slug === value) ?? null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-charcoal mb-1.5">{label}</label>

      {/* Hidden native input for form validation */}
      {required && (
        <input
          tabIndex={-1}
          className="absolute opacity-0 h-0 w-0"
          value={value}
          required
          onChange={() => {}}
          aria-hidden
        />
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3 bg-white border rounded text-sm text-left transition-colors ${
          open ? 'border-cedar ring-1 ring-cedar/20' : 'border-border'
        }`}
      >
        {selected ? (
          <>
            <AgentAvatar agent={selected} size={28} />
            <span className="flex-1 text-charcoal">{selected.name} <span className="text-muted-foreground">— {selected.title}</span></span>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="flex-1 text-muted-foreground">{placeholder}</span>
          </>
        )}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-20 left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg max-h-72 overflow-y-auto"
          >
            {/* No preference option */}
            <button
              type="button"
              onClick={() => { onChange(''); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-sand-light transition-colors ${
                !value ? 'bg-cedar/5 text-cedar' : 'text-muted-foreground'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-sand-light flex items-center justify-center flex-shrink-0">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span>{placeholder}</span>
            </button>

            {agents.map((a) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => { onChange(a.slug); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-sand-light transition-colors ${
                  value === a.slug ? 'bg-cedar/5' : ''
                }`}
              >
                <AgentAvatar agent={a} size={28} />
                <div className="flex-1 min-w-0">
                  <span className={`${value === a.slug ? 'text-cedar font-medium' : 'text-charcoal'}`}>
                    {a.name}
                  </span>
                  <span className="text-muted-foreground ml-1.5">— {a.title}</span>
                </div>
                {value === a.slug && <Check className="h-4 w-4 text-cedar flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AgentAvatar({ agent, size }: { agent: AgentOption; size: number }) {
  if (agent.headshot_url) {
    return (
      <div
        className="rounded-full overflow-hidden flex-shrink-0 relative"
        style={{ width: size, height: size }}
      >
        <Image
          src={agent.headshot_url}
          alt={agent.name}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full bg-cedar/10 flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-cedar font-medium" style={{ fontSize: size * 0.38 }}>
        {agent.name.split(' ').map((n) => n[0]).join('')}
      </span>
    </div>
  );
}
