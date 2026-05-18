export function formatPrice(price: number | null): string {
  if (price == null) return '—';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '—';
  return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function formatBaths(full: number | null, half: number | null): string {
  const f = Number(full) || 0;
  const h = Number(half) || 0;
  if (h > 0) return `${f + h * 0.5}`;
  return `${f}`;
}

export function formatSqft(sqft: number | null): string {
  if (sqft == null) return '—';
  const num = typeof sqft === 'string' ? parseInt(sqft, 10) : sqft;
  if (isNaN(num)) return '—';
  return num.toLocaleString('en-US');
}

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatStreetAddress(listing: {
  street_number?: string | null;
  street_name?: string | null;
  street_suffix?: string | null;
  unit_number?: string | null;
  address?: string | null;
}): string {
  const parts = [listing.street_number, listing.street_name, listing.street_suffix].filter(Boolean);
  if (parts.length > 0) {
    const street = titleCase(parts.join(' '));
    return listing.unit_number ? `${street}, Unit ${listing.unit_number}` : street;
  }
  return listing.address || 'Address Unavailable';
}

export function formatCityLine(city: string | null, state: string | null, zip: string | null): string {
  const c = city ? titleCase(city) : null;
  return [c, state, zip].filter(Boolean).join(', ');
}

export function statusColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-700';
    case 'Coming Soon':
      return 'bg-blue-50 text-blue-700';
    case 'Active Under Contract':
    case 'Pending':
      return 'bg-amber-50 text-amber-700';
    case 'Closed':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function statusLabel(status: string): string {
  switch (status) {
    case 'Active Under Contract':
      return 'Under Contract';
    default:
      return status;
  }
}
