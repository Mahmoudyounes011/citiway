'use client';
import Link from 'next/link';

const RENTALS = [
  { slug: 'rent-1', title: 'Furnished 1BR in Downtown', location: 'Downtown Dubai', price: 'AED 95,000/yr', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', beds: 1, baths: 2, area: '850', type: 'Apartment' },
  { slug: 'rent-2', title: 'Spacious 3BR Villa in Springs', location: 'The Springs', price: 'AED 140,000/yr', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', beds: 3, baths: 3, area: '2,400', type: 'Villa' },
  { slug: 'rent-3', title: 'Modern Studio in Business Bay', location: 'Business Bay', price: 'AED 55,000/yr', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', beds: 0, baths: 1, area: '500', type: 'Studio' },
  { slug: 'rent-4', title: 'Sea View 2BR in JBR', location: 'Jumeirah Beach Residence', price: 'AED 180,000/yr', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', beds: 2, baths: 3, area: '1,500', type: 'Apartment' },
  { slug: 'rent-5', title: '4BR Townhouse in JVC', location: 'Jumeirah Village Circle', price: 'AED 120,000/yr', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', beds: 4, baths: 4, area: '2,800', type: 'Townhouse' },
  { slug: 'rent-6', title: 'Luxury 2BR in Marina Walk', location: 'Dubai Marina', price: 'AED 160,000/yr', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', beds: 2, baths: 2, area: '1,300', type: 'Apartment' },
];

export default function RentPage() {
  return (
    <>
      <section className="relative py-24 px-6" style={{ background: '#0e1218' }}>
        <div className="container-max">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Rentals</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Properties <em className="italic text-gold-300">for Rent</em>
          </h1>
          <p className="text-white/60">{RENTALS.length} rental properties available</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENTALS.map(p => (
              <div key={p.slug} className="property-card hover-lift group cursor-pointer">
                <div className="img-wrap">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="property-badge">For Rent</div>
                </div>
                <div className="property-card-body">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">{p.type} • {p.location}</div>
                  <h3 className="text-2xl font-light text-ink-900 mb-3 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                  <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                    <div className="price-tag">{p.price}</div>
                    <div className="text-[10px] text-ink-500 text-right">{p.beds === 0 ? 'Studio' : `${p.beds} BR`} • {p.area} sq ft</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
