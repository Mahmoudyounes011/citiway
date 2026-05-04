'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, uploadImage } from '../../lib/supabase';

const EMPTY_PROPERTY = {
  slug: '',
  title: '',
  subtitle: '',
  developer: '',
  location: '',
  sub_location: '',
  category: 'off-plan',
  type: 'Apartment',
  status: 'New Launch',
  featured: false,
  hidden: false,
  price: '',
  price_from: 0,
  price_unit: 'Starting from',
  completion: '',
  payment_plan: '',
  roi: '',
  bedrooms: '',
  bathrooms: '',
  area_min: 0,
  area_max: 0,
  unit: 'sq ft',
  cover_image: '',
  gallery: [],
  description: '',
  long_description: '',
  features: [],
  amenities: [],
  payment_schedule: [],
  nearby: [],
  location_lat: 25.2048,
  location_lng: 55.2708,
};

const slugify = (text) => text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export default function PropertyForm({ existingProperty, onSaved }) {
  const router = useRouter();
  const fileInputRef = useRef();
  const galleryInputRef = useRef();
  const [property, setProperty] = useState(existingProperty || EMPTY_PROPERTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const isEdit = !!existingProperty;

  const updateField = (field, value) => {
    setProperty(p => ({ ...p, [field]: value }));
  };

  const updateTitle = (title) => {
    setProperty(p => ({
      ...p,
      title,
      slug: !isEdit ? slugify(title) : p.slug,
    }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const url = await uploadImage(file, 'covers');
      updateField('cover_image', url);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError('');
    try {
      const urls = await Promise.all(files.map(f => uploadImage(f, 'gallery')));
      updateField('gallery', [...(property.gallery || []), ...urls]);
    } catch (err) {
      setError('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index) => {
    updateField('gallery', property.gallery.filter((_, i) => i !== index));
  };

  const addArrayItem = (field) => {
    if (field === 'features' || field === 'nearby_count') {
      updateField('features', [...(property.features || []), '']);
    } else if (field === 'amenities') {
      updateField('amenities', [...(property.amenities || []), { icon: 'pool', name: '' }]);
    } else if (field === 'payment_schedule') {
      updateField('payment_schedule', [...(property.payment_schedule || []), { percent: '', when: '', note: '' }]);
    } else if (field === 'nearby') {
      updateField('nearby', [...(property.nearby || []), { name: '', distance: '' }]);
    }
  };

  const removeArrayItem = (field, index) => {
    updateField(field, property[field].filter((_, i) => i !== index));
  };

  const updateArrayItem = (field, index, value) => {
    const newArr = [...property[field]];
    newArr[index] = value;
    updateField(field, newArr);
  };

  const handleSave = async () => {
    setError('');

    // Validation
    if (!property.title) return setError('Title is required');
    if (!property.slug) return setError('Slug is required');
    if (!property.location) return setError('Location is required');

    setSaving(true);
    try {
      const dataToSave = {
        ...property,
        // Clean empty array entries
        features: (property.features || []).filter(Boolean),
        amenities: (property.amenities || []).filter(a => a.name),
        nearby: (property.nearby || []).filter(n => n.name),
        payment_schedule: (property.payment_schedule || []).filter(p => p.when),
      };

      if (isEdit) {
        const { error } = await supabase
          .from('properties')
          .update(dataToSave)
          .eq('slug', existingProperty.slug);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([dataToSave]);
        if (error) throw error;
      }

      if (onSaved) onSaved();
      else router.push('/admin/properties');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: '📝 Basic Info', },
    { id: 'pricing', label: '💰 Pricing & Specs' },
    { id: 'media', label: '🖼️ Images' },
    { id: 'details', label: '📋 Description' },
    { id: 'features', label: '✨ Features & Amenities' },
    { id: 'payment', label: '💳 Payment & Location' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button onClick={() => router.back()} className="text-sm text-slate-500 hover:text-slate-900 mb-2">
            ← Back to Properties
          </button>
          <h1 className="font-display text-3xl md:text-4xl" style={{ color: '#0f2444', fontWeight: 400 }}>
            {isEdit ? `Edit: ${property.title}` : 'Add New Property'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin/properties')}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-semibold text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 text-white font-semibold text-sm rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
          >
            {saving ? 'Saving...' : (isEdit ? '💾 Save Changes' : '➕ Create Property')}
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      {/* Tab Navigation */}
      <div className="bg-white rounded-t-lg shadow-sm border border-slate-100 overflow-x-auto">
        <div className="flex border-b border-slate-100 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-sm border border-slate-100 border-t-0 p-6 md:p-8">

        {/* BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-5">
            <Field label="Property Title*" hint="The main name of the property">
              <input
                type="text"
                value={property.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="form-field"
                placeholder="e.g., Montiva by Vida"
              />
            </Field>

            <Field label="Subtitle" hint="A short tagline shown under the title">
              <input
                type="text"
                value={property.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="form-field"
                placeholder="e.g., A landmark residence at Dubai Creek Harbour"
              />
            </Field>

            <Field label="URL Slug*" hint="Used in the URL. Auto-generated, but you can customize">
              <input
                type="text"
                value={property.slug}
                onChange={(e) => updateField('slug', slugify(e.target.value))}
                className="form-field font-mono text-sm"
                placeholder="e.g., montiva-vida-creek-harbour"
              />
              <div className="text-xs text-slate-500 mt-1">URL will be: <span className="font-mono">/properties/{property.slug || 'your-slug'}</span></div>
            </Field>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Location*" hint="Main neighborhood">
                <input
                  type="text"
                  value={property.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="form-field"
                  placeholder="Dubai Marina"
                />
              </Field>
              <Field label="Sub-Location" hint="Specific area within the location">
                <input
                  type="text"
                  value={property.sub_location || ''}
                  onChange={(e) => updateField('sub_location', e.target.value)}
                  className="form-field"
                  placeholder="Marina Walk"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Developer" hint="Builder/owner name">
                <input
                  type="text"
                  value={property.developer || ''}
                  onChange={(e) => updateField('developer', e.target.value)}
                  className="form-field"
                  placeholder="Emaar Properties"
                />
              </Field>
              <Field label="Property Type" hint="Apartment, Villa, etc.">
                <input
                  type="text"
                  value={property.type || ''}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="form-field"
                  placeholder="Apartment, Penthouse"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Category*">
                <select value={property.category} onChange={(e) => updateField('category', e.target.value)} className="form-field">
                  <option value="off-plan">Off-Plan</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </Field>
              <Field label="Status">
                <select value={property.status} onChange={(e) => updateField('status', e.target.value)} className="form-field">
                  <option value="New Launch">New Launch</option>
                  <option value="Now Selling">Now Selling</option>
                  <option value="Selling Fast">Selling Fast</option>
                  <option value="Pre-Launch">Pre-Launch</option>
                  <option value="Ready">Ready to Move</option>
                  <option value="Exclusive Listing">Exclusive Listing</option>
                </select>
              </Field>
              <div className="flex items-end gap-4 pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={property.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-5 h-5 accent-blue-600" />
                  <span className="text-sm font-semibold">⭐ Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={property.hidden} onChange={(e) => updateField('hidden', e.target.checked)} className="w-5 h-5" />
                  <span className="text-sm font-semibold">👁️ Hidden</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* PRICING & SPECS */}
        {activeTab === 'pricing' && (
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Display Price*" hint="How it shows on the site">
                <input
                  type="text"
                  value={property.price || ''}
                  onChange={(e) => updateField('price', e.target.value)}
                  className="form-field"
                  placeholder="AED 1.85M"
                />
              </Field>
              <Field label="Price From (number)" hint="For sorting and filtering">
                <input
                  type="number"
                  value={property.price_from || ''}
                  onChange={(e) => updateField('price_from', parseInt(e.target.value) || 0)}
                  className="form-field"
                  placeholder="1850000"
                />
              </Field>
            </div>

            <Field label="Price Unit" hint="What appears next to the price">
              <select value={property.price_unit || 'Starting from'} onChange={(e) => updateField('price_unit', e.target.value)} className="form-field">
                <option>Starting from</option>
                <option>Sale Price</option>
                <option>Per Month</option>
                <option>Per Year</option>
                <option>Price on Request</option>
              </select>
            </Field>

            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Bedrooms" hint="e.g. 1-3, Studio - 3, 4">
                <input
                  type="text"
                  value={property.bedrooms || ''}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                  className="form-field"
                  placeholder="1-3"
                />
              </Field>
              <Field label="Bathrooms">
                <input
                  type="text"
                  value={property.bathrooms || ''}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                  className="form-field"
                  placeholder="1-4"
                />
              </Field>
              <Field label="Area Unit">
                <select value={property.unit || 'sq ft'} onChange={(e) => updateField('unit', e.target.value)} className="form-field">
                  <option>sq ft</option>
                  <option>sq m</option>
                </select>
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Min Area">
                <input
                  type="number"
                  value={property.area_min || ''}
                  onChange={(e) => updateField('area_min', parseInt(e.target.value) || 0)}
                  className="form-field"
                  placeholder="750"
                />
              </Field>
              <Field label="Max Area">
                <input
                  type="number"
                  value={property.area_max || ''}
                  onChange={(e) => updateField('area_max', parseInt(e.target.value) || 0)}
                  className="form-field"
                  placeholder="2100"
                />
              </Field>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Completion Date">
                <input
                  type="text"
                  value={property.completion || ''}
                  onChange={(e) => updateField('completion', e.target.value)}
                  className="form-field"
                  placeholder="Q4 2028 / Ready"
                />
              </Field>
              <Field label="Payment Plan">
                <input
                  type="text"
                  value={property.payment_plan || ''}
                  onChange={(e) => updateField('payment_plan', e.target.value)}
                  className="form-field"
                  placeholder="80/20"
                />
              </Field>
              <Field label="Expected ROI">
                <input
                  type="text"
                  value={property.roi || ''}
                  onChange={(e) => updateField('roi', e.target.value)}
                  className="form-field"
                  placeholder="8-12%"
                />
              </Field>
            </div>
          </div>
        )}

        {/* MEDIA */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0f2444' }}>
                Cover Image* <span className="text-xs text-slate-500 font-normal">(Main display image)</span>
              </label>

              {property.cover_image ? (
                <div className="relative inline-block group">
                  <img src={property.cover_image} alt="Cover" className="w-full max-w-md rounded-lg border border-slate-200" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 rounded-lg">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white text-slate-900 rounded font-semibold text-sm"
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => updateField('cover_image', '')}
                      className="px-4 py-2 bg-red-600 text-white rounded font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full max-w-md aspect-video border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50"
                >
                  <div className="text-4xl mb-2">{uploading ? '⏳' : '📤'}</div>
                  <div className="text-sm font-semibold text-slate-700">{uploading ? 'Uploading...' : 'Click to Upload Cover'}</div>
                  <div className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</div>
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />

              {/* OR paste URL */}
              <div className="mt-3">
                <label className="text-xs text-slate-500">Or paste image URL:</label>
                <input
                  type="text"
                  value={property.cover_image || ''}
                  onChange={(e) => updateField('cover_image', e.target.value)}
                  className="form-field text-sm font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#0f2444' }}>
                Gallery Images <span className="text-xs text-slate-500 font-normal">(Additional photos)</span>
              </label>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {(property.gallery || []).map((url, idx) => (
                  <div key={idx} className="relative aspect-square group">
                    <img src={url} alt="" className="w-full h-full object-cover rounded-lg border border-slate-200" />
                    <button
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 w-7 h-7 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploading}
                  className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50"
                >
                  <div className="text-2xl">{uploading ? '⏳' : '+'}</div>
                  <div className="text-xs font-semibold mt-1">{uploading ? 'Uploading...' : 'Add Photos'}</div>
                </button>
              </div>
              <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
            </div>
          </div>
        )}

        {/* DETAILS */}
        {activeTab === 'details' && (
          <div className="space-y-5">
            <Field label="Short Description*" hint="The main pitch (1-2 sentences)">
              <textarea
                value={property.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="form-field min-h-[100px]"
                placeholder="Stunning beachfront villa with breathtaking views..."
              />
            </Field>

            <Field label="Long Description" hint="Detailed paragraph for the property page">
              <textarea
                value={property.long_description || ''}
                onChange={(e) => updateField('long_description', e.target.value)}
                className="form-field min-h-[200px]"
                placeholder="Set along the pristine beaches of..."
              />
            </Field>
          </div>
        )}

        {/* FEATURES & AMENITIES */}
        {activeTab === 'features' && (
          <div className="space-y-8">
            {/* Key Features */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold" style={{ color: '#0f2444' }}>
                  Key Features <span className="text-xs text-slate-500 font-normal">(Selling points)</span>
                </label>
                <button onClick={() => addArrayItem('features')} className="text-blue-600 text-sm font-semibold hover:underline">
                  + Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {(property.features || []).map((feat, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => updateArrayItem('features', idx, e.target.value)}
                      className="form-field flex-1"
                      placeholder="e.g., Direct beach access"
                    />
                    <button onClick={() => removeArrayItem('features', idx)} className="px-3 bg-red-50 text-red-600 rounded hover:bg-red-100">
                      ✕
                    </button>
                  </div>
                ))}
                {(!property.features || property.features.length === 0) && (
                  <div className="text-sm text-slate-400 py-4">No features yet. Click "+ Add Feature" to add one.</div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold" style={{ color: '#0f2444' }}>
                  Amenities <span className="text-xs text-slate-500 font-normal">(Building facilities)</span>
                </label>
                <button onClick={() => addArrayItem('amenities')} className="text-blue-600 text-sm font-semibold hover:underline">
                  + Add Amenity
                </button>
              </div>
              <div className="space-y-2">
                {(property.amenities || []).map((amenity, idx) => (
                  <div key={idx} className="flex gap-2">
                    <select
                      value={amenity.icon || 'pool'}
                      onChange={(e) => updateArrayItem('amenities', idx, { ...amenity, icon: e.target.value })}
                      className="form-field"
                      style={{ width: '120px' }}
                    >
                      <option value="pool">🏊 Pool</option>
                      <option value="gym">💪 Gym</option>
                      <option value="spa">🧖 Spa</option>
                      <option value="kids">🎠 Kids</option>
                      <option value="park">🌳 Park</option>
                      <option value="security">🔒 Security</option>
                      <option value="parking">🚗 Parking</option>
                      <option value="lounge">🛋️ Lounge</option>
                      <option value="dining">🍽️ Dining</option>
                      <option value="retail">🛍️ Retail</option>
                      <option value="beach">🏖️ Beach</option>
                      <option value="cinema">🎬 Cinema</option>
                      <option value="concierge">🛎️ Concierge</option>
                      <option value="marina">⚓ Marina</option>
                    </select>
                    <input
                      type="text"
                      value={amenity.name || ''}
                      onChange={(e) => updateArrayItem('amenities', idx, { ...amenity, name: e.target.value })}
                      className="form-field flex-1"
                      placeholder="Amenity name"
                    />
                    <button onClick={() => removeArrayItem('amenities', idx)} className="px-3 bg-red-50 text-red-600 rounded hover:bg-red-100">
                      ✕
                    </button>
                  </div>
                ))}
                {(!property.amenities || property.amenities.length === 0) && (
                  <div className="text-sm text-slate-400 py-4">No amenities yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT & LOCATION */}
        {activeTab === 'payment' && (
          <div className="space-y-8">
            {/* Payment Schedule */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold" style={{ color: '#0f2444' }}>
                  Payment Schedule
                </label>
                <button onClick={() => addArrayItem('payment_schedule')} className="text-blue-600 text-sm font-semibold hover:underline">
                  + Add Stage
                </button>
              </div>
              <div className="space-y-2">
                {(property.payment_schedule || []).map((stage, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={stage.percent || ''}
                      onChange={(e) => updateArrayItem('payment_schedule', idx, { ...stage, percent: e.target.value })}
                      className="form-field w-20"
                      placeholder="20%"
                    />
                    <input
                      type="text"
                      value={stage.when || ''}
                      onChange={(e) => updateArrayItem('payment_schedule', idx, { ...stage, when: e.target.value })}
                      className="form-field flex-1"
                      placeholder="Down Payment"
                    />
                    <input
                      type="text"
                      value={stage.note || ''}
                      onChange={(e) => updateArrayItem('payment_schedule', idx, { ...stage, note: e.target.value })}
                      className="form-field flex-1"
                      placeholder="Upon booking"
                    />
                    <button onClick={() => removeArrayItem('payment_schedule', idx)} className="px-3 bg-red-50 text-red-600 rounded hover:bg-red-100">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold" style={{ color: '#0f2444' }}>
                  Nearby Places
                </label>
                <button onClick={() => addArrayItem('nearby')} className="text-blue-600 text-sm font-semibold hover:underline">
                  + Add Place
                </button>
              </div>
              <div className="space-y-2">
                {(property.nearby || []).map((place, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={place.name || ''}
                      onChange={(e) => updateArrayItem('nearby', idx, { ...place, name: e.target.value })}
                      className="form-field flex-1"
                      placeholder="e.g., Dubai Mall"
                    />
                    <input
                      type="text"
                      value={place.distance || ''}
                      onChange={(e) => updateArrayItem('nearby', idx, { ...place, distance: e.target.value })}
                      className="form-field"
                      style={{ width: '180px' }}
                      placeholder="5 min walk"
                    />
                    <button onClick={() => removeArrayItem('nearby', idx)} className="px-3 bg-red-50 text-red-600 rounded hover:bg-red-100">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coordinates */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#0f2444' }}>
                GPS Coordinates <span className="text-xs text-slate-500 font-normal">(For map display)</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Latitude" hint="">
                  <input
                    type="number"
                    step="any"
                    value={property.location_lat || ''}
                    onChange={(e) => updateField('location_lat', parseFloat(e.target.value) || 0)}
                    className="form-field font-mono text-sm"
                    placeholder="25.2048"
                  />
                </Field>
                <Field label="Longitude" hint="">
                  <input
                    type="number"
                    step="any"
                    value={property.location_lng || ''}
                    onChange={(e) => updateField('location_lng', parseFloat(e.target.value) || 0)}
                    className="form-field font-mono text-sm"
                    placeholder="55.2708"
                  />
                </Field>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                💡 Tip: Get coords from Google Maps — right-click any spot → click coords to copy
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Save Bar at bottom */}
      <div className="sticky bottom-4 mt-6 bg-white p-4 rounded-lg shadow-2xl border border-slate-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {isEdit ? '✏️ Editing existing property' : '➕ Creating new property'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin/properties')}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-semibold text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-white font-semibold text-sm rounded-lg shadow disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
          >
            {saving ? 'Saving...' : (isEdit ? '💾 Save Changes' : '➕ Create Property')}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .form-field {
          width: 100%;
          padding: 0.65rem 0.875rem;
          border: 1px solid #e8edf2;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: white;
          color: #0f1729;
        }
        .form-field:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }
        textarea.form-field {
          resize: vertical;
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: '#0f2444' }}>
        {label}
      </label>
      {hint && <div className="text-xs text-slate-500 mb-1.5">{hint}</div>}
      {children}
    </div>
  );
}
