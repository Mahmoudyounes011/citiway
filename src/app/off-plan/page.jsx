'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { properties } from '../../data/properties';
import { useReveal } from '../../hooks/useReveal';

function PropertyCard({ p, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <Link
      ref={ref}
      href={`/properties/${p.slug}`}
      className={`property-card group transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="img-wrap">
        <img src={p.coverImage} alt={p.title} loading="lazy" />
        <div className="overlay-gradient" />
        <div className="property-badge off-plan">{p.status}</div>
        {p.featured && <div className="property-badge featured">Featured</div>}
        <div className="content-overlay">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold-300 mb-2 font-semibold">{p.developer}</div>
          <h3 className="text-white text-2xl font-display font-light mb-2">{p.title}</h3>
          <p className="text-white/70 text-xs mb-4">{p.location} · {p.type}</p>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20 text-xs">
            <div><div className="text-white/50 text-[10px] uppercase tracking-wider">Starting</div><div className="text-gold-300 font-semibold">{p.price}</div></div>
            <div><div className="text-white/50 text-[10px] uppercase tracking-wider">Completion</div><div className="text-white font-semibold">{p.completion}</div></div>
            <div><div className="text-white/50 text-[10px] uppercase tracking-wider">Payment</div><div className="text-white font-semibold">{p.paymentPlan}</div></div>
            <div><div className="text-white/50 text-[10px] uppercase tracking-wider">ROI</div><div className="text-green-400 font-semibold">{p.roi}</div></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function OffPlanPage() {
  const offPlanProperties = properties.filter(p => p.category === 'off-plan');

  const [searchQuery, setSearchQuery] = useState('');
  const [devFilter, setDevFilter] = useState('');
  const [locFilter, setLocFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedFilter, setBedFilter] = useState('');
  const [completionFilter, setCompletionFilter] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const locations = [...new Set(offPlanProperties.map(p => p.location))];
  const developers = [...new Set(offPlanProperties.map(p => p.developer))];
  const completionYears = [...new Set(offPlanProperties.map(p => p.completion))];

  const filtered = useMemo(() => {
    let result = offPlanProperties;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.subLocation.toLowerCase().includes(q)
      );
    }
    if (devFilter) result = result.filter(p => p.developer === devFilter);
    if (locFilter) result = result.filter(p => p.location === locFilter);
    if (typeFilter) result = result.filter(p => p.type.toLowerCase().includes(typeFilter.toLowerCase()));
    if (priceMin) result = result.filter(p => p.priceFrom >= parseInt(priceMin));
    if (priceMax) result = result.filter(p => p.priceFrom <= parseInt(priceMax));
    if (bedFilter) result = result.filter(p => p.bedrooms.includes(bedFilter));
    if (completionFilter) result = result.filter(p => p.completion === completionFilter);
    if (sort === 'price-low') result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === 'newest') result = [...result].sort((a, b) => (b.status === 'New Launch' ? 1 : 0) - (a.status === 'New Launch' ? 1 : 0));
    return result;
  }, [searchQuery, devFilter, locFilter, typeFilter, priceMin, priceMax, bedFilter, completionFilter, sort, offPlanProperties]);

  const clearAll = () => {
    setSearchQuery(''); setDevFilter(''); setLocFilter(''); setTypeFilter('');
    setPriceMin(''); setPriceMax(''); setBedFilter(''); setCompletionFilter(''); setSort('');
  };

  const activeFilterCount = [devFilter, locFilter, typeFilter, priceMin, priceMax, bedFilter, completionFilter].filter(Boolean).length;

  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-end" style={{ marginTop: '-80px' }}>
        <div className="absolute inset-0">
          {/* Static poster underneath */}
          <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=85)',
            filter: 'brightness(0.55)',
          }} />
          {/* Live Dubai video on top */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.55)' }}
          >
            <source src="https://videos.pexels.com/video-files/19444055/19444055-uhd_2560_1440_60fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(15, 36, 68, 0.5) 0%, rgba(10, 22, 40, 0.95) 100%)'
          }} />
        </div>

        <div className="relative z-10 w-full px-5 md:px-12 lg:px-24 pb-12 md:pb-16">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
              <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-gold-400">Off-Plan Projects</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold-400 font-display text-xl">\</span>
              <span className="text-gold-300 text-xs font-semibold tracking-[0.4em] uppercase">
                Invest in Tomorrow
              </span>
            </div>
            <h1 className="text-white font-display font-light mb-6 max-w-4xl" style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.025em'
            }}>
              Off-Plan <em className="italic text-gradient-gold">Projects</em>
            </h1>
            <p className="text-white/60 max-w-xl text-sm md:text-base font-light leading-relaxed">
              Invest early in Dubai\'s most promising developments. Flexible payment plans, exceptional returns, Golden Visa eligibility — all in one curated portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar (sticky) */}
      <section className="py-6 md:py-8 px-5 md:px-12 lg:px-24 sticky top-16 md:top-20 z-40 border-b border-white/10" style={{ background: '#0f2444' }}>
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            <div className="md:col-span-6 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search by project, developer, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input-glass"
                style={{ paddingLeft: '48px' }}
              />
            </div>
            <select className="form-select-glass text-xs md:col-span-3" value={locFilter} onChange={e => setLocFilter(e.target.value)}>
              <option value="" className="bg-ink-900">All Locations</option>
              {locations.map(l => <option key={l} className="bg-ink-900">{l}</option>)}
            </select>
            <select className="form-select-glass text-xs md:col-span-2" value={devFilter} onChange={e => setDevFilter(e.target.value)}>
              <option value="" className="bg-ink-900">Developer</option>
              {developers.map(d => <option key={d} className="bg-ink-900">{d}</option>)}
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="btn btn-gold text-[10px] h-full md:col-span-1 relative flex items-center justify-center gap-2 px-4">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <span className="md:hidden">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold flex items-center justify-center rounded-full" style={{ background: '#0e1218', color: '#caa244' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filters Drawer */}
      <section className={`overflow-hidden transition-all duration-500 ${showFilters ? 'max-h-[600px]' : 'max-h-0'}`} style={{ background: '#143461' }}>
        <div className="max-w-[1500px] mx-auto px-5 md:px-12 lg:px-24 py-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 font-semibold">Type</label>
              <select className="form-select-glass text-xs py-2.5" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="" className="bg-ink-900">All</option>
                <option value="Apartment" className="bg-ink-900">Apartment</option>
                <option value="Villa" className="bg-ink-900">Villa</option>
                <option value="Townhouse" className="bg-ink-900">Townhouse</option>
                <option value="Penthouse" className="bg-ink-900">Penthouse</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 font-semibold">Bedrooms</label>
              <select className="form-select-glass text-xs py-2.5" value={bedFilter} onChange={e => setBedFilter(e.target.value)}>
                <option value="" className="bg-ink-900">Any</option>
                <option value="Studio" className="bg-ink-900">Studio</option>
                <option value="1" className="bg-ink-900">1 BR</option>
                <option value="2" className="bg-ink-900">2 BR</option>
                <option value="3" className="bg-ink-900">3 BR</option>
                <option value="4" className="bg-ink-900">4+ BR</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 font-semibold">Min Price</label>
              <select className="form-select-glass text-xs py-2.5" value={priceMin} onChange={e => setPriceMin(e.target.value)}>
                <option value="" className="bg-ink-900">No Min</option>
                <option value="500000" className="bg-ink-900">500K</option>
                <option value="1000000" className="bg-ink-900">1M</option>
                <option value="2000000" className="bg-ink-900">2M</option>
                <option value="5000000" className="bg-ink-900">5M</option>
                <option value="10000000" className="bg-ink-900">10M</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 font-semibold">Max Price</label>
              <select className="form-select-glass text-xs py-2.5" value={priceMax} onChange={e => setPriceMax(e.target.value)}>
                <option value="" className="bg-ink-900">No Max</option>
                <option value="2000000" className="bg-ink-900">2M</option>
                <option value="5000000" className="bg-ink-900">5M</option>
                <option value="10000000" className="bg-ink-900">10M</option>
                <option value="20000000" className="bg-ink-900">20M</option>
                <option value="50000000" className="bg-ink-900">50M</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 font-semibold">Completion</label>
              <select className="form-select-glass text-xs py-2.5" value={completionFilter} onChange={e => setCompletionFilter(e.target.value)}>
                <option value="" className="bg-ink-900">Any</option>
                {completionYears.map(y => <option key={y} value={y} className="bg-ink-900">{y}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={clearAll} className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase border border-white/20 text-white/70 hover:border-gold-400 hover:text-gold-400 transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-6 md:py-8 px-5 md:px-12 lg:px-24" style={{ background: '#1e88e5' }}>
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Flexible Payments', desc: 'Up to 5yr post-handover' },
            { label: 'Zero Commission', desc: 'Direct from developer' },
            { label: 'High ROI', desc: '8-14% annual returns' },
            { label: 'Golden Visa', desc: 'AED 2M+ eligible' },
          ].map((b, i) => (
            <div key={i}>
              <div className="text-xs md:text-sm font-bold text-white">{b.label}</div>
              <div className="text-[10px] md:text-xs text-white/85">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Results header */}
      <section className="bg-white border-b border-gray-100 py-4 px-5 md:px-12 lg:px-24">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <span className="font-semibold text-ink">{filtered.length}</span>
            <span className="text-ink-500"> projects found</span>
          </div>
          <select className="form-select text-xs py-2" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort: Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20 px-5 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1500px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 text-gold-400 font-display font-light">—</div>
              <h3 className="text-2xl font-display font-light text-ink mb-3">No Projects Match Your Search</h3>
              <p className="text-ink-500 mb-6">Try adjusting your filters to see more options.</p>
              <button onClick={clearAll} className="btn btn-dark"><span>Clear All Filters</span></button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-5 md:px-12 lg:px-24" style={{ background: '#f4f8fd' }}>
        <div className="max-w-[1500px] mx-auto text-center">
          <div className="eyebrow eyebrow-center">Need Guidance?</div>
          <h2 className="section-title mb-6">
            Speak to an <em className="italic text-gradient-gold">Investment Advisor</em>
          </h2>
          <p className="editorial-text max-w-2xl mx-auto mb-8">
            Our off-plan specialists can help you identify the perfect investment opportunity based on your budget, goals, and risk profile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/consultation" className="btn btn-gold"><span>Book Consultation</span></Link>
            <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="btn btn-dark"><span>WhatsApp Us</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
