'use client';
import Link from 'next/link';
import { getFeaturedProperties } from '../data/properties';
import { useReveal } from '../hooks/useReveal';

function PropertyCard({ property, index }) {
  const [ref, visible] = useReveal(0.15);

  return (
    <Link
      ref={ref}
      href={`/properties/${property.slug}`}
      className={`property-card group transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
    >
      <div className="img-wrap">
        <img src={property.coverImage} alt={property.title} loading="lazy" />
        <div className="overlay-gradient" />

        <div className={`property-badge ${property.category === 'off-plan' ? 'off-plan' : ''}`}>
          {property.status}
        </div>

        <div className="content-overlay">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold-300 mb-2 font-semibold">
            {property.location}
          </div>
          <h3 className="text-white text-2xl md:text-3xl font-display font-light mb-3" style={{ letterSpacing: '-0.01em' }}>
            {property.title}
          </h3>
          <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/20">
            <div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">{property.priceUnit}</div>
              <div className="price-tag" style={{ color: 'var(--gold-300)' }}>{property.price}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">Bedrooms</div>
              <div className="text-white font-medium">{property.bedrooms}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProperties() {
  const featured = getFeaturedProperties().slice(0, 6);
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-gold-400 to-transparent hidden lg:block" />

      <div className="max-w-[1500px] mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div className={`transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="eyebrow">Featured Selection</div>
            <h2 className="section-title">
              Properties of <em className="italic text-gradient-gold">Distinction</em>
            </h2>
          </div>

          <div className={`flex items-end justify-between md:justify-end md:gap-8 transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="editorial-text max-w-md">
              A curated selection of Dubai\'s most exceptional residences — each chosen for its architectural merit, location, and investment potential.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((property, i) => (
            <PropertyCard key={property.slug} property={property} index={i} />
          ))}
        </div>

        <div className="text-center mt-14 md:mt-20">
          <Link href="/properties" className="btn btn-dark">
            <span>View All Properties</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
