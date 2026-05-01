'use client';
import { useReveal } from '../hooks/useReveal';

const pillars = [
  {
    number: '01',
    title: 'Curation Over Volume',
    description: 'We do not chase listings. We hand-select properties that meet our standards for architectural merit, location, and long-term value. Quality over quantity. Always.',
  },
  {
    number: '02',
    title: 'Discreet Excellence',
    description: 'Our highest-value transactions never appear publicly. Off-market deals, private sales, and confidential acquisitions — we operate with the discretion our clients deserve.',
  },
  {
    number: '03',
    title: 'Local Roots, Global Reach',
    description: 'Founded in Dubai. Connected globally. We serve clients from over 50 nationalities, bridging cultures and continents to find them their perfect Dubai address.',
  },
  {
    number: '04',
    title: 'Beyond the Transaction',
    description: 'A property purchase is the beginning, not the end. From relocation logistics to interior design, school admissions to lifestyle introductions — we open doors long after the sale.',
  },
  {
    number: '05',
    title: 'Investment-First Thinking',
    description: 'Every recommendation is backed by data. ROI projections, capital appreciation forecasts, rental yield analysis — we treat your property as the investment it truly is.',
  },
  {
    number: '06',
    title: 'Long-Term Partnership',
    description: 'We measure success by client retention, not commissions. Our greatest source of business is referrals from clients who have come back to us for their second, third, and fourth properties.',
  },
];

function PillarCard({ pillar, index }) {
  const [ref, visible] = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`relative group cursor-luxury transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="border-t border-white/10 pt-8 transition-colors duration-500 group-hover:border-gold-400">
        <div className="flex items-start justify-between mb-6">
          <span className="font-display text-5xl text-gold-300/50 group-hover:text-gold-300 transition-colors duration-500" style={{ fontWeight: 300 }}>
            {pillar.number}
          </span>
          <svg className="w-5 h-5 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-500 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </div>
        <h3 className="text-white text-2xl font-display font-light mb-4 group-hover:text-gold-300 transition-colors duration-500" style={{ letterSpacing: '-0.01em' }}>
          {pillar.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed font-light">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #4a90e2 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className={`lg:col-span-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="eyebrow eyebrow-light">Why Citiway</div>
            <h2 className="text-white text-4xl md:text-6xl font-display font-light leading-none" style={{ letterSpacing: '-0.025em' }}>
              Six Pillars.<br />
              <em className="italic text-gradient-gold">One Standard.</em>
            </h2>
          </div>
          <div className={`lg:col-span-5 lg:col-start-8 transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="editorial-text-light">
              In a city of thousands of brokerages, what makes Citiway different is not what we do, but how we do it. These are the principles that shape every interaction, every recommendation, every transaction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
