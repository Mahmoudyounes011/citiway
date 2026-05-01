'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReveal } from '../hooks/useReveal';

const NEIGHBORHOODS = [
  {
    label: 'Downtown',
    title: 'The Heart',
    tagline: 'iconic · vibrant · prestigious',
    description: 'The crown jewel of modern Dubai. Where Burj Khalifa kisses the sky, where Dubai Mall pulses with energy, and where every address carries the weight of legacy. Downtown Dubai is not just a location — it is a statement.',
    video: 'https://videos.pexels.com/video-files/19444055/19444055-uhd_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85',
    stats: [
      { num: '12+', label: 'Active Listings' },
      { num: 'AED 2M+', label: 'Starting From' },
      { num: '8-10%', label: 'Annual ROI' },
    ],
    href: '/properties?location=Downtown%20Dubai',
  },
  {
    label: 'The Marina',
    title: 'Coastal Living',
    tagline: 'social · waterfront · cosmopolitan',
    description: 'A city within a city. Dubai Marina pulses with life — yacht-lined promenades, towering residences, and cafés where the world\'s elite gather. Live where the water meets ambition.',
    video: 'https://videos.pexels.com/video-files/31676973/13495681_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=85',
    stats: [
      { num: '18+', label: 'Active Listings' },
      { num: 'AED 1.2M+', label: 'Starting From' },
      { num: '7-9%', label: 'Annual ROI' },
    ],
    href: '/properties?location=Dubai%20Marina',
  },
  {
    label: 'The Palm',
    title: 'Iconic Address',
    tagline: 'exclusive · serene · distinguished',
    description: 'The world\'s most photographed coastline. Palm Jumeirah is more than an island — it is the pinnacle of Dubai luxury. Where private beaches meet curated communities, and every villa tells a story of arrival.',
    video: 'https://videos.pexels.com/video-files/10593888/10593888-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=85',
    stats: [
      { num: '8+', label: 'Active Listings' },
      { num: 'AED 8M+', label: 'Starting From' },
      { num: '6-8%', label: 'Annual ROI' },
    ],
    href: '/properties?location=Palm%20Jumeirah',
  },
  {
    label: 'Creek Harbour',
    title: 'New Horizon',
    tagline: 'emerging · curated · visionary',
    description: 'Dubai\'s newest masterpiece. Creek Harbour is rising from the waterfront with breathtaking views of the city\'s skyline. The home of Dubai Creek Tower — soon to claim the title of world\'s tallest. Be part of the future.',
    video: 'https://videos.pexels.com/video-files/18073365/18073365-uhd_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=85',
    stats: [
      { num: '15+', label: 'Off-Plan Projects' },
      { num: 'AED 1.5M+', label: 'Starting From' },
      { num: '9-12%', label: 'Annual ROI' },
    ],
    href: '/properties?location=Dubai%20Creek%20Harbour',
  },
];

function NeighborhoodSection({ data, index }) {
  const [ref, visible] = useReveal(0.15);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Start loading video immediately on mount, not on visible
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // Play when visible
  useEffect(() => {
    if (visible && videoRef.current && videoLoaded) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible, videoLoaded]);

  return (
    <section ref={ref} className="cinematic-section">
      {/* Poster fallback - only visible while video loads */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{
          backgroundImage: `url(${data.poster})`,
          opacity: videoLoaded && !videoFailed ? 0 : 1,
          transition: 'opacity 0.8s ease',
          zIndex: 0,
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        onError={() => setVideoFailed(true)}
        className="bg-video"
        style={{
          opacity: videoLoaded && !videoFailed ? 1 : 0,
          transition: 'opacity 1.2s ease',
          zIndex: 0,
        }}
      >
        <source src={data.video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay" />

      {/* Side index number */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-10">
        <div className="text-gold-300 font-display font-light text-7xl md:text-9xl leading-none opacity-30">
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="content max-w-[1500px] mx-auto px-5 md:px-12 lg:px-24 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            {/* Label */}
            <div className={`mb-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="cinematic-label">
                {data.label}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`text-white mb-4 transition-all duration-1200 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
              }}
            >
              {data.title}
            </h2>

            {/* Tagline */}
            <div className={`flex items-center gap-3 mb-8 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-gold-400 font-display text-xl">\</span>
              <span className="text-gold-300 text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
                {data.tagline}
              </span>
            </div>

            {/* Description */}
            <p className={`editorial-text-light max-w-xl mb-8 md:mb-12 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {data.description}
            </p>

            {/* CTA */}
            <div className={`transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link href={data.href} className="btn btn-outline-gold">
                <span>Explore {data.label}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>

          {/* Stats column */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-0 lg:divide-y lg:divide-white/10">
              {data.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`lg:py-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${800 + i * 150}ms` }}
                >
                  <div className="counter-number text-3xl md:text-5xl text-gold-300 mb-1">
                    {stat.num}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CinematicSections() {
  return (
    <>
      {/* Section intro/divider */}
      <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto text-center">
          <div className="eyebrow eyebrow-center">A Tour of Dubai</div>
          <h2 className="section-title mb-6">
            Live Among the <em className="italic text-gradient-gold">Iconic</em>
          </h2>
          <p className="editorial-text max-w-2xl mx-auto">
            Each address tells a different story. From the towering ambition of Downtown to the serene exclusivity of The Palm — discover the neighbourhoods that define modern Dubai luxury.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 text-gold-600">
              <span className="font-display text-2xl leading-none">\</span>
              <span className="text-[11px] tracking-[0.4em] uppercase font-semibold">Scroll to discover</span>
              <span className="font-display text-2xl leading-none">\</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Neighborhood Sections */}
      {NEIGHBORHOODS.map((n, i) => (
        <NeighborhoodSection key={n.label} data={n} index={i} />
      ))}
    </>
  );
}
