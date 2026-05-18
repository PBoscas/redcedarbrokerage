'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Settings, Globe, Palette, Mail,
  Shield, Database, Bell, Code,
  ExternalLink, Save,
} from 'lucide-react';

const settingsSections = [
  {
    id: 'general',
    title: 'General',
    icon: Globe,
    description: 'Site name, tagline, and basic information',
    fields: [
      { label: 'Site Name', value: 'Red Cedar Real Estate', type: 'text' },
      { label: 'Tagline', value: 'Giving local home buyers and sellers an unfair advantage over the competition!', type: 'text' },
      { label: 'Contact Email', value: 'peter@redcedarre.com', type: 'email' },
      { label: 'Phone Number', value: '(443) 708-2887', type: 'tel' },
      { label: 'Office Address', value: '6325 Woodside Court, Suite 105, Columbia, MD 21046', type: 'text' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding',
    icon: Palette,
    description: 'Logo, colors, and visual identity',
    fields: [
      { label: 'Primary Color (Cedar)', value: '#8B4513', type: 'text' },
      { label: 'Accent Color', value: '#2C1810', type: 'text' },
      { label: 'Font Family', value: 'Inter / Playfair Display', type: 'text' },
    ],
  },
  {
    id: 'email',
    title: 'Email & Notifications',
    icon: Mail,
    description: 'Email templates, SMTP settings, and notification preferences',
    fields: [
      { label: 'SMTP Host', value: 'smtp.example.com', type: 'text' },
      { label: 'From Email', value: 'noreply@redcedarre.com', type: 'email' },
      { label: 'Admin Notification Email', value: 'peter@redcedarre.com', type: 'email' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Meta',
    icon: Code,
    description: 'Default meta tags, Open Graph settings, and structured data',
    fields: [
      { label: 'Default Meta Title', value: 'Red Cedar Real Estate | Central Maryland Real Estate', type: 'text' },
      { label: 'Default Meta Description', value: 'The highest rated real estate brokerage in central Maryland.', type: 'text' },
      { label: 'Google Analytics ID', value: 'G-XXXXXXXXXX', type: 'text' },
    ],
  },
];

const quickToggles = [
  { label: 'Maintenance Mode', description: 'Show a maintenance page to visitors', enabled: false, icon: Shield },
  { label: 'Email Notifications', description: 'Send email alerts for new inquiries', enabled: true, icon: Bell },
  { label: 'Auto-publish Listings', description: 'Automatically publish new property listings', enabled: false, icon: Database },
  { label: 'External IDX Feed', description: 'Sync property data from MLS/IDX provider', enabled: true, icon: ExternalLink },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Site Settings</h1>
            <p className="text-sm text-muted-foreground">
              Configure global settings for the Red Cedar website.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </FadeIn>

      {/* Quick toggles */}
      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
            <Settings className="h-4 w-4 text-cedar" /> Quick Toggles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickToggles.map((toggle) => (
              <div key={toggle.label} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <toggle.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{toggle.label}</p>
                  <p className="text-[11px] text-muted-foreground">{toggle.description}</p>
                </div>
                <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${toggle.enabled ? 'bg-cedar justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Settings sections */}
      <div className="space-y-6">
        {settingsSections.map((section, i) => (
          <FadeIn key={section.id} delay={0.05 * (i + 2)}>
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-1">
                <section.icon className="h-4 w-4 text-cedar" />
                <h2 className="text-sm font-medium text-charcoal">{section.title}</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{section.description}</p>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-sand-light/30 text-charcoal focus:outline-none focus:ring-1 focus:ring-cedar/30 focus:border-cedar/30"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
