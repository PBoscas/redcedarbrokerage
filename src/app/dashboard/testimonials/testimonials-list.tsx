'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Star, Edit, Trash2, Quote, X, Loader2 } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  quote: string;
  featured: boolean;
}

interface TestimonialFormData {
  client_name: string;
  client_title: string;
  quote: string;
  featured: boolean;
}

const emptyForm: TestimonialFormData = {
  client_name: '',
  client_title: '',
  quote: '',
  featured: false,
};

export function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openAdd() {
    setEditingId(null);
    setFormData(emptyForm);
    setError(null);
    setFormOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id);
    setFormData({
      client_name: t.client_name,
      client_title: t.client_title ?? '',
      quote: t.quote,
      featured: t.featured,
    });
    setError(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        client_name: formData.client_name.trim(),
        client_title: formData.client_title.trim() || null,
        quote: formData.quote.trim(),
        featured: formData.featured,
      };

      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      closeForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return;

    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Delete failed (${res.status})`);
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display text-2xl text-charcoal mb-1">My Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage client testimonials on your profile.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Inline form */}
      {formOpen && (
        <div className="mb-6 bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-charcoal">
              {editingId ? 'Edit Testimonial' : 'New Testimonial'}
            </h2>
            <button
              onClick={closeForm}
              className="p-1 text-muted-foreground hover:text-charcoal transition-colors"
              aria-label="Close form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-charcoal mb-1">
                  Client Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="client_name"
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full rounded border border-border bg-white px-3 py-2 text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cedar/30 focus:border-cedar"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="client_title" className="block text-sm font-medium text-charcoal mb-1">
                  Client Title
                </label>
                <input
                  id="client_title"
                  type="text"
                  value={formData.client_title}
                  onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                  className="w-full rounded border border-border bg-white px-3 py-2 text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cedar/30 focus:border-cedar"
                  placeholder="Homebuyer, First-time seller, etc."
                />
              </div>
            </div>
            <div>
              <label htmlFor="quote" className="block text-sm font-medium text-charcoal mb-1">
                Testimonial Quote <span className="text-destructive">*</span>
              </label>
              <textarea
                id="quote"
                required
                rows={3}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full rounded border border-border bg-white px-3 py-2 text-sm text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cedar/30 focus:border-cedar resize-vertical"
                placeholder="What the client said about your services..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded border-border text-cedar focus:ring-cedar/30"
              />
              <label htmlFor="featured" className="text-sm text-charcoal">
                Feature this testimonial
              </label>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingId ? 'Save Changes' : 'Add Testimonial'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-charcoal transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {testimonials.length === 0 && !formOpen ? (
        <div className="bg-white rounded-lg border border-border p-8 text-center">
          <Quote className="h-8 w-8 text-cedar/20 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-charcoal mb-1">No testimonials yet</h3>
          <p className="text-sm text-muted-foreground">
            Add client testimonials to showcase on your public agent profile.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="h-4 w-4 text-cedar/30" />
                    {t.featured && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm font-medium text-charcoal">{t.client_name}</p>
                  {t.client_title && <p className="text-xs text-muted-foreground">{t.client_title}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-2 text-muted-foreground hover:text-cedar transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={deletingId === t.id}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                    aria-label="Delete"
                  >
                    {deletingId === t.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
