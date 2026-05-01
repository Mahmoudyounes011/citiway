'use client';
import { useState } from 'react';
import Link from 'next/link';
import { properties } from '../../data/properties';

export default function PropertiesPage() {
  const saleProps = properties.filter(p => p.category === 'sale' || p.category === 'off-plan');
  const [typeFilter, setTypeFilter] = useState('');
  const [locFilter, setLocFilter] = useState('');
  const [sort, setSort] = useState('');

  let filtered = saleProps;
  if (typeFilter) filtered = filtered.filter(p => p.type.toLowerCase().includes(typeFilter.toLowerCase()));
  if (locFilter) filtered = filtered.filter(p => p.location === locFilter);
  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.priceFrom - b.priceFrom);
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.priceFrom - a.priceFrom);

  const locations = [...new Set(saleProps.map(p => p.location))];

  return (
    <>
      <section className="relative py-24 px-6" style={{ background: '#0e1218' }}>
        <div className="container-max">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Properties</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Properties <em className="italic text-gold-300">for Sale</em>
          </h1>
          <p className="text-white/60">{filtered.length} exceptional properties available</p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white border-b py-4 px-6 shadow-sm">
        <div className="container-max flex flex-wrap gap-3">
          <select className="form-select text-xs py-2 w-auto" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Penthouse">Penthouse</option>
          </select>
          <select className="form-select text-xs py-2 w-auto" value={locFilter} onChange={e => setLocFilter(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select className="form-select text-xs py-2 w-auto ml-auto" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-500 mb-4">No properties match your filters.</p>
              <button onClick={() => { setTypeFilter(''); setLocFilter(''); }} className="btn btn-dark">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <Link key={p.slug} href={`/properties/${p.slug}`} className="property-card hover-lift group">
                  <div className="img-wrap">
                    <img src={p.coverImage} alt={p.title} loading="lazy" />
                    <div className={`property-badge ${p.category === 'off-plan' ? 'off-plan' : ''}`}>{p.status}</div>
                  </div>
                  <div className="property-card-body">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">{p.type} • {p.location}</div>
                    <h3 className="text-2xl font-light text-ink-900 mb-2 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    <p className="text-xs text-ink-500 mb-4 line-clamp-2">{p.subtitle}</p>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-[10px] text-ink-400 uppercase tracking-wider">{p.priceUnit}</div>
                        <div className="price-tag">{p.price}</div>
                      </div>
                      <div className="text-[10px] text-ink-500 text-right">{p.bedrooms} BR • {p.areaMin.toLocaleString()} sq ft</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
