'use client';
import { useReveal, useCounter } from '../hooks/useReveal';

function AnimatedNumber({ value, suffix = '', prefix = '' }) {
  const [ref, count] = useCounter(value, 2500);
  const isDecimal = value % 1 !== 0;
  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} className="inline-block">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function AnimatedStats() {
  const [ref, visible] = useReveal(0.2);

  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Curated Listings',
      description: 'Properties handpicked for distinction',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Trusted by Dubai since 2009',
    },
    {
      value: 10000,
      suffix: '+',
      label: 'Trusted Clients',
      description: 'From 50+ nationalities globally',
    },
    {
      value: 2,
      suffix: 'B+',
      prefix: 'AED ',
      label: 'Transacted Value',
      description: 'In luxury real estate deals',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-5 md:px-12 lg:px-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #4a90e2 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #1e88e5 0%, transparent 70%)' }} />
      </div>

      {/* Decorative animated circle */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 hidden lg:block opacity-20">
        <svg viewBox="0 0 200 200" className="animate-spin-slow w-full h-full">
          <defs>
            <path id="circle-text" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          </defs>
          <text fill="#90caf9" fontSize="9" letterSpacing="6">
            <textPath href="#circle-text">
              CITIWAY · LUXURY · REAL ESTATE · DUBAI · CITIWAY · LUXURY · REAL ESTATE · DUBAI ·
            </textPath>
          </text>
        </svg>
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <div className={`max-w-3xl mb-16 md:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="eyebrow eyebrow-light">By the Numbers</div>
          <h2 className="text-white text-4xl md:text-6xl font-display font-light leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
            Built on Trust.<br />
            <em className="italic text-gradient-gold">Proven by Numbers.</em>
          </h2>
          <p className="editorial-text-light max-w-xl">
            Every metric tells a story of relationships built, ambitions realized, and the quiet excellence that has made Citiway Dubai\'s most respected real estate firm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Number */}
              <div className="counter-number text-5xl md:text-7xl text-gradient-gold mb-3" style={{ fontWeight: 300 }}>
                {visible && <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />}
              </div>

              {/* Gold line */}
              <div className="w-12 h-px bg-gold-400 mb-4" />

              {/* Label */}
              <div className="text-white text-lg font-medium mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-white/50 text-sm leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
