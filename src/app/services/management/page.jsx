import Link from 'next/link';

const SERVICES = [
  { title: 'Tenant Sourcing & Screening', desc: 'Rigorous vetting including background checks, employment verification, and rental history review.' },
  { title: 'Rent Collection & Financials', desc: 'Automated collection, detailed monthly statements, annual reports, and transparent management.' },
  { title: 'Maintenance & Repairs', desc: 'Proactive scheduling, 24/7 emergency response, vetted contractors, regular inspections.' },
  { title: 'Contract Management', desc: 'Ejari registration, lease preparation, renewals, compliance with Dubai tenancy laws.' },
  { title: 'Property Marketing', desc: 'Professional photography, virtual tours, listings on Bayut, Property Finder, Dubizzle.' },
  { title: 'Yield Optimization', desc: 'Market rate analysis, pricing strategy, furnishing consultancy, rental maximization.' },
];

export default function ManagementPage() {
  return (
    <>
      <section className="relative py-32 px-6" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 animate-ken-burns" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Property Management</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Property <em className="italic text-gradient-gold">Management</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">We manage. You earn. Hassle-free ownership with maximum returns.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="eyebrow eyebrow-center">End-to-End Service</div>
            <h2 className="section-title">Complete <em className="italic text-gold-600">Peace of Mind</em></h2>
            <p className="section-subtitle mx-auto mt-4">From tenant sourcing to financial reporting — we handle every detail while you enjoy the returns.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-8 border border-gray-100 hover:border-gold-300 transition-all duration-500 hover-lift">
                <div className="text-4xl font-light text-gold-500 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-xl font-light text-ink-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="eyebrow eyebrow-center">Management Plans</div>
              <h2 className="section-title">Flexible <em className="italic text-gold-600">Packages</em></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Essential', price: '5%', desc: 'of annual rent', features: ['Tenant sourcing & screening', 'Lease preparation & Ejari', 'Rent collection', 'Basic maintenance coordination', 'Annual inspection', 'Monthly statements'] },
                { name: 'Premium', price: '8%', desc: 'of annual rent', featured: true, features: ['Everything in Essential', 'Dedicated property manager', 'Quarterly inspections', 'Furnishing consultancy', 'Marketing & photography', 'Yield optimization reports', '24/7 emergency support', 'DEWA & service charges'] },
              ].map((p, i) => (
                <div key={i} className={`p-10 relative ${p.featured ? 'bg-ink-900 text-white' : 'bg-white border-2 border-gray-100'}`}>
                  {p.featured && <div className="absolute -top-3 left-8 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: '#caa244', color: '#0e1218' }}>Most Popular</div>}
                  <h3 className={`text-3xl font-light mb-2 ${p.featured ? 'text-white' : 'text-ink-900'}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-6xl font-light ${p.featured ? 'text-gold-300' : 'text-gold-600'}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>{p.price}</span>
                    <span className={`text-sm ${p.featured ? 'text-white/60' : 'text-ink-500'}`}>{p.desc}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-6 opacity-30" />
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-3 text-sm ${p.featured ? 'text-white/80' : 'text-ink-600'}`}>
                        <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={p.featured ? 'btn btn-gold w-full text-center' : 'btn btn-dark w-full text-center'}>Get Started</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
