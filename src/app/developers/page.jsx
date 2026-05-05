'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { developers as staticDevelopers } from '../../data/developers';
import { supabase } from '../../lib/supabase';

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allDevelopers, setAllDevelopers] = useState(staticDevelopers);

  useEffect(() => {
    const loadFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('developers')
          .select('*')
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          // Map Supabase format to component format
          const mapped = data.map(d => ({
            slug: d.slug,
            name: d.name,
            tagline: d.description ? d.description.slice(0, 80) : 'Trusted Dubai developer',
            established: d.founded ? parseInt(d.founded) : null,
            headquarters: d.headquartered || 'Dubai, UAE',
            logo: d.name?.toUpperCase().slice(0, 8) || 'DEV',
            coverImage: d.cover_image || d.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
            logoImage: d.logo || d.cover_image,
            featured: d.featured,
            projectCount: 0,
            totalUnits: '—',
            description: d.description || '',
            website: d.website,
          }));

          // Merge: admin developers take precedence (by slug)
          const adminSlugs = new Set(mapped.map(m => m.slug));
          const staticNotInAdmin = staticDevelopers.filter(s => !adminSlugs.has(s.slug));
          const combined = [...mapped, ...staticNotInAdmin];
          console.log(`[Citiway] Loaded ${mapped.length} developers from admin + ${staticNotInAdmin.length} sample developers`);
          setAllDevelopers(combined);
        } else {
          console.log('[Citiway] No developers in admin yet, showing samples');
        }
      } catch (e) {
        console.warn('[Citiway] Developer load error:', e.message);
      }
    };
    loadFromSupabase();
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery) return allDevelopers;
    const q = searchQuery.toLowerCase();
    return allDevelopers.filter(d =>
      d.name?.toLowerCase().includes(q) ||
      d.tagline?.toLowerCase().includes(q)
    );
  }, [searchQuery, allDevelopers]);

  const featured = filtered.filter(d => d.featured);
  const others = filtered.filter(d => !d.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-5 md:px-6 overflow-hidden" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 animate-ken-burns" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Developers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Dubai&apos;s Leading <em className="italic text-gold-300">Developers</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-sm md:text-lg mb-10">
            Explore projects from Dubai&apos;s most trusted real estate developers. From iconic landmarks to luxury residences, find the developer that aligns with your vision.
          </p>

          {/* Search */}
          <div className="glass-search p-2 max-w-2xl">
            <div className="relative">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input-glass text-base"
                style={{ paddingLeft: '56px' }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-10 pt-8 border-t border-white/10 max-w-2xl">
            <div>
              <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{allDevelopers.length}+</div>
              <div className="text-[10px] md:text-xs text-white/60 tracking-wider uppercase mt-1">Top Developers</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>500+</div>
              <div className="text-[10px] md:text-xs text-white/60 tracking-wider uppercase mt-1">Active Projects</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>200K+</div>
              <div className="text-[10px] md:text-xs text-white/60 tracking-wider uppercase mt-1">Units Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Developers - Large Cards */}
      {featured.length > 0 && (
        <section className="py-12 md:py-20 px-5 md:px-6 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10 md:mb-16">
              <div className="eyebrow">Premier Partners</div>
              <h2 className="section-title">Featured <em className="italic text-gold-600">Developers</em></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featured.map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/developers/${dev.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden hover-lift cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={dev.coverImage} alt={dev.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,18,24,0.3) 0%, rgba(14,18,24,0.85) 100%)' }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                    {/* Top - Logo/Name */}
                    <div>
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] tracking-[0.3em] uppercase text-gold-300">
                        Est. {dev.established}
                      </div>
                    </div>

                    {/* Bottom - Details */}
                    <div className="text-white">
                      <div className="text-3xl md:text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {dev.name}
                      </div>
                      <p className="text-sm text-white/80 italic mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {dev.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/20 mb-4">
                        <div>
                          <div className="text-xl md:text-2xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{dev.projectCount}+</div>
                          <div className="text-[9px] text-white/60 tracking-wider uppercase">Projects</div>
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{dev.totalUnits}</div>
                          <div className="text-[9px] text-white/60 tracking-wider uppercase">Units</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-gold-300 font-semibold">
                        View Portfolio
                        <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Developers - Compact List */}
      {others.length > 0 && (
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ background: '#f8f6f1' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10 md:mb-16">
              <div className="eyebrow">Our Network</div>
              <h2 className="section-title">More <em className="italic text-gold-600">Developers</em></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {others.map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/developers/${dev.slug}`}
                  className="group grid grid-cols-3 gap-0 bg-white hover-lift overflow-hidden border border-gray-100 hover:border-gold-300"
                >
                  <div className="col-span-1 relative overflow-hidden aspect-square">
                    <img src={dev.coverImage} alt={dev.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="col-span-2 p-5 md:p-6 flex flex-col justify-center">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold-600 font-semibold mb-1">Est. {dev.established}</div>
                    <h3 className="text-xl md:text-2xl font-light text-ink-900 mb-2 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{dev.name}</h3>
                    <p className="text-xs md:text-sm text-ink-500 italic line-clamp-2 mb-3">{dev.tagline}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-ink-700 font-semibold">{dev.projectCount}+ Projects</span>
                      <span className="text-ink-400">•</span>
                      <span className="text-ink-700 font-semibold">{dev.totalUnits} Units</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filtered.length === 0 && (
        <section className="py-20 px-5 md:px-6 bg-white text-center">
          <div className="max-w-lg mx-auto">
            <div className="text-6xl mb-4 text-gold-400" style={{ fontFamily: "'Cormorant Garamond', serif" }}>—</div>
            <h3 className="text-2xl font-light text-ink-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>No Developers Found</h3>
            <p className="text-ink-500 mb-6">Try a different search term.</p>
            <button onClick={() => setSearchQuery('')} className="btn btn-dark">Show All Developers</button>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 md:px-6 text-center" style={{ background: '#0e1218' }}>
        <div className="max-w-3xl mx-auto">
          <div className="eyebrow eyebrow-center">Ready to Invest?</div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Find Your Perfect <em className="italic text-gradient-gold">Developer Match</em>
          </h2>
          <p className="text-white/60 mb-8">
            Our team works directly with every major developer in Dubai. Get insider access to new launches, exclusive payment plans, and the best units before they&apos;re listed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">Speak to an Advisor</Link>
            <Link href="/off-plan" className="btn btn-ghost">Browse Off-Plan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
