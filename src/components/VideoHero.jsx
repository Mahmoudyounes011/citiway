'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const VIDEO_PLAYLIST = [
  {
    // Luxury Yacht by Dubai Waterfront Panorama - cinematic Dubai Marina
    src: 'https://videos.pexels.com/video-files/31676969/13495693_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=85',
    label: 'Marina Living',
    subtitle: 'Where waters meet ambition'
  },
  {
    // Aerial View of Dubai City - iconic skyline
    src: 'https://videos.pexels.com/video-files/19444055/19444055-uhd_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85',
    label: 'Iconic Skyline',
    subtitle: 'The crown of modern luxury'
  },
  {
    // Jet Skiing Jumeirah Beach Residence - lifestyle
    src: 'https://videos.pexels.com/video-files/10593888/10593888-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=85',
    label: 'Beach Lifestyle',
    subtitle: 'A life by the water'
  },
  {
    // World Island Dubai - exclusive luxury
    src: 'https://videos.pexels.com/video-files/18073365/18073365-uhd_2560_1440_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=85',
    label: 'Exclusive Living',
    subtitle: 'Where legacy is built'
  },
];

export default function VideoHero() {
  const [searchTab, setSearchTab] = useState('buy');
  const [loaded, setLoaded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  // Track which videos have loaded at least once
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const VIDEO_DURATION = 9000;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % VIDEO_PLAYLIST.length);
    }, VIDEO_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / VIDEO_DURATION) * 100, 100);
      setProgress(newProgress);
    }, 50);
    return () => clearInterval(tick);
  }, [currentVideo]);

  const current = VIDEO_PLAYLIST[currentVideo];
  const currentLoaded = loadedVideos.has(currentVideo);

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-ink-950" style={{ marginTop: '-80px' }}>
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Poster Fallback - only visible until first load */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(${current.poster})`,
            filter: 'brightness(0.65) contrast(1.05)',
            opacity: currentLoaded ? 0 : 1,
            transition: 'opacity 0.8s ease',
            zIndex: 1,
          }}
        />

        {/* ALL videos rendered, only current one visible - they preload in background */}
        {VIDEO_PLAYLIST.map((vid, idx) => (
          <video
            key={vid.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => {
              setLoadedVideos((prev) => new Set([...prev, idx]));
            }}
            onCanPlay={() => {
              setLoadedVideos((prev) => new Set([...prev, idx]));
            }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.6) contrast(1.05)',
              opacity: idx === currentVideo && loadedVideos.has(idx) ? 1 : 0,
              transition: 'opacity 1.2s ease',
              zIndex: idx === currentVideo ? 2 : 1,
            }}
          >
            <source src={vid.src} type="video/mp4" />
          </video>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(15, 36, 68, 0.4) 0%, rgba(15, 36, 68, 0.35) 35%, rgba(10, 22, 40, 0.95) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 25% 50%, rgba(74, 144, 226, 0.18) 0%, transparent 50%)'
        }} />

        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 22, 40, 0.5) 100%)'
        }} />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }} />
      </div>

      {/* Side Vertical Label - Palm Jebel Ali style */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        <div className="vertical-text text-white/60">
          Citiway Real Estate · Est. 2009
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-gold-400 to-transparent" />
      </div>

      {/* Right Side Video Indicator */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {VIDEO_PLAYLIST.map((v, i) => (
          <button
            key={i}
            onClick={() => setCurrentVideo(i)}
            className="group flex items-center gap-3 transition-all duration-500"
            aria-label={v.label}
          >
            <div className={`text-right transition-all duration-500 ${i === currentVideo ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/80 font-semibold">
                {v.label}
              </div>
            </div>
            <div className="relative w-12 h-px bg-white/20 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gold-400 transition-all duration-100"
                style={{ width: i === currentVideo ? `${progress}%` : i < currentVideo ? '100%' : '0%' }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="md:hidden absolute top-[100px] left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {VIDEO_PLAYLIST.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 transition-all duration-500 ${
              i === currentVideo ? 'w-8 bg-gold-400' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-12 md:pb-20 px-5 md:px-12 lg:px-24">
        <div className="max-w-[1500px] mx-auto w-full">
          {/* Top Caption */}
          <div className={`mb-8 md:mb-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={`flex items-center gap-3 mb-4 md:mb-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-gold-400 font-display text-lg leading-none">\</span>
              <span className="text-gold-300 text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase">
                Curated · Considered · Crafted
              </span>
            </div>

            {/* Hero Title */}
            <h1
              className="text-white mb-6 md:mb-8 max-w-6xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
              }}
            >
              <span className={`block transition-all duration-1200 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                Where Ambition
              </span>
              <span className={`block transition-all duration-1200 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <em className="italic font-light text-gradient-gold">Finds Its</em> Address
              </span>
            </h1>

            {/* Editorial subtitle */}
            <div className={`max-w-xl transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="editorial-text-light text-sm md:text-base">
                A new standard in Dubai real estate — curated luxury properties, expert consultation, and bespoke management services crafted for the discerning few.
              </p>
            </div>

            {/* Buttons */}
            <div className={`flex flex-wrap gap-4 mt-8 md:mt-10 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link href="/properties" className="btn btn-gold">
                <span>Discover Portfolio</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link href="/services/consultation" className="btn btn-ghost">
                <span>Book Private Consultation</span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`glass-search transition-all duration-1200 delay-1200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex border-b border-white/10 overflow-x-auto">
              {['buy', 'rent', 'off-plan'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSearchTab(tab)}
                  className={`flex-1 md:flex-none px-6 md:px-10 py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 relative whitespace-nowrap ${
                    searchTab === tab ? 'text-gold-400' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab === 'off-plan' ? 'Off-Plan' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {searchTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-gold-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 md:p-5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                <select className="form-select-glass text-xs col-span-2 md:col-span-1">
                  <option value="" className="bg-ink-900">Property Type</option>
                  <option className="bg-ink-900">Apartment</option>
                  <option className="bg-ink-900">Villa</option>
                  <option className="bg-ink-900">Townhouse</option>
                  <option className="bg-ink-900">Penthouse</option>
                </select>
                <select className="form-select-glass text-xs col-span-2 md:col-span-1">
                  <option value="" className="bg-ink-900">Location</option>
                  <option className="bg-ink-900">Downtown Dubai</option>
                  <option className="bg-ink-900">Dubai Marina</option>
                  <option className="bg-ink-900">Palm Jumeirah</option>
                  <option className="bg-ink-900">Emirates Hills</option>
                  <option className="bg-ink-900">Dubai Creek Harbour</option>
                </select>
                <select className="form-select-glass text-xs">
                  <option value="" className="bg-ink-900">Bedrooms</option>
                  <option className="bg-ink-900">Studio</option>
                  <option className="bg-ink-900">1 BR</option>
                  <option className="bg-ink-900">2 BR</option>
                  <option className="bg-ink-900">3 BR</option>
                  <option className="bg-ink-900">4+ BR</option>
                </select>
                <select className="form-select-glass text-xs">
                  <option value="" className="bg-ink-900">Price</option>
                  <option className="bg-ink-900">Under 1M</option>
                  <option className="bg-ink-900">1M - 3M</option>
                  <option className="bg-ink-900">3M - 5M</option>
                  <option className="bg-ink-900">5M - 10M</option>
                  <option className="bg-ink-900">10M+</option>
                </select>
                <Link href="/properties" className="btn btn-gold text-[10px] h-full col-span-2 md:col-span-1 flex items-center justify-center gap-2 px-4">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <span>Search</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hidden md:flex flex-col items-center gap-3 z-10">
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full bg-gold-400 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
