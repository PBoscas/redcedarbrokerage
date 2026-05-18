'use client';

import { FadeIn } from '@/components/ui/motion';
import {
  Home, Search, Plus, MoreHorizontal,
  DollarSign, MapPin, Bed, Bath,
} from 'lucide-react';

const placeholderProperties = [
  { address: '8742 Tamar Dr', city: 'Columbia', price: '$525,000', beds: 4, baths: 2.5, sqft: '2,400', status: 'Active', agent: 'Joe Bird', days: 12 },
  { address: '3021 Brightwood Ct', city: 'Ellicott City', price: '$875,000', beds: 5, baths: 3, sqft: '3,800', status: 'Active', agent: 'Brian Pakulla', days: 5 },
  { address: '6190 Hidden Stream Dr', city: 'Clarksville', price: '$715,000', beds: 4, baths: 3, sqft: '3,200', status: 'Pending', agent: 'Stephanie Ridgely', days: 28 },
  { address: '1455 River Hill Rd', city: 'Clarksville', price: '$1,250,000', beds: 6, baths: 4, sqft: '4,500', status: 'Active', agent: 'Hollie Pakulla', days: 3 },
  { address: '9320 Vollmerhausen Rd', city: 'Jessup', price: '$389,000', beds: 3, baths: 2, sqft: '1,650', status: 'Sold', agent: 'Nikki Monios', days: 45 },
  { address: '5014 Dorsey Hall Dr', city: 'Ellicott City', price: '$475,000', beds: 4, baths: 2.5, sqft: '2,200', status: 'Active', agent: 'Ryan Douglas', days: 8 },
];

const statusBadge: Record<string, string> = {
  Active: 'bg-green-50 text-green-700',
  Pending: 'bg-amber-50 text-amber-700',
  Sold: 'bg-gray-100 text-gray-600',
};

export default function PropertiesPage() {
  return (
    <div className="max-w-6xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl text-charcoal mb-1">Property Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage listings, pricing, and property details.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-cedar text-white px-4 py-2 rounded-lg text-sm hover:bg-cedar/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add Property
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-white rounded-lg border border-border">
          {/* Filters */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-sand-light/50 focus:outline-none focus:ring-1 focus:ring-cedar/30"
              />
            </div>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Sold</option>
            </select>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-charcoal">
              <option>All Agents</option>
              <option>Sarah Mitchell</option>
              <option>James Park</option>
              <option>Lisa Chen</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Property</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Details</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Agent</th>
                  <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Days</th>
                  <th className="px-4 py-3 sr-only">Actions</th>
                </tr>
              </thead>
              <tbody>
                {placeholderProperties.map((prop) => (
                  <tr key={prop.address} className="border-b border-border last:border-0 hover:bg-sand-light/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-sand-light flex items-center justify-center flex-shrink-0">
                          <Home className="h-4 w-4 text-cedar" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{prop.address}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {prop.city}, MI
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-charcoal flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        {prop.price.replace('$', '')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {prop.beds}</span>
                        <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {prop.baths}</span>
                        <span>{prop.sqft} sqft</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[prop.status] || ''}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{prop.agent}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{prop.days}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1 rounded hover:bg-sand-light transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
