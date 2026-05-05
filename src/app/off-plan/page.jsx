'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { properties } from '../../data/properties';
import { useReveal } from '../../hooks/useReveal';
import { Icon } from '../../components/Icons';
import { supabase } from '../../lib/supabase';

// ─────────────────────────────────────────────────────────────────
// PROPERTY CARD — Clean image on top, content below (no overlap)
// ─────────────────────────────────────────────────────────────────
function PropertyCard({ p, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <Link
      ref={ref}
      href={`/properties/${p.slug}`}
      className={`group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms`, transitionProperty: 'opacity, transform, box-shadow' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={p.coverImage}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {p.status && (
              <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm" style={{ background: 'rgba(30, 136, 229, 0.95)' }}>
                {p.status}
              </span>
            )}
          </div>
          {p.featured && (
            <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm flex items-center gap-1" style={{ background: 'rgba(245, 158, 11, 0.95)' }}>
              <Icon name="star" className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Bottom price overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-0.5">Starting from</div>
          <div className="text-white font-display text-2xl font-light">{p.price}</div>
        </div>
      </div>

      {/* Content below image */}
      <div className="p-5">
        <div className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: '#1565c0' }}>
          {p.developer}
        </div>
        <h3 className="font-display text-lg md:text-xl font-medium mb-1 line-clamp-1 group-hover:text-blue-600 transition" style={{ color: '#0f2444' }}>
          {p.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Icon name="map-pin" className="w-3.5 h-3.5" />
          <span>{p.location}{p.subLocation && `, ${p.subLocation}`}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">Handover</div>
            <div className="text-xs font-semibold" style={{ color: '#0f2444' }}>{p.completion || 'TBA'}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">Payment</div>
            <div className="text-xs font-semibold" style={{ color: '#0f2444' }}>{p.paymentPlan || 'Flexible'}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">ROI</div>
            <div className="text-xs font-semibold" style={{ color: '#16a34a' }}>{p.roi || '—'}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN OFF-PLAN PAGE
// ─────────────────────────────────────────────────────────────────
export default function OffPlanPage() {
  const staticOffPlan = properties.filter(p => p.category === 'off-plan');
  const [offPlanProperties, setOffPlanProperties] = useState(staticOffPlan);

  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('category', 'off-plan')
          .eq('hidden', false)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
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
            paymentPlan: p.payment_plan,
            roi: p.roi,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            areaMin: p.area_min,
            areaMax: p.area_max,
            unit: p.unit,
            coverImage: p.cover_image,
            description: p.description,
          }));
          const adminSlugs = new Set(mapped.map(m => m.slug));
          const staticNotInAdmin = staticOffPlan.filter(s => !adminSlugs.has(s.slug));
          setOffPlanProperties([...mapped, ...staticNotInAdmin]);
        }
      } catch (e) {
        console.warn('[Citiway] Off-plan load error:', e.message);
      }
    };
    loadFromSupabase();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [devFilter, setDevFilter] = useState('All Developers');
  const [locFilter, setLocFilter] = useState('All Locations');
  const [bedFilter, setBedFilter] = useState('Any');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const locations = useMemo(() => ['All Locations', ...[...new Set(offPlanProperties.map(p => p.location))]], [offPlanProperties]);
  const developers = useMemo(() => ['All Developers', ...[...new Set(offPlanProperties.map(p => p.developer).filter(Boolean))]], [offPlanProperties]);

  const filtered = useMemo(() => {
    let result = [...offPlanProperties];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.developer?.toLowerCase().includes(q) ||
        p.subLocation?.toLowerCase().includes(q)
      );
    }
    if (devFilter !== 'All Developers') result = result.filter(p => p.developer === devFilter);
    if (locFilter !== 'All Locations') result = result.filter(p => p.location === locFilter);
    if (bedFilter !== 'Any') {
      if (bedFilter === 'Studio') result = result.filter(p => p.bedrooms?.toLowerCase().includes('studio'));
      else if (bedFilter === '5+') result = result.filter(p => parseInt(p.bedrooms) >= 5);
      else result = result.filter(p => p.bedrooms?.includes(bedFilter));
    }
    if (priceMin) result = result.filter(p => (p.priceFrom || 0) >= parseInt(priceMin));
    if (priceMax) result = result.filter(p => (p.priceFrom || Infinity) <= parseInt(priceMax));

    if (sort === 'price-low') result.sort((a, b) => (a.priceFrom || 0) - (b.priceFrom || 0));
    else if (sort === 'price-high') result.sort((a, b) => (b.priceFrom || 0) - (a.priceFrom || 0));

    return result;
  }, [searchQuery, devFilter, locFilter, bedFilter, priceMin, priceMax, sort, offPlanProperties]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProperties = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearAll = () => {
    setSearchQuery(''); setDevFilter('All Developers'); setLocFilter('All Locations');
    setBedFilter('Any'); setPriceMin(''); setPriceMax(''); setSort('newest'); setPage(1);
  };

  return (
    <>
      {/* HERO — clean, starts below header */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[600px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=85)',
            filter: 'brightness(0.5)',
          }} />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          >
            <source src="https://videos.pexels.com/video-files/19444055/19444055-uhd_2560_1440_60fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(15, 36, 68, 0.3) 0%, rgba(10, 22, 40, 0.95) 100%)'
          }} />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-16 pb-12 pt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: '#90caf9' }}>
              Off-Plan Projects
            </div>
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-3">
              Invest in Tomorrow
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              Be first to invest in Dubai's most exciting upcoming developments. Pre-construction prices, flexible payment plans, and high ROI potential.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR — Floating card overlapping hero edge */}
      <section className="relative -mt-8 z-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by project, developer, or location..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
              </div>

              <select
                value={devFilter}
                onChange={(e) => { setDevFilter(e.target.value); setPage(1); }}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
                style={{ borderColor: '#e8edf2', minWidth: '160px' }}
              >
                {developers.map(d => <option key={d}>{d}</option>)}
              </select>

              <select
                value={bedFilter}
                onChange={(e) => { setBedFilter(e.target.value); setPage(1); }}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
                style={{ borderColor: '#e8edf2', minWidth: '120px' }}
              >
                {['Any', 'Studio', '1', '2', '3', '4', '5+'].map(b => <option key={b} value={b}>{b === 'Any' ? 'Any Beds' : `${b} ${b === 'Studio' ? '' : 'BR'}`}</option>)}
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
                  value={locFilter}
                  onChange={(e) => { setLocFilter(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ borderColor: '#e8edf2' }}
                >
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Min Price (AED)"
                  value={priceMin}
                  onChange={(e) => { setPriceMin(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
                <input
                  type="number"
                  placeholder="Max Price (AED)"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(e.target.value); setPage(1); }}
                  className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  style={{ borderColor: '#e8edf2' }}
                />
                <button
                  onClick={clearAll}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="py-6 md:py-8 mt-6 px-6 lg:px-16" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Flexible Payments', desc: 'Up to 5yr post-handover', icon: 'calendar' },
            { label: 'Zero Commission', desc: 'Direct from developer', icon: 'badge-check' },
            { label: 'High ROI', desc: '8-14% annual returns', icon: 'trending' },
            { label: 'Golden Visa', desc: 'AED 2M+ eligible', icon: 'award' },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-1">
                <Icon name={b.icon} className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs md:text-sm font-bold text-white">{b.label}</div>
              <div className="text-[10px] md:text-xs text-white/85">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS BAR */}
      <section className="bg-white py-5 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            <span className="font-bold text-2xl font-display" style={{ color: '#0f2444' }}>{filtered.length}</span>
            <span className="ml-2">projects found</span>
            {filtered.length > 0 && totalPages > 1 && <span className="ml-3 text-slate-400">• Page {page} of {totalPages}</span>}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            style={{ borderColor: '#e8edf2' }}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-slate-100">
              <Icon name="search-empty" className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-2xl font-display font-light mb-2" style={{ color: '#0f2444' }}>No projects match your search</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or browse all projects</p>
              <button onClick={clearAll} className="px-6 py-3 text-white font-semibold rounded-lg" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {paginatedProperties.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} />)}
              </div>

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
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-slate-50'}`}
                      style={{ borderColor: page === i + 1 ? '#1e88e5' : '#e8edf2' }}
                    >
                      {i + 1}
                    </button>
                  ))}
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

      {/* CTA */}
      <section className="py-20 px-6 lg:px-16 text-center" style={{ background: '#f4f8fd' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: '#1565c0' }}>
            Need Guidance?
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4" style={{ color: '#0f2444' }}>
            Speak to an Investment Advisor
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Our off-plan specialists can help you identify the perfect investment opportunity based on your budget, goals, and risk profile.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
              style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
            >
              Book Consultation
            </Link>
            <a
              href="https://wa.me/971527313111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
            >
              <Icon name="whatsapp" className="w-4 h-4" fill="currentColor" stroke="none" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
