'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled;

  // Mega menu data with image previews (Meraas style)
  const buyMenu = {
    sections: [
      {
        title: 'Browse by Type',
        links: [
          { label: 'All Properties for Sale', href: '/properties' },
          { label: 'Apartments', href: '/properties?type=apartment' },
          { label: 'Villas', href: '/properties?type=villa' },
          { label: 'Townhouses', href: '/properties?type=townhouse' },
          { label: 'Penthouses', href: '/properties?type=penthouse' },
        ],
      },
    ],
    featured: [
      { label: 'Downtown Penthouses', sublabel: 'Iconic', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', href: '/properties?location=Downtown%20Dubai' },
      { label: 'Palm Villas', sublabel: 'Exclusive', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', href: '/properties?location=Palm%20Jumeirah' },
      { label: 'Marina Living', sublabel: 'Waterfront', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80', href: '/properties?location=Dubai%20Marina' },
    ],
  };

  const offPlanMenu = {
    sections: [
      {
        title: 'Quick Links',
        links: [
          { label: 'All Off-Plan Projects', href: '/off-plan' },
          { label: 'New Launches', href: '/off-plan?status=new' },
          { label: 'High ROI Projects', href: '/off-plan?sort=roi' },
          { label: 'Ready 2025-2026', href: '/off-plan?completion=2025' },
          { label: 'Payment Plans', href: '/off-plan' },
        ],
      },
    ],
    featured: [
      { label: 'Creek Harbour', sublabel: 'New Vision', image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=400&q=80', href: '/properties?location=Dubai%20Creek%20Harbour' },
      { label: 'Palm Jebel Ali', sublabel: 'Returning Icon', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80', href: '/off-plan' },
      { label: 'MBR City', sublabel: 'Master Plan', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', href: '/off-plan' },
    ],
  };

  const developersMenu = {
    sections: [
      {
        title: 'Top Developers',
        links: [
          { label: 'All Developers', href: '/developers' },
          { label: 'Emaar Properties', href: '/developers/emaar-properties' },
          { label: 'Damac Properties', href: '/developers/damac-properties' },
          { label: 'Nakheel', href: '/developers/nakheel' },
          { label: 'Sobha Realty', href: '/developers/sobha-realty' },
        ],
      },
    ],
    featured: [
      { label: 'Emaar', sublabel: 'Iconic Builder', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', href: '/developers/emaar-properties' },
      { label: 'Damac', sublabel: 'Branded Luxury', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', href: '/developers/damac-properties' },
      { label: 'Meraas', sublabel: 'Curated Living', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', href: '/developers/meraas' },
    ],
  };

  const servicesMenu = {
    sections: [
      {
        title: 'Our Services',
        links: [
          { label: 'Property Consultation', href: '/services/consultation' },
          { label: 'Property Management', href: '/services/management' },
          { label: 'Sell Your Property', href: '/services/sell' },
          { label: 'Investment Advisory', href: '/services/consultation' },
        ],
      },
    ],
    featured: [
      { label: 'Consultation', sublabel: 'Strategy', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', href: '/services/consultation' },
      { label: 'Management', sublabel: 'Stewardship', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', href: '/services/management' },
      { label: 'Sell', sublabel: 'Disposition', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', href: '/services/sell' },
    ],
  };

  const nav = [
    { label: 'Buy', href: '/properties', mega: buyMenu },
    { label: 'Rent', href: '/rent' },
    { label: 'Off-Plan', href: '/off-plan', mega: offPlanMenu },
    { label: 'Developers', href: '/developers', mega: developersMenu },
    { label: 'Services', href: '/services/consultation', mega: servicesMenu },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block text-white py-2.5 px-6" style={{ background: '#0a1628' }}>
        <div className="max-w-[1500px] mx-auto flex justify-between items-center text-[10px] tracking-[0.15em] uppercase font-medium">
          <div className="flex gap-8 text-white/60">
            <span className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              +971 4 277 2373
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@citiway.com
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/60">
            <span className="text-gold-400 text-[10px] tracking-[0.3em] font-semibold">RERA Licensed</span>
            <span className="text-white/20">|</span>
            <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-[1500px] mx-auto px-5 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src={transparent ? '/logo-white.png' : '/logo.png'}
                alt="Citiway Real Estate"
                className="h-10 md:h-12 w-auto transition-all duration-500"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {nav.map((item) => (
                <div key={item.label} className="nav-item relative">
                  <Link
                    href={item.href}
                    className={`nav-link ${transparent ? 'text-white/90 hover:text-gold-300' : 'text-ink-800 hover:text-gold-600'}`}
                  >
                    {item.label}
                    {item.mega && (
                      <svg className="w-2.5 h-2.5 ml-1 inline-block opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    )}
                  </Link>

                  {/* MEGA MENU */}
                  {item.mega && (
                    <div className="mega-menu">
                      <div className="mega-menu-grid">
                        {/* Links column */}
                        <div className="col-span-1">
                          {item.mega.sections.map((sec, i) => (
                            <div key={i}>
                              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold-600 font-semibold mb-4">
                                {sec.title}
                              </h4>
                              <div>
                                {sec.links.map((link, j) => (
                                  <Link key={j} href={link.href} className="dropdown-link">
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Featured cards */}
                        {item.mega.featured.map((card, i) => (
                          <Link key={i} href={card.href} className="mega-menu-card">
                            <div className="img-box">
                              <img src={card.image} alt={card.label} loading="lazy" />
                            </div>
                            <div className="label">{card.label}</div>
                            <div className="sublabel">{card.sublabel}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA & Mobile */}
            <div className="flex items-center gap-3">
              <Link href="/services/sell" className={`hidden md:inline-flex btn text-[10px] py-3 px-6 ${transparent ? 'btn-outline-gold' : 'btn-dark'}`}>
                <span>List Property</span>
              </Link>

              <button
                className="lg:hidden p-2 z-[60]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block w-full h-px transition-all duration-500 ${(transparent && !mobileOpen) ? 'bg-white' : 'bg-ink'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-full h-px transition-all duration-500 ${(transparent && !mobileOpen) ? 'bg-white' : 'bg-ink'} ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-full h-px transition-all duration-500 ${(transparent && !mobileOpen) ? 'bg-white' : 'bg-ink'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 bg-white z-50 transition-all duration-500 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ top: '64px' }}>
          <div className="h-full overflow-y-auto pb-24">
            <div className="py-6 px-6">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-gray-100">
                  {item.mega ? (
                    <>
                      <button
                        onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                        className="w-full flex justify-between items-center py-4 text-base font-medium text-ink"
                      >
                        {item.label}
                        <svg className={`w-4 h-4 transition-transform ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === item.label ? 'max-h-[600px] pb-4' : 'max-h-0'}`}>
                        {item.mega.sections.map((sec, i) => (
                          <div key={i}>
                            {sec.links.map((link, j) => (
                              <Link key={j} href={link.href} className="block py-2 pl-4 text-sm text-ink-600 hover:text-gold-600">
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 text-base font-medium text-ink hover:text-gold-600">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-6 space-y-3">
                <Link href="/services/sell" className="btn btn-gold w-full text-center text-xs">
                  <span>List Your Property</span>
                </Link>
                <a href="tel:+97142772373" className="btn btn-dark w-full text-center text-xs">
                  <span>Call +971 4 277 2373</span>
                </a>
                <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="btn w-full text-center text-xs" style={{ background: '#25d366', color: '#fff' }}>
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold-600 font-semibold mb-3">Contact</div>
                <div className="space-y-2 text-sm text-ink-600">
                  <div>info@citiway.com</div>
                  <div>Unit 606, Aspect Tower</div>
                  <div>Business Bay, Dubai, UAE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
