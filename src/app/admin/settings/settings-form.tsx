'use client';

import { useState, useRef } from 'react';
import { FadeIn } from '@/components/ui/motion';
import {
  Settings, Globe, Palette, Mail,
  Shield, Database, Bell, Code,
  ExternalLink, Save, Loader2,
} from 'lucide-react';
import type { SettingsMap } from './page';

type IconComponent = typeof Globe;

interface Section {
  id: string;
  title: string;
  icon: IconComponent;
  description: string;
  fieldTypes: Record<string, string>;
}

const sections: Section[] = [
  {
    id: 'general',
    title: 'General',
    icon: Globe,
    description: 'Site name, tagline, and basic information',
    fieldTypes: {
      'Site Name': 'text',
      Tagline: 'text',
      'Contact Email': 'email',
      'Phone Number': 'tel',
      'Office Address': 'text',
    },
  },
  {
    id: 'branding',
    title: 'Branding',
    icon: Palette,
    description: 'Logo, colors, and visual identity',
    fieldTypes: {
      'Primary Color (Cedar)': 'text',
      'Accent Color': 'text',
      'Font Family': 'text',
    },
  },
  {
    id: 'email',
    title: 'Email & Notifications',
    icon: Mail,
    description: 'Email templates, SMTP settings, and notification preferences',
    fieldTypes: {
      'SMTP Host': 'text',
      'From Email': 'email',
      'Admin Notification Email': 'email',
    },
  },
  {
    id: 'seo',
    title: 'SEO & Meta',
    icon: Code,
    description: 'Default meta tags, Open Graph settings, and structured data',
    fieldTypes: {
      'Default Meta Title': 'text',
      'Default Meta Description': 'text',
      'Google Analytics ID': 'text',
    },
  },
];

interface ToggleInfo {
  label: string;
  description: string;
  icon: IconComponent;
}

const toggleDefs: ToggleInfo[] = [
  { label: 'Maintenance Mode', description: 'Show a maintenance page to visitors', icon: Shield },
  { label: 'Email Notifications', description: 'Send email alerts for new inquiries', icon: Bell },
  { label: 'Auto-publish Listings', description: 'Automatically publish new property listings', icon: Database },
  { label: 'External IDX Feed', description: 'Sync property data from MLS/IDX provider', icon: ExternalLink },
];

export default function SettingsForm({ initialSettings }: { initialSettings: SettingsMap }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    (initialSettings.toggles as Record<string, boolean>) || {}
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSave() {
    if (!formRef.current) return;
    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData(formRef.current);
      const payload: SettingsMap = {};

      // Collect section fields
      for (const section of sections) {
        const sectionData: Record<string, string> = {};
        for (const fieldLabel of Object.keys(section.fieldTypes)) {
          const key = `${section.id}__${fieldLabel}`;
          sectionData[fieldLabel] = (formData.get(key) as string) || '';
        }
        payload[section.id] = sectionData;
      }

      // Collect toggles
      payload.toggles = toggles;

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="max-w-4xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Site Settings</h1>
            <p className="text-sm text-muted-foreground">
              Configure global settings for the Red Cedar website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {message && (
              <span className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Quick toggles */}
      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-charcoal mb-4 flex items-center gap-2">
            <Settings className="h-4 w-4 text-cedar" /> Quick Toggles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toggleDefs.map((toggle) => {
              const enabled = toggles[toggle.label] ?? false;
              return (
                <div key={toggle.label} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <toggle.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal">{toggle.label}</p>
                    <p className="text-[11px] text-muted-foreground">{toggle.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToggles((prev) => ({ ...prev, [toggle.label]: !prev[toggle.label] }))}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${enabled ? 'bg-cedar justify-end' : 'bg-gray-300 justify-start'}`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Settings sections */}
      <div className="space-y-6">
        {sections.map((section, i) => {
          const sectionValues = (initialSettings[section.id] as Record<string, string>) || {};
          return (
            <FadeIn key={section.id} delay={0.05 * (i + 2)}>
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-1">
                  <section.icon className="h-4 w-4 text-cedar" />
                  <h2 className="text-sm font-medium text-charcoal">{section.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{section.description}</p>

                <div className="space-y-4">
                  {Object.entries(section.fieldTypes).map(([label, type]) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-charcoal mb-1.5">{label}</label>
                      <input
                        name={`${section.id}__${label}`}
                        type={type}
                        defaultValue={sectionValues[label] || ''}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-sand-light/30 text-charcoal focus:outline-none focus:ring-1 focus:ring-cedar/30 focus:border-cedar/30"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </form>
  );
}
