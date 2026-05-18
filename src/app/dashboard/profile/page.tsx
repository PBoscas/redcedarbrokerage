'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/ui/motion';
import { Save, Upload, Plus, X } from 'lucide-react';

export default function ProfilePage() {
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
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue="Sarah" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue="Mitchell" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Title</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue="Principal Agent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Short Bio <span className="text-muted-foreground font-normal">(max 200 characters)</span>
              </label>
              <textarea rows={3} maxLength={200} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" defaultValue="Specializing in residential properties across Columbia, Ellicott City, and Howard County with over 15 years of experience." />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Position Statement</label>
              <textarea rows={2} maxLength={300} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" placeholder="A brief statement about your approach or philosophy..." />
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Full Biography <span className="text-muted-foreground font-normal">(max 3000 characters)</span>
            </label>
            <textarea rows={12} maxLength={3000} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" placeholder="Write your full professional biography..." />
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
                {['Residential', 'Buyer Representation', 'Listing Agent'].map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs bg-cedar/5 text-cedar px-3 py-1.5 rounded-full">
                    {s}
                    <button className="hover:text-destructive" aria-label={`Remove ${s}`}><X className="h-3 w-3" /></button>
                  </span>
                ))}
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
                {['Howard County', 'Columbia', 'Ellicott City', 'Carroll County'].map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 text-xs bg-cedar/5 text-cedar px-3 py-1.5 rounded-full">
                    {a}
                    <button className="hover:text-destructive" aria-label={`Remove ${a}`}><X className="h-3 w-3" /></button>
                  </span>
                ))}
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
              <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue="agent@redcedarre.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
              <input type="tel" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" defaultValue="(202) 555-0123" />
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
              <div className="flex items-center gap-3 p-3 bg-sand-light rounded">
                <div className="flex-1">
                  <p className="text-sm text-charcoal">Five Star Professional</p>
                  <p className="text-xs text-muted-foreground">2023–2024</p>
                </div>
                <button className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 text-sm text-cedar font-medium hover:underline">
              <Plus className="h-4 w-4" /> Add Award
            </button>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Upload your headshot and additional photos.</p>
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
