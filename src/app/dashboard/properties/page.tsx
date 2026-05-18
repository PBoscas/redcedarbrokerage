'use client';

import { FadeIn } from '@/components/ui/motion';
import Link from 'next/link';
import { Plus, Home, Eye, Edit, ArrowRight } from 'lucide-react';

const PLACEHOLDER_PROPERTIES = [
  { slug: '8742-tamar-dr', title: '8742 Tamar Drive', location: 'Columbia, MD', status: 'Active', price: '$625,000', views: 847 },
  { slug: '3021-brightwood-ct', title: '3021 Brightwood Court', location: 'Ellicott City, MD', status: 'Active', price: '$875,000', views: 623 },
  { slug: '1455-river-hill-rd', title: '1455 River Hill Road', location: 'Clarksville, MD', status: 'Under Contract', price: '$1,250,000', views: 1205 },
];

export default function PropertiesPage() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <FadeIn>
          <h1 className="text-display text-2xl text-charcoal mb-1">My Properties</h1>
          <p className="text-sm text-muted-foreground">Manage properties assigned to you.</p>
        </FadeIn>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-cedar text-white text-sm font-medium rounded hover:bg-cedar-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Property
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Property</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Views</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_PROPERTIES.map((property) => (
                <tr key={property.slug} className="border-b border-border last:border-0 hover:bg-sand-light/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-sand flex items-center justify-center flex-shrink-0">
                        <Home className="h-4 w-4 text-cedar/40" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-charcoal">{property.title}</p>
                        <p className="text-xs text-muted-foreground">{property.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full ${
                      property.status === 'Active' ? 'bg-green-50 text-green-700' :
                      property.status === 'Under Contract' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal">{property.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" /> {property.views}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-sm text-cedar hover:underline">
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
