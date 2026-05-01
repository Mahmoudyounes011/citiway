'use client';
import Link from 'next/link';
import { developers } from '../data/developers';
import { useReveal } from '../hooks/useReveal';

export default function DevelopersMarquee() {
  const [ref, visible] = useReveal(0.2);

  // Duplicate for seamless loop
  const allDevs = [...developers, ...developers];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white border-y border-ink-100 overflow-hidden">
      <div className="px-5 md:px-12 lg:px-24 mb-12">
        <div className={`max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div>
            <div className="eyebrow">Trusted Partners</div>
            <h2 className="section-title">
              We Work with <em className="italic text-gradient-gold">The Best</em>
            </h2>
          </div>
          <Link href="/developers" className="btn btn-outline-gold">
            <span>Browse All Developers</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="marquee-track animate-marquee">
          {allDevs.map((dev, i) => (
            <Link
              key={`${dev.slug}-${i}`}
              href={`/developers/${dev.slug}`}
              className="flex-shrink-0 group flex items-center justify-center w-64 md:w-80"
            >
              <div className="text-center px-8 py-4 transition-all duration-500 group-hover:scale-105">
                <div
                  className="font-display text-3xl md:text-4xl text-ink-700 group-hover:text-gold-600 transition-colors duration-500 whitespace-nowrap"
                  style={{ fontWeight: 300, letterSpacing: '0.05em' }}
                >
                  {dev.name}
                </div>
                <div className="w-12 h-px bg-gold-300 mx-auto mt-3 transition-all duration-500 group-hover:w-20 group-hover:bg-gold-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
