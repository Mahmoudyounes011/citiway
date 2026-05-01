'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ConsultationPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <>
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: '#0e1218' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 animate-ken-burns" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Property Consultation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Property <em className="italic text-gradient-gold">Consultation</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">Strategic guidance tailored to your ambitions. From first-time buyers to seasoned investors.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="eyebrow">Our Expertise</div>
            <h2 className="section-title">Informed Decisions,<br /><em className="italic text-gold-600">Better Outcomes</em></h2>
            <div className="gold-line-h" />
            <p className="text-ink-600 leading-relaxed mb-4">
              At Citiway, our consultation service goes beyond basic advice. We provide institutional-grade market analysis, feasibility studies, and strategic planning tailored to your risk profile and goals.
            </p>
            <p className="text-ink-600 leading-relaxed mb-10">
              Whether you&apos;re entering the Dubai market for the first time, expanding your portfolio, or optimizing existing holdings, our consultants bring deep local knowledge and a global perspective.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Market Analysis & Research', desc: 'Community-level reports, pricing dynamics, and supply-demand metrics.' },
                { title: 'Investment Strategy', desc: 'Custom strategies for capital growth, rental yield, or balanced portfolios.' },
                { title: 'Due Diligence & Legal', desc: 'Property checks, title verification, developer analysis, regulatory compliance.' },
                { title: 'Relocation Advisory', desc: 'End-to-end support for individuals and families relocating to Dubai.' },
                { title: 'Portfolio Optimization', desc: 'Review and restructure existing holdings to maximize returns.' },
                { title: 'Off-Plan Assessment', desc: 'Evaluate new developments for viability and future value projections.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-5 border border-gray-100 hover:border-gold-300 transition-colors">
                  <div className="text-3xl font-light text-gold-500 flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h4 className="text-base font-semibold text-ink-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-ink-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-28 p-10" style={{ background: '#0e1218' }}>
              <h3 className="text-3xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Book a <em className="italic text-gold-300">Consultation</em></h3>
              <p className="text-white/60 text-sm mb-8">Free, no-obligation. A senior consultant will reach out within 24 hours.</p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h4 className="text-white text-xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Received</h4>
                  <p className="text-white/60 text-sm">Our team will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name *" required className="form-input-glass" />
                    <input type="text" placeholder="Last Name *" required className="form-input-glass" />
                  </div>
                  <input type="email" placeholder="Email *" required className="form-input-glass" />
                  <input type="tel" placeholder="Phone *" required className="form-input-glass" />
                  <select className="form-select-glass">
                    <option value="" className="bg-ink-900">I&apos;m interested in...</option>
                    <option className="bg-ink-900">Buying Property</option>
                    <option className="bg-ink-900">Investment Advisory</option>
                    <option className="bg-ink-900">Relocating to Dubai</option>
                    <option className="bg-ink-900">Portfolio Review</option>
                    <option className="bg-ink-900">Off-Plan Projects</option>
                  </select>
                  <textarea rows="3" placeholder="Tell us about your requirements..." className="form-input-glass" />
                  <button type="submit" className="btn btn-gold w-full">Request Consultation</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
