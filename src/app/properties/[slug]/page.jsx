'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPropertyBySlug, getRelatedProperties } from '../../../data/properties';

export default function PropertyDetail() {
  const params = useParams();
  const property = getPropertyBySlug(params.slug);
  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Property Not Found
          </h1>
          <Link href="/properties" className="btn btn-dark">Browse All Properties</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProperties(params.slug);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-6 md:pt-10 pb-4 md:pb-6 px-5 md:px-6 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-wider flex-wrap">
            <Link href="/" className="text-ink-500 hover:text-gold-600 transition-colors">Home</Link>
            <span className="text-ink-300">/</span>
            <Link href={property.category === 'off-plan' ? '/off-plan' : '/properties'} className="text-ink-500 hover:text-gold-600 transition-colors">
              {property.category === 'off-plan' ? 'Off-Plan' : 'Properties'}
            </Link>
            <span className="text-ink-300">/</span>
            <span className="text-gold-600 font-semibold line-clamp-1">{property.title}</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 md:px-6 pt-6 md:pt-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="gallery-grid">
            {property.gallery.slice(0, 5).map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden cursor-pointer group"
                onClick={() => { setActiveImage(i); setShowGallery(true); }}
              >
                <img src={img} alt={`${property.title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                {i === 4 && property.gallery.length > 5 && (
                  <div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        +{property.gallery.length - 5}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase">View All Photos</div>
                    </div>
                  </div>
                )}
                {/* View photos button on first image (mobile) */}
                {i === 0 && (
                  <button className="md:hidden absolute bottom-4 right-4 px-4 py-2 bg-white/95 text-ink-900 text-xs font-semibold uppercase tracking-wider">
                    View All {property.gallery.length} Photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-ink-950/95 flex items-center justify-center p-4 md:p-6" onClick={() => setShowGallery(false)}>
          <button className="absolute top-4 md:top-6 right-4 md:right-6 text-white text-4xl hover:text-gold-400 transition-colors" onClick={() => setShowGallery(false)}>&times;</button>
          <div className="absolute top-4 md:top-6 left-4 md:left-6 text-white/70 text-sm">
            {activeImage + 1} / {property.gallery.length}
          </div>
          <img src={property.gallery[activeImage]} alt="" className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />
          {activeImage > 0 && (
            <button className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-400 transition-colors" onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage - 1); }}>‹</button>
          )}
          {activeImage < property.gallery.length - 1 && (
            <button className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-400 transition-colors" onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage + 1); }}>›</button>
          )}
        </div>
      )}

      {/* Main Content - IMPROVED TYPOGRAPHY */}
      <section className="py-10 md:py-16 px-5 md:px-6 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-10 md:mb-12">
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-gold-400 text-ink-900">
                  {property.status}
                </span>
                <Link
                  href={`/developers/${property.developer.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[11px] text-ink-500 tracking-[0.2em] uppercase hover:text-gold-600 transition-colors"
                >
                  {property.developer}
                </Link>
              </div>

              {/* IMPROVED: Better font hierarchy - cleaner Inter for readability */}
              <h1 className="mb-3" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                color: '#0e1218',
              }}>
                {property.title}
              </h1>

              <p className="text-base md:text-lg text-ink-600 mb-4 font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                {property.subtitle}
              </p>

              <div className="flex items-center gap-2 text-sm text-ink-600 font-medium">
                <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <span>{property.location}</span>
                <span className="text-ink-300">•</span>
                <span className="text-ink-500">{property.subLocation}</span>
              </div>
            </div>

            {/* Key Specs - IMPROVED */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6 md:py-8 border-y border-gray-100 mb-10 md:mb-12">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-400 mb-2 font-semibold">Bedrooms</div>
                <div className="text-2xl md:text-3xl font-semibold text-ink-900" style={{ fontFamily: "'Inter', sans-serif" }}>{property.bedrooms}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-400 mb-2 font-semibold">Bathrooms</div>
                <div className="text-2xl md:text-3xl font-semibold text-ink-900" style={{ fontFamily: "'Inter', sans-serif" }}>{property.bathrooms}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-400 mb-2 font-semibold">Area</div>
                <div className="text-2xl md:text-3xl font-semibold text-ink-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {property.areaMin.toLocaleString()}
                  {property.areaMax !== property.areaMin && `-${property.areaMax.toLocaleString()}`}
                </div>
                <div className="text-[10px] text-ink-500 mt-1">{property.unit}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-400 mb-2 font-semibold">Type</div>
                <div className="text-base md:text-lg font-semibold text-ink-900 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{property.type}</div>
              </div>
            </div>

            {/* Description - IMPROVED */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Overview</h2>
              <div className="gold-line mb-6" />
              <p className="text-ink-700 leading-relaxed mb-4 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {property.description}
              </p>
              <p className="text-ink-600 leading-relaxed text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {property.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Property Highlights</h2>
              <div className="gold-line mb-6 md:mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gold-50 transition-colors border-l-2 border-gold-400">
                    <svg className="w-4 h-4 text-gold-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="text-sm text-ink-800 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Amenities</h2>
              <div className="gold-line mb-6 md:mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {property.amenities.map((a, i) => (
                  <div key={i} className="p-4 md:p-5 border border-gray-100 text-center hover:border-gold-400 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 mx-auto mb-3 bg-gold-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                    </div>
                    <div className="text-xs text-ink-700 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{a.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Plan */}
            {property.paymentSchedule && (
              <div className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Payment Plan</h2>
                <div className="gold-line mb-6 md:mb-8" />
                <div className="bg-gray-50 p-6 md:p-8">
                  <div className="text-center mb-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold-600 font-semibold mb-2">Payment Structure</div>
                    <div className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{property.paymentPlan}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {property.paymentSchedule.map((p, i) => (
                      <div key={i} className="text-center p-6 bg-white">
                        <div className="text-3xl md:text-4xl font-light text-gold-600 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.percent}</div>
                        <div className="text-sm font-semibold text-ink-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{p.when}</div>
                        <div className="text-xs text-ink-500">{p.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Nearby */}
            {property.nearby && (
              <div className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Location &amp; Nearby</h2>
                <div className="gold-line mb-6 md:mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.nearby.map((n, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 border-l-2 border-gold-400">
                      <span className="text-sm text-ink-800 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{n.name}</span>
                      <span className="text-xs text-gold-600 tracking-wider uppercase font-semibold">{n.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Inquiry */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <div className="bg-white border border-gray-100 shadow-lg mb-6">
                <div className="p-6 md:p-8 bg-ink-900 text-white">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold-400 mb-2 font-semibold">{property.priceUnit}</div>
                  <div className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{property.price}</div>
                  {property.completion && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1 font-semibold">Completion</div>
                      <div className="text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{property.completion}</div>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-light text-ink-900 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Inquire Now
                  </h3>
                  <p className="text-xs text-ink-500 mb-6">An advisor will contact you within 24 hours</p>

                  {inquirySent ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <div className="text-sm font-semibold text-ink-900 mb-1">Inquiry Received</div>
                      <div className="text-xs text-ink-500">We&apos;ll be in touch shortly</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input type="text" placeholder="Full Name *" required className="form-input text-sm" />
                      <input type="email" placeholder="Email *" required className="form-input text-sm" />
                      <input type="tel" placeholder="Phone *" required className="form-input text-sm" />
                      <textarea rows="3" placeholder="Your message" defaultValue={`I'm interested in ${property.title}`} className="form-input text-sm" />
                      <button type="submit" className="btn btn-gold w-full text-[10px]">
                        Request Information
                      </button>
                    </form>
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-gray-100">
                    <a href="tel:+97142772373" className="flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-gold-400 hover:text-gold-600 transition-colors text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                      Call
                    </a>
                    <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 border border-green-500 text-green-600 hover:bg-green-50 transition-colors text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {property.roi && (
                <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-6 border border-gold-200">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold-700 mb-2 font-semibold">Expected ROI</div>
                  <div className="text-4xl font-light text-gold-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{property.roi}</div>
                  <div className="text-xs text-ink-600 mt-2">Estimated annual return based on comparable investments</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {related.length > 0 && (
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ background: '#f8f6f1' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <div className="eyebrow eyebrow-center">You May Also Like</div>
              <h2 className="text-3xl md:text-5xl font-light text-ink-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Similar <em className="italic text-gold-600">Properties</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/properties/${p.slug}`} className="property-card hover-lift group">
                  <div className="img-wrap">
                    <img src={p.coverImage} alt={p.title} loading="lazy" />
                    <div className="property-badge">{p.status}</div>
                  </div>
                  <div className="property-card-body">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">{p.location}</div>
                    <h3 className="text-xl md:text-2xl font-light text-ink-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="price-tag text-lg">{p.price}</div>
                      <div className="text-[10px] text-ink-500">{p.bedrooms} BR</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
