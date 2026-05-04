'use client';
import { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../../lib/supabase';

export default function DevelopersAdmin() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from('developers').select('*').order('name');
    setDevelopers(data || []);
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await supabase.from('developers').delete().eq('id', id);
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2" style={{ color: '#0f2444', fontWeight: 400 }}>
            Developers
          </h1>
          <p className="text-slate-500">Manage real estate developers</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="px-6 py-3 text-white font-semibold text-sm rounded-lg shadow"
          style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
        >
          + Add Developer
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div></div>
      ) : developers.length === 0 ? (
        <div className="bg-white p-16 rounded-lg border border-slate-100 text-center">
          <div className="text-5xl mb-4">🏗️</div>
          <h3 className="font-semibold mb-2">No developers yet</h3>
          <p className="text-sm text-slate-500 mb-6">Add Emaar, Nakheel, Damac, etc.</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">
            + Add First Developer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map(dev => (
            <div key={dev.id} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              {dev.cover_image && (
                <div className="aspect-video bg-slate-100">
                  <img src={dev.cover_image} alt={dev.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  {dev.logo && <img src={dev.logo} alt="" className="w-12 h-12 object-contain" />}
                  <div>
                    <h3 className="font-semibold" style={{ color: '#0f2444' }}>{dev.name}</h3>
                    <p className="text-xs text-slate-500">{dev.headquartered}</p>
                  </div>
                </div>
                {dev.description && <p className="text-sm text-slate-600 line-clamp-2 mb-4">{dev.description}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(dev); setShowForm(true); }}
                    className="flex-1 py-2 bg-blue-50 text-blue-700 rounded text-sm font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dev.id, dev.name)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <DeveloperForm dev={editing} onClose={() => { setShowForm(false); setEditing(null); load(); }} />}
    </div>
  );
}

function DeveloperForm({ dev, onClose }) {
  const [data, setData] = useState(dev || {
    slug: '', name: '', founded: '', headquartered: 'Dubai, UAE',
    description: '', logo: '', cover_image: '', website: '', featured: false,
  });
  const [saving, setSaving] = useState(false);

  const slugify = (t) => t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  const save = async () => {
    setSaving(true);
    if (dev) {
      await supabase.from('developers').update(data).eq('id', dev.id);
    } else {
      await supabase.from('developers').insert([data]);
    }
    setSaving(false);
    onClose();
  };

  const uploadLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file, 'developers');
    setData({ ...data, logo: url });
  };

  const uploadCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file, 'developers');
    setData({ ...data, cover_image: url });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl my-8">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-display text-2xl" style={{ color: '#0f2444' }}>
            {dev ? 'Edit Developer' : 'Add Developer'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Name*</label>
            <input
              type="text"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value, slug: dev ? data.slug : slugify(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Emaar Properties"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Founded</label>
              <input type="text" value={data.founded || ''} onChange={e => setData({ ...data, founded: e.target.value })} className="w-full px-3 py-2 border rounded" placeholder="1997" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">HQ</label>
              <input type="text" value={data.headquartered || ''} onChange={e => setData({ ...data, headquartered: e.target.value })} className="w-full px-3 py-2 border rounded" placeholder="Dubai, UAE" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Description</label>
            <textarea value={data.description || ''} onChange={e => setData({ ...data, description: e.target.value })} className="w-full px-3 py-2 border rounded min-h-[100px]" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Logo</label>
            {data.logo && <img src={data.logo} alt="" className="h-16 mb-2" />}
            <input type="file" accept="image/*" onChange={uploadLogo} className="text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Cover Image</label>
            {data.cover_image && <img src={data.cover_image} alt="" className="h-32 w-full object-cover rounded mb-2" />}
            <input type="file" accept="image/*" onChange={uploadCover} className="text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Website</label>
            <input type="text" value={data.website || ''} onChange={e => setData({ ...data, website: e.target.value })} className="w-full px-3 py-2 border rounded" placeholder="https://emaar.com" />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={data.featured} onChange={e => setData({ ...data, featured: e.target.checked })} className="w-5 h-5" />
            <span className="text-sm font-semibold">⭐ Featured Developer</span>
          </label>
        </div>
        <div className="p-6 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 bg-slate-100 rounded font-semibold text-sm">Cancel</button>
          <button onClick={save} disabled={saving} className="px-6 py-2 text-white rounded font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
