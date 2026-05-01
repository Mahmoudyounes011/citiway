'use client';
import Link from 'next/link';
import { useReveal } from '../hooks/useReveal';

const services = [
  {
    number: '01',
    label: 'Acquisition',
    title: 'Property Consultation',
    description: 'Deep-market intelligence meets personal advisory. Our consultants help you navigate Dubai\'s nuanced market with clarity, guiding you toward acquisitions that align with both lifestyle and investment goals.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    href: '/services/consultation',
    features: ['Market Analysis', 'Investment Strategy', 'Off-Market Access', 'Visa Guidance'],
  },
  {
    number: '02',
    label: 'Stewardship',
    title: 'Property Management',
    description: 'Your asset, expertly cared for. From short-term rentals to long-term tenancies, our management services preserve and enhance the value of your property — letting you enjoy ownership without the operational burden.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    href: '/services/management',
    features: ['Tenant Sourcing', 'Maintenance', 'Financial Reporting', 'Holiday Lets'],
  },
  {
    number: '03',
    label: 'Disposition',
    title: 'Sell Your Property',
    description: 'Maximize value through strategic positioning. Our sales team combines bespoke marketing, qualified buyer networks, and expert negotiation to ensure your property is sold for its true worth — and quickly.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    href: '/services/sell',
    features: ['Premium Marketing', 'Valuation', 'Buyer Network', 'Negotiation'],
  },
];

function ServiceCard({ service, index, isReversed }) {
  const [ref, visible] = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}
    >
      {/* Image */}
      <div className={`lg:col-span-7 [direction:ltr] transition-all duration-1200 ${visible ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? 'translate-x-12' : '-translate-x-12'}`}`}>
        <div className="relative aspect-[4/3] overflow-hidden group">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-ink-950/10 group-hover:bg-ink-950/0 transition-colors duration-700" />

          {/* Big number overlay */}
          <div className="absolute top-6 left-6 text-white/30 font-display font-light text-7xl md:text-8xl leading-none">
            {service.number}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 [direction:ltr] transition-all duration-1200 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="eyebrow">{service.label}</div>

        <h3 className="font-display font-light text-4xl md:text-5xl mb-6 text-ink" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          {service.title}
        </h3>

        <div className="gold-line-h" />

        <p className="editorial-text mb-8">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="space-y-3 mb-10">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-gold-500 font-display text-base leading-none">\</span>
              <span className="text-sm text-ink-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={service.href} className="btn btn-dark">
          <span>Discover {service.label}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </Link>
      </div>
    </div>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[1500px] mx-auto">
        <div ref={headerRef} className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="eyebrow eyebrow-center">Services</div>
          <h2 className="section-title">
            Beyond Brokerage. <em className="italic text-gradient-gold">A Partnership.</em>
          </h2>
          <p className="editorial-text max-w-2xl mx-auto mt-6">
            From the first conversation to long after the keys are handed over, our service is designed to be quietly excellent — present when needed, invisible when not.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isReversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
