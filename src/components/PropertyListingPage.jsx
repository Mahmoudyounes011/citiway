'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { properties as staticProperties } from '../data/properties';
import { supabase } from '../lib/supabase';
import { Icon } from './Icons';

const PROPERTY_TYPES = ['All Types', 'Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio'];
const BEDROOM_OPTIONS = ['Any', 'Studio', '1', '2', '3', '4', '5+'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Largest First' },
];

export default function PropertyListingPage({ category, pageTitle, pageSubtitle, heroImage, heroVideo }) {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [bedrooms, setBedrooms] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const loadProps = async () => {
      // Always start with static properties as a base
      const staticForCategory = staticProperties.filter(p => p.category === category);

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('category', category)
          .eq('hidden', false)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('[Citiway] Supabase error, using static data:', error.message);
          setAllProperties(staticForCategory);
        } else if (data && data.length > 0) {
          // Map Supabase records (snake_case → camelCase)
          const mapped = data.map(p => ({
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle,
            developer: p.developer,
            location: p.location,
            subLocation: p.sub_location,
            category: p.category,
            type: p.type,
            status: p.status,
            featured: p.featured,
            price: p.price,
            priceFrom: p.price_from,
            priceUnit: p.price_unit,
            completion: p.completion,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            areaMin: p.area_min,
            areaMax: p.area_max,
            unit: p.unit,
            coverImage: p.cover_image,
            description: p.description,
          }));

          // Merge: admin properties take precedence over static (by slug)
          const adminSlugs = new Set(mapped.map(m => m.slug));
          const staticNotInAdmin = staticForCategory.filter(s => !adminSlugs.has(s.slug));
          const combined = [...mapped, ...staticNotInAdmin];

          console.log(`[Citiway] Loaded ${mapped.length} properties from admin + ${staticNotInAdmin.length} sample properties for ${category}`);
          setAllProperties(combined);
        } else {
          console.log(`[Citiway] No properties in admin for ${category} yet, showing samples`);
          setAllProperties(staticForCategory);
        }
      } catch (e) {
        console.warn('[Citiway] Connection error, using static data:', e.message);
        setAllProperties(staticForCategory);
      } finally {
        setLoading(false);
      }
    };
    loadProps();
  }, [category]);

  const allLocations = useMemo(() => {
    const locs = [...new Set(allProperties.map(p => p.location))].sort();
    return ['All Locations', ...locs];
  }, [allProperties]);

  const filtered = useMemo(() => {
    let result = [...allProperties];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(s) ||
        p.location?.toLowerCase().includes(s) ||
        p.developer?.toLowerCase().includes(s) ||
        p.subLocation?.toLowerCase().includes(s)
      );
    }

    if (propertyType !== 'All Types') {
      result = result.filter(p => p.type?.toLowerCase().includes(propertyType.toLowerCase()));
    }

    if (bedrooms !== 'Any') {
      if (bedrooms === 'Studio') {
        result = result.filter(p => p.bedrooms?.toLowerCase().includes('studio'));
      } else if (bedrooms === '5+') {
        result = result.filter(p => parseInt(p.bedrooms) >= 5);
      } else {
        result = result.filter(p => p.bedrooms?.includes(bedrooms));
      }
    }

    if (location && location !== 'All Locations') {
      result = result.filter(p => p.location === location);
    }

    if (minPrice) result = result.filter(p => (p.priceFrom || 0) >= parseInt(minPrice));
    if (maxPrice) result = result.filter(p => (p.priceFrom || Infinity) <= parseInt(maxPrice));

    if (sortBy === 'price-asc') result.sort((a, b) => (a.priceFrom || 0) - (b.priceFrom || 0));
    else if (sortBy === 'price-desc') result.sort((a, b) => (b.priceFrom || 0) - (a.priceFrom || 0));
    else if (sortBy === 'area-desc') result.sort((a, b) => (b.areaMax || 0) - (a.areaMax || 0));

    return result;
  }, [allProperties, search, propertyType, bedrooms, minPrice, maxPrice, location, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProperties = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch(''); setPropertyType('All Types'); setBedrooms('Any');
    setMinPrice(''); setMaxPrice(''); setLocation('All Locations'); setSortBy('newest');
    setPage(1);
  };

  return (
    <>
      {/* HERO — starts cleanly below header, no overlap */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[600px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.5)',
          }} />
          {heroVideo && (
            <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.5)' }}>
              <source src={heroVideo} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15, 36, 68, 0.3) 0%, rgba(10, 22, 40, 0.95) 100%)' }} />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-16 pb-12 pt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: '#90caf9' }}>
              {category === 'sale' ? 'Properties for Sale' : category === 'rent' ? 'Properties to Rent' : 'Off-Plan Projects'}
            </div>
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-3">
              {pageTitle}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              {pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR — Floating card that overlaps hero (NOT sticky to avoid card overlap) */}
      <section className="relative -mt-8 z-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, location, developer..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
              </div>

              <select
                value={propertyType}
                onChange={(e) => { setPropertyType(e.target.value); setPage(1); }}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
                style={{ borderColor: '#e8edf2', minWidth: '140px' }}
              >
                {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>

              <select
                value={bedrooms}
                onChange={(e) => { setBedrooms(e.target.value); setPage(1); }}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
                style={{ borderColor: '#e8edf2', minWidth: '120px' }}
              >
                {BEDROOM_OPTIONS.map(b => <option key={b} value={b}>{b === 'Any' ? 'Any Beds' : `${b} ${b === 'Studio' ? '' : 'BR'}`}</option>)}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition"
                style={{
                  background: showFilters ? '#1e88e5' : '#f4f8fd',
                  color: showFilters ? 'white' : '#1565c0',
                }}
              >
                <Icon name="filter" className="w-4 h-4" />
                {showFilters ? 'Less' : 'More'} Filters
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ borderColor: '#e8edf2' }}
                >
                  {allLocations.map(l => <option key={l}>{l}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Min Price (AED)"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
                <input
                  type="number"
                  placeholder="Max Price (AED)"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS BAR */}
      <section className="bg-white py-5 mt-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            <span className="font-bold text-2xl font-display" style={{ color: '#0f2444' }}>{filtered.length}</span>
            <span className="ml-2">properties found</span>
            {filtered.length > 0 && totalPages > 1 && <span className="ml-3 text-slate-400">• Page {page} of {totalPages}</span>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-50 rounded-lg border" style={{ borderColor: '#e8edf2' }}>
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-2 rounded-l-lg transition ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Grid view"
              >
                <Icon name="grid" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 rounded-r-lg transition ${view === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                title="List view"
              >
                <Icon name="list" className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              style={{ borderColor: '#e8edf2' }}
            >
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <div className="mt-4 text-slate-500">Loading properties...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-slate-100">
              <Icon name="search-empty" className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-2xl font-display font-light mb-2" style={{ color: '#0f2444' }}>No properties match your search</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or browse all properties</p>
              <button onClick={clearFilters} className="px-6 py-3 text-white font-semibold rounded-lg" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {paginatedProperties.map(p => <PropertyCard key={p.slug} property={p} />)}
                </div>
              ) : (
                <div className="space-y-5">
                  {paginatedProperties.map(p => <PropertyCardList key={p.slug} property={p} />)}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white border rounded-lg disabled:opacity-30 hover:bg-slate-50 font-semibold text-sm"
                    style={{ borderColor: '#e8edf2' }}
                  >
                    ← Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (totalPages > 7 && pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - page) > 2) {
                      if (pageNum === 2 || pageNum === totalPages - 1) return <span key={i} className="text-slate-400">...</span>;
                      return null;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold text-sm ${page === pageNum ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-slate-50'}`}
                        style={{ borderColor: page === pageNum ? '#1e88e5' : '#e8edf2' }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-white border rounded-lg disabled:opacity-30 hover:bg-slate-50 font-semibold text-sm"
                    style={{ borderColor: '#e8edf2' }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// PREMIUM PROPERTY CARD — GRID
// ─────────────────────────────────────────────────────────────────
function PropertyCard({ property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.coverImage || 'https://via.placeholder.com/600x450'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {property.status && (
              <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm" style={{ background: 'rgba(30, 136, 229, 0.95)' }}>
                {property.status}
              </span>
            )}
          </div>
          {property.featured && (
            <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm flex items-center gap-1" style={{ background: 'rgba(245, 158, 11, 0.95)' }}>
              <Icon name="star" className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Bottom gradient + price */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-0.5">{property.priceUnit || 'Starting from'}</div>
          <div className="text-white font-display text-2xl font-light">{property.price}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <Icon name="map-pin" className="w-3.5 h-3.5" />
          <span>{property.location}{property.subLocation && `, ${property.subLocation}`}</span>
        </div>

        <h3 className="font-display text-lg font-medium mb-1 line-clamp-1 group-hover:text-blue-600 transition" style={{ color: '#0f2444' }}>
          {property.title}
        </h3>
        {property.subtitle && <p className="text-sm text-slate-500 line-clamp-1 mb-3">{property.subtitle}</p>}

        <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-sm text-slate-600">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Icon name="bed" className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Icon name="bath" className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.bathrooms}</span>
            </div>
          )}
          {property.areaMin && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Icon name="area" className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.areaMin}{property.areaMax > property.areaMin && `-${property.areaMax}`}</span>
              <span className="text-xs text-slate-400">{property.unit || 'sq ft'}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// LIST VIEW
// ─────────────────────────────────────────────────────────────────
function PropertyCardList({ property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
      <div className="md:w-72 lg:w-96 flex-shrink-0 relative aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-100">
        <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        {property.featured && (
          <span className="absolute top-3 left-3 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-1" style={{ background: 'rgba(245, 158, 11, 0.95)' }}>
            <Icon name="star" className="w-3 h-3" /> Featured
          </span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <Icon name="map-pin" className="w-3.5 h-3.5" />
            <span>{property.location}{property.subLocation && `, ${property.subLocation}`}</span>
          </div>
          <h3 className="font-display text-2xl font-light mb-2 group-hover:text-blue-600 transition" style={{ color: '#0f2444' }}>
            {property.title}
          </h3>
          {property.subtitle && <p className="text-slate-500 mb-3">{property.subtitle}</p>}
          {property.description && <p className="text-sm text-slate-600 line-clamp-2 mb-4">{property.description}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-5 text-sm text-slate-600">
            {property.bedrooms && <div className="flex items-center gap-1.5"><Icon name="bed" className="w-4 h-4 text-slate-400" /> <strong>{property.bedrooms}</strong></div>}
            {property.bathrooms && <div className="flex items-center gap-1.5"><Icon name="bath" className="w-4 h-4 text-slate-400" /> <strong>{property.bathrooms}</strong></div>}
            {property.areaMin && <div className="flex items-center gap-1.5"><Icon name="area" className="w-4 h-4 text-slate-400" /> <strong>{property.areaMin}+ {property.unit || 'sq ft'}</strong></div>}
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">{property.priceUnit || 'Starting from'}</div>
            <div className="font-display text-2xl font-light" style={{ color: '#1565c0' }}>{property.price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
