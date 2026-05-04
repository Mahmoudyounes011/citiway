'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, deleteProperty } from '../../../lib/supabase';

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (filter !== 'all') {
      if (filter === 'featured') result = result.filter(p => p.featured);
      else if (filter === 'hidden') result = result.filter(p => p.hidden);
      else result = result.filter(p => p.category === filter);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(s) ||
        p.location?.toLowerCase().includes(s) ||
        p.developer?.toLowerCase().includes(s)
      );
    }

    setFiltered(result);
  }, [properties, search, filter]);

  const loadProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setProperties(data || []);
    setLoading(false);
  };

  const handleDelete = async (slug, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?\n\nThis cannot be undone.`)) return;

    setDeleting(slug);
    try {
      await deleteProperty(slug);
      await loadProperties();
    } catch (e) {
      alert('Failed to delete: ' + e.message);
    } finally {
      setDeleting(null);
    }
  };

  const toggleFeatured = async (id, currentValue) => {
    await supabase.from('properties').update({ featured: !currentValue }).eq('id', id);
    loadProperties();
  };

  const toggleHidden = async (id, currentValue) => {
    await supabase.from('properties').update({ hidden: !currentValue }).eq('id', id);
    loadProperties();
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
            Properties
          </h1>
          <p className="text-slate-500">Manage all your listings in one place</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-lg shadow hover:shadow-lg transition"
          style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
        >
          <span>+</span>
          <span>Add Property</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Search by title, location, developer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: '#e8edf2' }}
          />
          <div className="flex gap-2 flex-wrap">
            {['all', 'off-plan', 'sale', 'rent', 'featured', 'hidden'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Showing <span className="font-semibold">{filtered.length}</span> of {properties.length} properties
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-4 text-slate-500">Loading properties...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg p-16 text-center border border-slate-100">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#0f2444' }}>No properties found</h3>
          <p className="text-slate-500 mb-6">
            {properties.length === 0 ? 'Add your first property to get started' : 'Try adjusting your filters'}
          </p>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-lg"
            style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
          >
            + Add Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition border border-slate-100 overflow-hidden">
              {/* Image */}
              <div className="relative aspect-video bg-slate-100">
                <img
                  src={property.cover_image || 'https://via.placeholder.com/400x250?text=No+Image'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded font-semibold uppercase ${
                    property.category === 'off-plan' ? 'bg-green-500 text-white' :
                    property.category === 'sale' ? 'bg-blue-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {property.category}
                  </span>
                  {property.featured && <span className="text-xs px-2 py-1 rounded font-semibold uppercase bg-yellow-500 text-white">⭐ Featured</span>}
                  {property.hidden && <span className="text-xs px-2 py-1 rounded font-semibold uppercase bg-gray-700 text-white">👁️ Hidden</span>}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold mb-1 line-clamp-1" style={{ color: '#0f2444' }}>{property.title}</h3>
                <div className="text-xs text-slate-500 mb-3">{property.location}{property.sub_location && ` • ${property.sub_location}`}</div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="font-bold" style={{ color: '#1e88e5' }}>{property.price}</div>
                  <div className="text-xs text-slate-500">
                    {property.bedrooms && `${property.bedrooms} BR`}
                    {property.area_min && ` • ${property.area_min}+ sq ft`}
                  </div>
                </div>

                {/* Quick Toggles */}
                <div className="flex gap-2 mb-4 pb-4 border-b border-slate-100">
                  <button
                    onClick={() => toggleFeatured(property.id, property.featured)}
                    className={`flex-1 text-xs py-1.5 rounded font-semibold transition ${
                      property.featured
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {property.featured ? '⭐ Featured' : '☆ Feature'}
                  </button>
                  <button
                    onClick={() => toggleHidden(property.id, property.hidden)}
                    className={`flex-1 text-xs py-1.5 rounded font-semibold transition ${
                      property.hidden
                        ? 'bg-gray-700 text-white hover:bg-gray-800'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {property.hidden ? '👁️ Hidden' : '✓ Visible'}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/properties/${property.slug}`}
                    className="flex-1 text-center py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-semibold transition"
                  >
                    ✏️ Edit
                  </Link>
                  <Link
                    href={`/properties/${property.slug}`}
                    target="_blank"
                    className="flex-1 text-center py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold transition"
                  >
                    👁️ View
                  </Link>
                  <button
                    onClick={() => handleDelete(property.slug, property.title)}
                    disabled={deleting === property.slug}
                    className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                  >
                    {deleting === property.slug ? '...' : '🗑️'}
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
