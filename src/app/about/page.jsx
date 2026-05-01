'use client';
import Link from 'next/link';
import { useReveal, useCounter } from '../../hooks/useReveal';

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

function ValueCard({ icon, title, description, index }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div
      ref={ref}
      className={`group relative bg-white p-8 md:p-10 transition-all duration-1000 hover:shadow-xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms`, borderRadius: '6px', boxShadow: '0 4px 12px rgba(15, 36, 68, 0.06)' }}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #e8f1fb 0%, #bbdefb 100%)' }}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="font-display text-2xl text-navy-900 mb-3 transition-colors duration-500 group-hover:text-blue-600" style={{ fontWeight: 500, letterSpacing: '-0.01em', color: '#0f2444' }}>
        {title}
      </h3>
      <div className="w-10 h-0.5 bg-blue-500 mb-4" style={{ background: '#1e88e5' }} />
      <p className="text-sm leading-relaxed font-light" style={{ color: '#5a6b7c' }}>
        {description}
      </p>
    </div>
  );
}

function TimelineItem({ year, title, description, index, isLast }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} className={`relative flex gap-6 md:gap-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
      {/* Year column */}
      <div className="flex-shrink-0 w-24 md:w-32 text-right">
        <div className="font-display text-3xl md:text-5xl font-light leading-none" style={{ color: '#1e88e5', letterSpacing: '-0.02em' }}>
          {year}
        </div>
      </div>

      {/* Line + dot */}
      <div className="relative flex-shrink-0">
        <div className="w-3 h-3 rounded-full mt-3 ring-4" style={{ background: '#1e88e5', boxShadow: '0 0 0 4px #e8f1fb' }} />
        {!isLast && <div className="absolute top-7 left-1/2 -translate-x-1/2 w-px h-full" style={{ background: 'linear-gradient(180deg, #1e88e5 0%, transparent 100%)', minHeight: '120px' }} />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 md:pb-16">
        <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: '#0f2444', fontWeight: 500 }}>
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#5a6b7c' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function TeamMember({ name, role, image, bio, index }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref} className={`group transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden mb-5 cursor-pointer" style={{ borderRadius: '6px' }}>
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{
          background: 'linear-gradient(180deg, transparent 50%, rgba(15, 36, 68, 0.95) 100%)'
        }}>
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white text-sm leading-relaxed font-light">{bio}</p>
          </div>
        </div>
      </div>
      <h3 className="font-display text-xl mb-1" style={{ color: '#0f2444', fontWeight: 500 }}>
        {name}
      </h3>
      <p className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#1e88e5' }}>
        {role}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [storyRef, storyVisible] = useReveal(0.2);
  const [missionRef, missionVisible] = useReveal(0.2);
  const [statsRef, statsVisible] = useReveal(0.2);

  const stats = [
    { value: 15, suffix: '+', label: 'Years in Dubai' },
    { value: 2500, suffix: '+', label: 'Properties Sold' },
    { value: 50, suffix: '+', label: 'Nationalities Served' },
    { value: 92, suffix: '%', label: 'Client Retention' },
  ];

  const values = [
    { icon: '🎯', title: 'Integrity First', description: 'Every recommendation we make is grounded in transparency. We tell our clients what they need to hear, not what they want to hear — because lasting relationships are built on trust.' },
    { icon: '💎', title: 'Curation Over Volume', description: 'We don\'t chase listings. We hand-select properties that meet our exacting standards for architectural merit, location, and long-term value. Quality over quantity, always.' },
    { icon: '🌍', title: 'Global Perspective', description: 'Our clients hail from over 50 nationalities. This international DNA shapes how we work — bridging cultures, languages, and expectations to deliver truly bespoke service.' },
    { icon: '📊', title: 'Data-Driven Advisory', description: 'Every recommendation is backed by rigorous market analysis. ROI projections, capital appreciation forecasts, comparative pricing — we treat your property as the investment it is.' },
    { icon: '🤝', title: 'Lifelong Partnership', description: 'A property purchase is the beginning, not the end. We measure success in client retention rates, referrals, and decade-long relationships — not transactions.' },
    { icon: '⚡', title: 'Discreet Excellence', description: 'Our highest-value transactions never appear publicly. Off-market deals, private sales, confidential acquisitions — we operate with the discretion our clients deserve.' },
  ];

  const timeline = [
    { year: '2009', title: 'The Foundation', description: 'Citiway is founded in Dubai with a singular mission: redefine what real estate brokerage can mean. From a small office, the first property is sold within weeks.' },
    { year: '2013', title: 'RERA Excellence', description: 'Citiway becomes one of Dubai\'s most-trusted RERA-licensed brokerages, recognized for our commitment to ethical practice and client protection.' },
    { year: '2017', title: 'International Expansion', description: 'Our client base reaches 30+ nationalities. We open dedicated desks for European, GCC, and Asian markets — each with native-speaking advisors.' },
    { year: '2020', title: 'Digital Transformation', description: 'In response to the pandemic, we pioneer immersive virtual property tours and remote advisory services — keeping our international clients connected to Dubai opportunities.' },
    { year: '2023', title: 'AED 2 Billion Milestone', description: 'Cumulative transaction value crosses AED 2 billion. Our portfolio expands into ultra-luxury and off-market private residences.' },
    { year: '2025', title: 'The Next Chapter', description: 'Citiway launches its elite digital experience and dedicated investment advisory division — combining 15+ years of human expertise with technology-led precision.' },
  ];

  const team = [
    {
      name: 'Mohammed Al-Mansouri',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
      bio: 'With over 20 years in Dubai real estate, Mohammed founded Citiway with a vision of redefining client-first brokerage. Today he leads strategy and key client relationships.',
    },
    {
      name: 'Sarah Khalifa',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
      bio: 'Sarah leads our sales team with a focus on luxury residential and off-plan investments. Fluent in Arabic, English, and French, she serves clients across three continents.',
    },
    {
      name: 'James Whitmore',
      role: 'Director of Investment Advisory',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
      bio: 'Former Goldman Sachs analyst turned real estate strategist. James brings institutional-grade financial analysis to our private clients, specializing in portfolio construction.',
    },
    {
      name: 'Layla Hassan',
      role: 'Head of Property Management',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
      bio: 'Layla oversees our 200+ managed properties. Her operations excellence ensures owners enjoy passive income with zero stress — even from across the globe.',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-end overflow-hidden" style={{ marginTop: '-80px' }}>
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
            style={{ filter: 'brightness(0.55) contrast(1.05)' }}
          >
            <source src="https://videos.pexels.com/video-files/19444055/19444055-uhd_2560_1440_60fps.mp4" type="video/mp4" />
          </video>
          {/* Navy gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(15, 36, 68, 0.4) 0%, rgba(15, 36, 68, 0.6) 50%, rgba(10, 22, 40, 0.95) 100%)'
          }} />
        </div>

        <div className="relative z-10 w-full px-5 md:px-12 lg:px-24 pb-16 md:pb-24 pt-32">
          <div className="max-w-[1500px] mx-auto">
            {/* Breadcrumb */}
            <div className={`flex items-center gap-2 text-[11px] tracking-wider mb-8 transition-all duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
              <Link href="/" className="text-white/50 hover:text-white">Home</Link>
              <span className="text-white/30">/</span>
              <span style={{ color: '#90caf9' }}>About Us</span>
            </div>

            <div className={`flex items-center gap-3 mb-6 transition-all duration-1000 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-display text-xl leading-none" style={{ color: '#90caf9' }}>\</span>
              <span className="text-xs font-semibold tracking-[0.4em] uppercase" style={{ color: '#90caf9' }}>
                Our Story
              </span>
            </div>

            <h1 className={`text-white font-display font-light mb-8 max-w-5xl transition-all duration-1200 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.025em'
            }}>
              Building Dubai\'s most<br />
              <em className="italic" style={{
                background: 'linear-gradient(135deg, #90caf9 0%, #4a90e2 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>trusted real estate firm,</em>
              <br />one client at a time.
            </h1>

            <div className={`max-w-2xl transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/75 text-base md:text-lg leading-relaxed font-light">
                Founded in 2009, Citiway has grown from a single Dubai office into one of the city\'s most respected real estate firms — built on relationships, sustained by results, and defined by an unwavering commitment to our clients.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/60">Discover</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full" style={{ background: '#1e88e5', animation: 'scrollLine 2.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* OUR STORY - Editorial */}
      <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white">
        <div ref={storyRef} className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className={`lg:col-span-5 transition-all duration-1200 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: '6px' }}>
                  <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80" alt="Dubai" className="w-full h-full object-cover" />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-8 -right-8 bg-white p-6 md:p-8 shadow-xl hidden md:block" style={{ borderRadius: '6px', boxShadow: '0 25px 50px -12px rgba(15, 36, 68, 0.2)' }}>
                  <div className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: '#1e88e5' }}>
                    Established
                  </div>
                  <div className="font-display text-5xl font-light" style={{ color: '#0f2444' }}>2009</div>
                  <div className="text-sm mt-1" style={{ color: '#5a6b7c' }}>Dubai, UAE</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`lg:col-span-7 transition-all duration-1200 delay-200 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="eyebrow">Our Story</div>
              <h2 className="section-title mb-8">
                More than a brokerage.<br />
                <em className="italic" style={{
                  background: 'linear-gradient(135deg, #4a90e2 0%, #1565c0 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>A trusted partner.</em>
              </h2>

              <div className="space-y-5 editorial-text">
                <p>
                  Citiway was born in 2009 with a simple but ambitious idea: that real estate brokerage in Dubai could be done <strong style={{ color: '#0f2444' }}>differently</strong>. That instead of chasing transactions, we could build relationships. That instead of rushing closings, we could earn trust.
                </p>
                <p>
                  Fifteen years later, that founding vision still shapes everything we do. We have grown — in size, in reach, in reputation — but never strayed from that original belief. Every property we represent, every client we serve, every transaction we facilitate is approached with the same care and precision.
                </p>
                <p>
                  Today, we are proud to serve clients from over 50 nationalities, manage a portfolio worth billions of AED, and partner with Dubai\'s most distinguished developers. But what we are most proud of is something harder to measure: <strong style={{ color: '#0f2444' }}>the relationships we have built</strong>, and the families who continue to come back to us — generation after generation.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/properties" className="btn btn-gold">
                  <span>View Our Portfolio</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
                <Link href="/contact" className="btn btn-outline-gold">
                  <span>Speak to Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS - Animated counters */}
      <section ref={statsRef} className="relative py-20 md:py-28 px-5 md:px-12 lg:px-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #4a90e2 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #1e88e5 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="eyebrow eyebrow-light eyebrow-center">Our Impact</div>
            <h2 className="text-white text-3xl md:text-5xl font-display font-light leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Numbers that <em className="italic" style={{
                background: 'linear-gradient(135deg, #90caf9 0%, #4a90e2 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>tell our story.</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className={`text-center transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="counter-number text-5xl md:text-7xl mb-3" style={{
                  fontWeight: 300,
                  background: 'linear-gradient(135deg, #90caf9 0%, #4a90e2 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {statsVisible && <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="w-12 h-px mx-auto mb-3" style={{ background: '#1e88e5' }} />
                <div className="text-white/70 text-sm font-medium tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section ref={missionRef} className="py-20 md:py-32 px-5 md:px-12 lg:px-24" style={{ background: '#f4f8fd' }}>
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className={`bg-white p-10 md:p-14 transition-all duration-1000 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ borderRadius: '6px', boxShadow: '0 4px 20px rgba(15, 36, 68, 0.05)' }}>
              <div className="font-display text-7xl mb-6" style={{ color: '#bbdefb', lineHeight: 1, fontWeight: 300 }}>01</div>
              <div className="eyebrow">Our Mission</div>
              <h3 className="font-display text-3xl md:text-4xl mb-6" style={{ color: '#0f2444', fontWeight: 400, letterSpacing: '-0.01em' }}>
                To be the bridge between<br />
                <em className="italic" style={{ color: '#1e88e5' }}>ambition and address.</em>
              </h3>
              <p className="editorial-text">
                We exist to help our clients find their place in Dubai — whether that\'s a family home, an investment vehicle, or a piece of legacy. Through expertise, integrity, and personal care, we make this complex city navigable, and its opportunities accessible.
              </p>
            </div>

            {/* Vision */}
            <div className={`p-10 md:p-14 text-white transition-all duration-1000 delay-200 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)', borderRadius: '6px' }}>
              <div className="font-display text-7xl mb-6 text-white/30" style={{ lineHeight: 1, fontWeight: 300 }}>02</div>
              <div className="text-xs font-semibold tracking-[0.35em] uppercase text-white/80 mb-4">
                / Our Vision
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-6" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>
                To redefine what real estate<br />
                <em className="italic">brokerage can be.</em>
              </h3>
              <p className="text-white/85 leading-relaxed font-light">
                We envision a future where buying property is no longer transactional, but transformational. Where brokers are not salespeople, but trusted advisors. Where every client interaction adds value — long after the keys are handed over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div className="eyebrow eyebrow-center">What Drives Us</div>
            <h2 className="section-title">
              The principles that <em className="italic" style={{
                background: 'linear-gradient(135deg, #4a90e2 0%, #1565c0 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>shape our work.</em>
            </h2>
            <p className="editorial-text max-w-2xl mx-auto mt-6">
              Six values. One standard. These aren\'t marketing slogans — they\'re the actual rules we live by, in every meeting, every transaction, every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <ValueCard key={i} {...value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY - Timeline */}
      <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24" style={{ background: '#f4f8fd' }}>
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-6">
              <div className="eyebrow">Our Journey</div>
              <h2 className="section-title mb-0">
                15 years of <em className="italic" style={{
                  background: 'linear-gradient(135deg, #4a90e2 0%, #1565c0 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>milestones.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="editorial-text">
                From a single office in 2009 to one of Dubai\'s most respected real estate firms — every milestone has been earned, never given. Here is our story, year by year.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, i) => (
              <TimelineItem key={i} {...item} index={i} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-white">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="lg:col-span-6">
              <div className="eyebrow">The Team</div>
              <h2 className="section-title mb-0">
                People who make <em className="italic" style={{
                  background: 'linear-gradient(135deg, #4a90e2 0%, #1565c0 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>the difference.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="editorial-text">
                Behind every successful transaction is a team that cares deeply about getting it right. Meet the leadership shaping Citiway today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <TeamMember key={i} {...member} index={i} />
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/agents" className="btn btn-outline-gold">
              <span>Meet the Full Team</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-20 md:py-28 px-5 md:px-12 lg:px-24" style={{ background: '#f4f8fd' }}>
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow eyebrow-center">Trust & Compliance</div>
            <h2 className="section-title">Certified. Licensed. <em className="italic" style={{
              background: 'linear-gradient(135deg, #4a90e2 0%, #1565c0 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Trusted.</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { title: 'RERA Licensed', desc: 'Real Estate Regulatory Agency — fully compliant since 2009' },
              { title: 'DLD Registered', desc: 'Dubai Land Department certified brokerage' },
              { title: 'BRN Certified', desc: 'All agents hold valid Broker Registration Numbers' },
              { title: 'Anti-Money Laundering', desc: 'Full AML compliance and KYC procedures' },
            ].map((cert, i) => (
              <div key={i} className="bg-white p-6 md:p-8 text-center" style={{ borderRadius: '6px', boxShadow: '0 4px 12px rgba(15, 36, 68, 0.04)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #e8f1fb 0%, #bbdefb 100%)' }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1e88e5' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg mb-2" style={{ color: '#0f2444', fontWeight: 500 }}>{cert.title}</h3>
                <p className="text-xs leading-relaxed font-light" style={{ color: '#5a6b7c' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 lg:px-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, #1e88e5 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-[1500px] mx-auto text-center">
          <div className="eyebrow eyebrow-light eyebrow-center">Begin Your Journey</div>
          <h2 className="text-white font-display font-light mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Ready to write the<br />
            <em className="italic" style={{
              background: 'linear-gradient(135deg, #90caf9 0%, #4a90e2 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>next chapter with us?</em>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 mb-10 font-light leading-relaxed">
            Whether you\'re looking to buy, sell, rent, or invest — let\'s have a conversation. No pressure, no commitment. Just expert guidance from a team that genuinely cares.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">
              <span>Schedule a Consultation</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
