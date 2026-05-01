'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SellPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <>
      <section className="relative py-32 px-6" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 animate-ken-burns" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Sell Your Property</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Sell Your <em className="italic text-gradient-gold">Property</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">Maximize your value with strategic marketing, expert negotiation, and seamless transactions.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="eyebrow eyebrow-center">How It Works</div>
            <h2 className="section-title">Selling <em className="italic text-gold-600">Simplified</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-24">
            {[
              { step: '01', title: 'Free Valuation', desc: 'Data-driven market assessment' },
              { step: '02', title: 'Marketing Plan', desc: 'Professional media & exposure' },
              { step: '03', title: 'Qualified Viewings', desc: 'Pre-screened buyer showings' },
              { step: '04', title: 'Expert Negotiation', desc: 'Securing best terms for you' },
              { step: '05', title: 'Smooth Closing', desc: 'Full legal & admin support' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center border border-gold-500 text-gold-600 font-light text-2xl group-hover:bg-gold-500 group-hover:text-ink-900 transition-all duration-500" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.step}
                </div>
                <h3 className="text-lg font-light text-ink-900 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
                <p className="text-xs text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-ink-900 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Why Sell with <em className="italic text-gold-600">Citiway?</em></h2>
              <div className="gold-line-h" />
              <div className="space-y-5">
                {[
                  { title: 'Maximum Exposure', desc: 'Featured on Bayut, Property Finder, Dubizzle, our website, social channels — reaching 50,000+ active buyers.' },
                  { title: 'Professional Marketing', desc: 'HDR photography, 3D virtual tours, drone footage, floor plans, and custom brochures.' },
                  { title: 'Data-Driven Pricing', desc: 'Accurate valuation based on comparable transactions. No guesswork, maximum return.' },
                  { title: 'Dedicated Agent', desc: 'A senior agent manages your sale end-to-end with regular updates and market feedback.' },
                  { title: 'Legal & Admin', desc: 'NOC, mortgage clearance, DLD transfer, and full documentation handled for you.' },
                  { title: 'Success-Based Fee', desc: 'Commission only on successful sale. We invest in marketing because we deliver results.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <svg className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <div>
                      <h4 className="text-sm font-semibold text-ink-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-ink-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-28 p-10" style={{ background: '#0e1218' }}>
                <h3 className="text-3xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Free Property <em className="italic text-gold-300">Valuation</em></h3>
                <p className="text-white/60 text-sm mb-8">Get today&apos;s market value. No obligation.</p>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h4 className="text-white text-xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Received</h4>
                    <p className="text-white/60 text-sm">We&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name *" required className="form-input-glass" />
                    <input type="email" placeholder="Email *" required className="form-input-glass" />
                    <input type="tel" placeholder="Phone *" required className="form-input-glass" />
                    <select className="form-select-glass"><option value="" className="bg-ink-900">Property Type</option><option className="bg-ink-900">Apartment</option><option className="bg-ink-900">Villa</option><option className="bg-ink-900">Townhouse</option><option className="bg-ink-900">Penthouse</option><option className="bg-ink-900">Commercial</option></select>
                    <input type="text" placeholder="Community / Area" className="form-input-glass" />
                    <select className="form-select-glass"><option value="" className="bg-ink-900">Bedrooms</option><option className="bg-ink-900">Studio</option><option className="bg-ink-900">1 BR</option><option className="bg-ink-900">2 BR</option><option className="bg-ink-900">3 BR</option><option className="bg-ink-900">4+ BR</option></select>
                    <button type="submit" className="btn btn-gold w-full">Get Free Valuation</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
