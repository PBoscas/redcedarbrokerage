'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/ui/motion';
import { Save, Upload, Plus, X } from 'lucide-react';
import type { AgentRow, AgentSpecialtyRow, AgentServiceAreaRow, AgentAwardRow } from '@/lib/queries/agents';

interface ProfileFormProps {
  agent: AgentRow;
  specialties: AgentSpecialtyRow[];
  serviceAreas: AgentServiceAreaRow[];
  awards: AgentAwardRow[];
}

export default function ProfileForm({ agent, specialties, serviceAreas, awards }: ProfileFormProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'bio', label: 'Biography' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'contact', label: 'Contact & Social' },
    { id: 'awards', label: 'Awards' },
    { id: 'media', label: 'Photos' },
  ];

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">My Profile</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your public agent profile on the Red Cedar website.
        </p>
      </FadeIn>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-cedar border-cedar font-medium'
                : 'text-muted-foreground border-transparent hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form content */}
      <div className="bg-white rounded-lg border border-border p-6">
        {activeTab === 'basic' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue={agent.first_name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue={agent.last_name} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Title</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue={agent.title} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Short Bio <span className="text-muted-foreground font-normal">(max 200 characters)</span>
              </label>
              <textarea rows={3} maxLength={200} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" defaultValue={agent.bio_short} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Position Statement</label>
              <textarea rows={2} maxLength={300} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" defaultValue={agent.position_statement ?? ''} placeholder="A brief statement about your approach or philosophy..." />
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Full Biography <span className="text-muted-foreground font-normal">(max 3000 characters)</span>
            </label>
            <textarea rows={12} maxLength={3000} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" defaultValue={agent.bio_full ?? ''} placeholder="Write your full professional biography..." />
            <p className="text-xs text-muted-foreground mt-2">
              This will appear on your public agent page. Write in third person for consistency.
            </p>
          </div>
        )}

        {activeTab === 'specialties' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">Specialties</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {specialties.length > 0 ? specialties.map((s) => (
                  <span key={s.id} className="inline-flex items-center gap-1 text-xs bg-cedar/5 text-cedar px-3 py-1.5 rounded-full">
                    {s.name}
                    <button className="hover:text-destructive" aria-label={`Remove ${s.name}`}><X className="h-3 w-3" /></button>
                  </span>
                )) : (
                  <p className="text-sm text-muted-foreground">No specialties added yet.</p>
                )}
              </div>
              <div className="flex gap-2">
                <input type="text" className="flex-1 px-4 py-2 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar" placeholder="Add a specialty" />
                <button className="px-3 py-2 bg-cedar text-white text-sm rounded hover:bg-cedar-dark transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">Service Areas</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {serviceAreas.length > 0 ? serviceAreas.map((a) => (
                  <span key={a.id} className="inline-flex items-center gap-1 text-xs bg-cedar/5 text-cedar px-3 py-1.5 rounded-full">
                    {a.name}
                    <button className="hover:text-destructive" aria-label={`Remove ${a.name}`}><X className="h-3 w-3" /></button>
                  </span>
                )) : (
                  <p className="text-sm text-muted-foreground">No service areas added yet.</p>
                )}
              </div>
              <div className="flex gap-2">
                <input type="text" className="flex-1 px-4 py-2 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar" placeholder="Add a service area" />
                <button className="px-3 py-2 bg-cedar text-white text-sm rounded hover:bg-cedar-dark transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue={agent.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
              <input type="tel" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue={agent.phone ?? ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Instagram URL</label>
              <input type="url" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">LinkedIn URL</label>
              <input type="url" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
        )}

        {activeTab === 'awards' && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Add awards, certifications, and recognitions.</p>
            <div className="space-y-3 mb-4">
              {awards.length > 0 ? awards.map((award) => (
                <div key={award.id} className="flex items-center gap-3 p-3 bg-sand-light rounded">
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">{award.title}</p>
                    {award.year && <p className="text-xs text-muted-foreground">{award.year}</p>}
                    {award.issuer && <p className="text-xs text-muted-foreground">{award.issuer}</p>}
                  </div>
                  <button className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No awards added yet.</p>
              )}
            </div>
            <button className="inline-flex items-center gap-2 text-sm text-cedar font-medium hover:underline">
              <Plus className="h-4 w-4" /> Add Award
            </button>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Upload your headshot and additional photos.</p>
            {agent.headshot_url && (
              <div className="mb-4">
                <p className="text-sm font-medium text-charcoal mb-2">Current Headshot</p>
                <img src={agent.headshot_url} alt={`${agent.first_name} ${agent.last_name}`} className="w-32 h-32 rounded object-cover" />
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div className="aspect-square bg-sand rounded flex items-center justify-center border-2 border-dashed border-border hover:border-cedar/30 cursor-pointer transition-colors">
                <div className="text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Upload Photo</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Max file size: 5MB. Accepted formats: JPG, PNG, WebP.
            </p>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-border">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
