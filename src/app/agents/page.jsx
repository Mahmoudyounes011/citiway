import Link from 'next/link';

const AGENTS = [
  { name: 'Fayez Kamal', title: 'General Manager', email: 'fayez@citiway.com', phone: '+971 52 771 3111', languages: ['Arabic', 'English', 'Urdu'], specialties: ['Luxury Properties', 'Investment Advisory', 'Commercial'], bio: 'With over 18 years in Dubai real estate, Fayez leads Citiway with a vision for excellence and client-centric service. His deep market knowledge and industry relationships have been instrumental in building Citiway into a trusted brand.', deals: '200+' },
  { name: 'Asad Qadeer', title: 'Senior Sales Consultant', email: 'asad.qadeer@citiway.com', phone: '+971 52 558 8132', languages: ['English', 'Urdu', 'Hindi'], specialties: ['Residential Sales', 'Off-Plan Projects', 'First-Time Buyers'], bio: 'Asad brings exceptional market insight and a consultative approach to every client interaction. Specializing in residential sales and off-plan investments, he has helped hundreds of families find their perfect home in Dubai.', deals: '350+' },
  { name: 'Carla Castillo', title: 'Client Relations Manager', email: 'carla@citiway.com', phone: '+971 52 331 9642', languages: ['English', 'Spanish', 'Filipino'], specialties: ['Property Management', 'Tenant Relations', 'Client Services'], bio: 'Carla oversees all client relationships and property management operations. Her attention to detail and commitment to service excellence ensures every property owner and tenant receives personalized, responsive support.', deals: '150+' },
  { name: 'Mohammed Al-Mansouri', title: 'Commercial & Investment Lead', email: 'mohammed@citiway.com', phone: '+971 52 889 4455', languages: ['Arabic', 'English'], specialties: ['Commercial Leasing', 'Investment Analysis', 'Portfolio Management'], bio: 'Mohammed leads our commercial division and investment advisory practice. With a background in finance and a passion for real estate, he delivers data-driven strategies that consistently outperform market benchmarks.', deals: '120+' },
];

export default function AgentsPage() {
  return (
    <>
      <section className="relative py-32 px-6" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Our Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Meet the <em className="italic text-gradient-gold">Experts</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">Experienced professionals delivering exceptional results across Dubai&apos;s real estate market.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max space-y-8">
          {AGENTS.map((agent, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10 border border-gray-100 hover:border-gold-300 transition-all duration-500">
              <div className="lg:col-span-3">
                <div className="aspect-square flex items-center justify-center text-5xl font-light text-white" style={{ background: '#0e1218', fontFamily: "'Cormorant Garamond', serif" }}>
                  <span className="text-gold-400">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.3em] mb-2">{agent.title}</div>
                <h3 className="text-3xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{agent.name}</h3>
                <p className="text-sm text-ink-600 leading-relaxed mb-5">{agent.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialties.map(s => <span key={s} className="feature-pill text-[10px] tracking-wider uppercase">{s}</span>)}
                </div>
                <div className="text-xs text-ink-500"><span className="font-semibold">Languages:</span> {agent.languages.join(' • ')}</div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-between gap-4">
                <div>
                  <div className="text-center p-5 bg-gray-50">
                    <div className="text-4xl font-light text-gold-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{agent.deals}</div>
                    <div className="text-[10px] text-ink-500 uppercase tracking-[0.2em] mt-1">Deals Closed</div>
                  </div>
                  <div className="space-y-2 mt-4 text-xs">
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-ink-600 hover:text-gold-600 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                      {agent.email}
                    </a>
                    <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-ink-600 hover:text-gold-600 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                      {agent.phone}
                    </a>
                  </div>
                </div>
                <a href={`https://wa.me/${agent.phone.replace(/[\s+]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-[10px] w-full text-center">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
