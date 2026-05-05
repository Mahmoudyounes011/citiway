'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDeveloperBySlug } from '../../../data/developers';
import { getPropertiesByDeveloper } from '../../../data/properties';
import { supabase } from '../../../lib/supabase';

export default function DeveloperDetail() {
  const params = useParams();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    if (!params.slug) return;
    const loadDeveloper = async () => {
      try {
        // Try Supabase first
        const { data, error } = await supabase
          .from('developers')
          .select('*')
          .eq('slug', params.slug)
          .single();

        if (!error && data) {
          // Map Supabase to component format
          setDeveloper({
            slug: data.slug,
            name: data.name,
            tagline: data.description?.slice(0, 80) || 'Trusted Dubai developer',
            established: data.founded ? parseInt(data.founded) : null,
            headquarters: data.headquartered || 'Dubai, UAE',
            logo: data.name?.toUpperCase().slice(0, 8) || 'DEV',
            coverImage: data.cover_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
            logoImage: data.logo || data.cover_image,
            featured: data.featured,
            description: data.description || '',
            longDescription: data.description || '',
            website: data.website,
            specialties: [],
            awards: [],
            signatureProjects: [],
            projectCount: 0,
            totalUnits: '—',
          });
        } else {
          // Fall back to static
          const staticDev = getDeveloperBySlug(params.slug);
          if (staticDev) setDeveloper(staticDev);
        }
      } catch (e) {
        const staticDev = getDeveloperBySlug(params.slug);
        if (staticDev) setDeveloper(staticDev);
      } finally {
        setLoading(false);
      }
    };
    loadDeveloper();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Developer Not Found
          </h1>
          <Link href="/developers" className="btn btn-dark">Browse All Developers</Link>
        </div>
      </div>
    );
  }

  const projects = getPropertiesByDeveloper(developer.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <>
      {/* Hero with Developer Cover */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-5 md:px-6 overflow-hidden" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-ken-burns" style={{ backgroundImage: `url(${developer.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,18,24,0.8) 0%, rgba(14,18,24,0.95) 100%)' }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-8">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/developers" className="text-white/50 hover:text-gold-400">Developers</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">{developer.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-end">
            <div className="lg:col-span-2">
              <div className="inline-block px-4 py-1.5 bg-gold-400/10 border border-gold-400/30 text-gold-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
                Est. {developer.established} • {developer.headquarters}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {developer.name}
              </h1>
              <p className="text-xl md:text-2xl italic text-gold-300 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {developer.tagline}
              </p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                {developer.description}
              </p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
              <div className="text-center lg:text-left p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{developer.projectCount}+</div>
                <div className="text-[10px] text-white/60 tracking-wider uppercase mt-1">Projects</div>
              </div>
              <div className="text-center lg:text-left p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{developer.totalUnits}</div>
                <div className="text-[10px] text-white/60 tracking-wider uppercase mt-1">Units Delivered</div>
              </div>
              <div className="text-center lg:text-left p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl md:text-4xl font-light text-gold-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{new Date().getFullYear() - developer.established}+</div>
                <div className="text-[10px] text-white/60 tracking-wider uppercase mt-1">Years Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="eyebrow">About the Developer</div>
            <h2 className="text-3xl md:text-5xl font-light text-ink-900 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The <em className="italic text-gold-600">Legacy</em>
            </h2>
            <div className="gold-line-h" />
            <p className="text-ink-700 leading-relaxed mb-8">
              {developer.longDescription}
            </p>

            {/* Specialties */}
            <div className="mb-10">
              <h3 className="text-xs tracking-[0.3em] uppercase text-gold-600 font-semibold mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-3">
                {developer.specialties.map((s, i) => (
                  <span key={i} className="px-4 py-2 text-sm bg-gray-50 border border-gray-100 text-ink-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            {developer.awards && (
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gold-600 font-semibold mb-4">Recognition & Awards</h3>
                <ul className="space-y-3">
                  {developer.awards.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-sm text-ink-700">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Signature Projects Sidebar */}
          <div>
            <div className="sticky top-28 p-8 bg-ink-900 text-white">
              <h3 className="text-2xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Signature <em className="italic text-gold-300">Projects</em>
              </h3>
              <div className="space-y-4 mb-8">
                {developer.signatureProjects.map((p, i) => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <div className="text-sm font-semibold text-white">{p.name}</div>
                      <div className="text-xs text-white/60">{p.location}</div>
                    </div>
                    <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-gold w-full text-center text-xs">
                Inquire About {developer.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      {projects.length > 0 && (
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ background: '#f8f6f1' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
              <div>
                <div className="eyebrow">Current Portfolio</div>
                <h2 className="section-title">
                  Available <em className="italic text-gold-600">Projects</em>
                </h2>
                <p className="section-subtitle mt-4">
                  Properties from {developer.name} currently available through Citiway Real Estate.
                </p>
              </div>
              <div className="text-4xl md:text-6xl font-light text-gold-500 mt-6 md:mt-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {projects.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <Link key={p.slug} href={`/properties/${p.slug}`} className="property-card hover-lift group">
                  <div className="img-wrap">
                    <img src={p.coverImage} alt={p.title} loading="lazy" />
                    <div className={`property-badge ${p.category === 'off-plan' ? 'off-plan' : ''}`}>{p.status}</div>
                  </div>
                  <div className="property-card-body">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">{p.location}</div>
                    <h3 className="text-2xl font-light text-ink-900 mb-2 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    <p className="text-xs text-ink-500 mb-4 line-clamp-2">{p.subtitle}</p>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-[10px] text-ink-400 uppercase tracking-wider">{p.priceUnit}</div>
                        <div className="price-tag">{p.price}</div>
                      </div>
                      <div className="text-[10px] text-ink-500 text-right">{p.bedrooms} BR</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <section className="py-20 px-5 md:px-6 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4 text-gold-400" style={{ fontFamily: "'Cormorant Garamond', serif" }}>—</div>
            <h3 className="text-2xl md:text-3xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              New Projects Coming Soon
            </h3>
            <p className="text-ink-500 mb-6">
              Register your interest to be notified when {developer.name} launches new projects.
            </p>
            <Link href="/contact" className="btn btn-gold">Register Interest</Link>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className="py-12 md:py-20 px-5 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow eyebrow-center">Get in Touch</div>
            <h2 className="text-3xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Interested in <em className="italic text-gold-600">{developer.name}</em>?
            </h2>
            <p className="text-ink-500">
              Fill in your details and our specialist will contact you with exclusive opportunities and insider insights.
            </p>
          </div>

          <div className="p-8 md:p-10 bg-ink-900">
            {inquirySent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-white text-xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Received</h3>
                <p className="text-white/60 text-sm">We&apos;ll be in touch shortly with {developer.name} opportunities.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name *" required className="form-input-glass" />
                  <input type="text" placeholder="Last Name *" required className="form-input-glass" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email *" required className="form-input-glass" />
                  <input type="tel" placeholder="Phone *" required className="form-input-glass" />
                </div>
                <textarea rows="3" placeholder="Tell us your requirements..." className="form-input-glass" defaultValue={`I'm interested in ${developer.name} projects.`} />
                <button type="submit" className="btn btn-gold w-full">Request Information</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
