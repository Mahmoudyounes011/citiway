import Link from 'next/link';

const POSTS = [
  { id: 1, title: 'Dubai Real Estate Market Report: Q1 2025 Insights', category: 'Market Reports', date: 'March 15, 2025', readTime: '8 min', excerpt: 'An in-depth analysis of Dubai property market performance in Q1 2025, covering transaction volumes, price movements across key communities, and forecasts for the year ahead.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80' },
  { id: 2, title: 'Complete Guide to Buying Property in Dubai as a Foreigner', category: 'Buyer Guides', date: 'March 8, 2025', readTime: '12 min', excerpt: 'Everything you need to know about purchasing property in Dubai as a non-resident, including freehold zones, legal requirements, mortgage options, and residency visa benefits.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80' },
  { id: 3, title: 'Top 10 Off-Plan Projects for 2025 Investment', category: 'Investment', date: 'February 28, 2025', readTime: '10 min', excerpt: 'Our analysts highlight the most promising off-plan developments for investors, examining developer track records, payment plans, projected ROI, and community infrastructure.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80' },
  { id: 4, title: 'Understanding Dubai Tenancy Law', category: 'Legal', date: 'February 15, 2025', readTime: '7 min', excerpt: 'A comprehensive overview of RERA tenancy regulations, including lease agreements, rent increases, eviction procedures, and dispute resolution through RDC.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80' },
  { id: 5, title: 'Maximizing Your Rental Yield: Management Strategies', category: 'Management', date: 'February 5, 2025', readTime: '6 min', excerpt: 'Expert strategies for optimizing rental income, including pricing techniques, tenant retention, maintenance planning, and choosing the right management partner.', image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80' },
  { id: 6, title: 'Golden Visa Through Real Estate: Complete Guide', category: 'Investment', date: 'January 20, 2025', readTime: '9 min', excerpt: 'How to qualify for a UAE Golden Visa through property investment, including minimum thresholds, eligible properties, application process, and family sponsorship.', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80' },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative py-32 px-6" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Market Insights</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Market <em className="italic text-gradient-gold">Insights</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">Expert analysis, reports, and guides to help you navigate Dubai&apos;s property market with confidence.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            <div className="overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: '#caa244', color: '#0e1218' }}>{POSTS[0].category}</span>
                <span className="text-xs text-ink-500">{POSTS[0].date}</span>
                <span className="text-xs text-ink-400">{POSTS[0].readTime} read</span>
              </div>
              <h2 className="text-4xl font-light text-ink-900 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{POSTS[0].title}</h2>
              <p className="text-ink-600 leading-relaxed mb-6">{POSTS[0].excerpt}</p>
              <button className="btn btn-dark self-start">Read Full Report</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.slice(1).map(post => (
              <article key={post.id} className="group cursor-pointer hover-lift">
                <div className="aspect-video overflow-hidden mb-5">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gold-600 font-semibold">{post.category}</span>
                  <span className="text-[10px] text-ink-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-light text-ink-900 mb-3 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{post.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="text-[10px] text-ink-400">{post.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
