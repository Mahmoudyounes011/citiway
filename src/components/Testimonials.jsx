'use client';
import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    quote: 'Citiway didn\'t sell us a property — they helped us find a home. Their understanding of what mattered to our family was extraordinary. Three years on, we are still in touch.',
    name: 'Mr. Alexander Chen',
    role: 'Tech Entrepreneur',
    location: 'Singapore → Palm Jumeirah',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  },
  {
    quote: 'I have purchased six properties through Citiway over the past eight years. The level of advisory, market intelligence, and post-sale care is incomparable. They are not brokers — they are partners.',
    name: 'Mrs. Layla Al-Rashid',
    role: 'Investor',
    location: 'Riyadh → Multiple Holdings',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    quote: 'Their off-market network gave us access to a Burj Khalifa unit that wasn\'t even on the market. The negotiation, the documentation, the handover — handled with quiet excellence.',
    name: 'Mr. James Whitmore',
    role: 'Hedge Fund Director',
    location: 'London → Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal(0.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[active];

  return (
    <section ref={ref} className="py-20 md:py-32 px-5 md:px-12 lg:px-24 relative overflow-hidden" style={{ background: '#f4f8fd' }}>
      {/* Decorative quote mark */}
      <div className="absolute top-12 left-12 font-display text-[20rem] leading-none pointer-events-none hidden md:block" style={{ fontWeight: 300, color: '#bbdefb' }}>
        "
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="eyebrow eyebrow-center">Client Stories</div>
          <h2 className="section-title">
            Words from <em className="italic text-gradient-gold">Those We Serve</em>
          </h2>
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto text-center">
          <div key={active} className="animate-fade-in">
            <p className="font-display text-2xl md:text-4xl lg:text-5xl text-ink leading-snug mb-10 md:mb-12 italic" style={{ fontWeight: 300, letterSpacing: '-0.01em' }}>
              "{current.quote}"
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400">
                <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-xl text-ink font-medium">{current.name}</div>
                <div className="text-sm text-ink-700 mt-1">{current.role}</div>
                <div className="text-xs text-gold-600 tracking-[0.2em] uppercase mt-2 font-semibold">{current.location}</div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-px transition-all duration-500 ${
                  i === active ? 'w-12 bg-gold-500' : 'w-6 bg-ink-300 hover:bg-ink-400'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
