'use client';

import { useState, useRef } from 'react';
import { FadeIn } from '@/components/ui/motion';
import { Save, Upload, Plus, X, Loader2 } from 'lucide-react';
import type { AgentRow, AgentSpecialtyRow, AgentServiceAreaRow, AgentAwardRow } from '@/lib/queries/agents';

interface ProfileFormProps {
  agent: AgentRow;
  specialties: AgentSpecialtyRow[];
  serviceAreas: AgentServiceAreaRow[];
  awards: AgentAwardRow[];
}

export default function ProfileForm({ agent, specialties, serviceAreas, awards }: ProfileFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [firstName, setFirstName] = useState(agent.first_name);
  const [lastName, setLastName] = useState(agent.last_name);
  const [title, setTitle] = useState(agent.title);
  const [role, setRole] = useState(agent.role);
  const [bioShort, setBioShort] = useState(agent.bio_short);
  const [positionStatement, setPositionStatement] = useState(agent.position_statement ?? '');
  const [bioFull, setBioFull] = useState(agent.bio_full ?? '');
  const [email, setEmail] = useState(agent.email);
  const [phone, setPhone] = useState(agent.phone ?? '');
  const [headshotUrl, setHeadshotUrl] = useState(agent.headshot_url);

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'bio', label: 'Biography' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'contact', label: 'Contact & Social' },
    { id: 'awards', label: 'Awards' },
    { id: 'media', label: 'Photos' },
  ];

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          title,
          role,
          bio_short: bioShort,
          bio_full: bioFull || null,
          position_statement: positionStatement || null,
          email,
          phone: phone || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }

      setMessage({ type: 'success', text: 'Profile saved successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('agentId', agent.id);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      setHeadshotUrl(data.url);
      setMessage({ type: 'success', text: 'Photo uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setUploading(false);
      // Reset the file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <h1 className="text-display text-2xl text-charcoal mb-1">My Profile</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage your public agent profile on the Red Cedar website.
        </p>
      </FadeIn>

      {/* Status message */}
      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

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
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Title</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Display Role</label>
                <select className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={role} onChange={(e) => setRole(e.target.value as AgentRow['role'])}>
                  <option value="broker">Broker</option>
                  <option value="agent">Agent</option>
                  <option value="staff">Support Staff</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Short Bio <span className="text-muted-foreground font-normal">(max 200 characters)</span>
              </label>
              <textarea rows={3} maxLength={200} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" value={bioShort} onChange={(e) => setBioShort(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Position Statement</label>
              <textarea rows={2} maxLength={300} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" value={positionStatement} onChange={(e) => setPositionStatement(e.target.value)} placeholder="A brief statement about your approach or philosophy..." />
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Full Biography <span className="text-muted-foreground font-normal">(max 3000 characters)</span>
            </label>
            <textarea rows={12} maxLength={3000} className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20 resize-none" value={bioFull} onChange={(e) => setBioFull(e.target.value)} placeholder="Write your full professional biography..." />
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
              <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
              <input type="tel" className="w-full px-4 py-3 bg-white border border-border rounded text-sm focus:outline-none focus:border-cedar focus:ring-1 focus:ring-cedar/20" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
            {headshotUrl && (
              <div className="mb-4">
                <p className="text-sm font-medium text-charcoal mb-2">Current Headshot</p>
                <img src={headshotUrl} alt={`${firstName} ${lastName}`} className="w-32 h-32 rounded object-cover" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="aspect-square bg-sand rounded flex items-center justify-center border-2 border-dashed border-border hover:border-cedar/30 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-center">
                  {uploading ? (
                    <Loader2 className="h-6 w-6 text-muted-foreground mx-auto mb-2 animate-spin" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </p>
                </div>
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Max file size: 5MB. Accepted formats: JPG, PNG, WebP.
            </p>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-border">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cedar text-white font-medium text-sm rounded hover:bg-cedar-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
