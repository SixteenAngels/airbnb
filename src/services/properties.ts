import { getSupabaseClient } from '../config/supabase';
import { mockProperties } from '../data/mockProperties';
import { Property } from '../types';

export type FetchPropertiesParams = {
  query?: string;
};

export async function fetchProperties(params: FetchPropertiesParams = {}): Promise<Property[]> {
  const { query } = params;
  const supabase = getSupabaseClient();

  // Fallback to mock data if no Supabase env vars are provided
  if (!supabase) {
    return filterProperties(mockProperties, query);
  }

  // Example Supabase query — assumes a 'properties' table roughly matching Property
  const supaQuery = supabase.from('properties').select('id,title,price,city,bedrooms,bathrooms,sqft').limit(50);

  const { data, error } = await supaQuery;
  if (error) {
    // In MVP, fall back to mocks on error
    return filterProperties(mockProperties, query);
  }

  const records: Property[] = (data ?? []).map((row: any) => ({
    id: String(row.id),
    title: String(row.title),
    price: Number(row.price) || 0,
    city: row.city ?? undefined,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    sqft: row.sqft ?? undefined,
  }));

  return filterProperties(records, query);
}

function filterProperties(list: Property[], query?: string): Property[] {
  if (!query) return list;
  const q = query.trim().toLowerCase();
  if (q.length === 0) return list;
  return list.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    (p.city ? p.city.toLowerCase().includes(q) : false)
  );
}

