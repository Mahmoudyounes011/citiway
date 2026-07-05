'use client';
import Link from 'next/link';
import { useState } from 'react';
import { submitLead, honeypotInputProps } from '../lib/submitLead';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitLead({ formType: 'newsletter', company, email });
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError(err.message || 'Could not subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0a1628' }}>
      {/* Top CTA Strip */}
      <div className="relative py-20 md:py-28 px-5 md:px-12 lg:px-24" style={{
        background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)'
      }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }} />

        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-ink text-2xl leading-none" style={{ fontWeight: 300 }}>\</span>
              <span className="text-ink/80 text-xs font-semibold tracking-[0.4em] uppercase">
                Begin Your Journey
              </span>
            </div>
            <h2 className="font-display font-light text-ink text-4xl md:text-6xl leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              Your Dubai address<br />
              <em className="italic">awaits.</em>
            </h2>
            <p className="text-ink/70 max-w-lg mt-4 leading-relaxed font-light">
              Whether you are searching for an investment, a family home, or a private retreat — let our team curate the right opportunities for you.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-dark">
                <span>Speak to an Advisor</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#0e1218', color: '#fff', border: '1px solid #0e1218' }}>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 md:py-20 px-5 md:px-12 lg:px-24 border-b border-white/10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow eyebrow-light">The Citiway Letter</div>
            <h3 className="text-white text-3xl md:text-4xl font-display font-light leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>
              Off-market opportunities,<br />
              delivered <em className="italic text-gold-300">privately.</em>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Join our private list to receive curated property opportunities, market insights, and invitations to exclusive previews — before they reach the public market.
            </p>
          </div>
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="text-center py-6">
                <div className="text-gold-400 text-2xl font-display mb-2">Welcome aboard.</div>
                <div className="text-white/60 text-sm">You\'ll hear from us soon.</div>
              </div>
            ) : (
              <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input {...honeypotInputProps} value={company} onChange={(e) => setCompany(e.target.value)} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 form-input-glass"
                />
                <button type="submit" disabled={submitting} className="btn btn-gold whitespace-nowrap disabled:opacity-50">
                  <span>{submitting ? 'Subscribing…' : 'Subscribe'}</span>
                </button>
              </form>
              {error && <p className="text-red-300 text-xs mt-3">{error}</p>}
              </>
            )}
            <p className="text-white/30 text-[10px] tracking-wider mt-4">
              By subscribing, you agree to our privacy policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 md:py-20 px-5 md:px-12 lg:px-24">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="mb-6">
              <img
                src="/logo-white.png"
                alt="Citiway Real Estate"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-light max-w-xs">
              Dubai\'s trusted partner for luxury real estate since 2009. Curated portfolios, expert advisory, lifelong relationships.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[
                { name: 'Instagram', href: '#', svg: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
                { name: 'LinkedIn', href: '#', svg: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                { name: 'Facebook', href: '#', svg: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 hover:border-gold-400 hover:bg-gold-400/5 flex items-center justify-center transition-all duration-300 group" aria-label={s.name}>
                  <svg className="w-4 h-4 text-white/60 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.svg}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h4 className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/properties" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Properties</Link></li>
              <li><Link href="/rent" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Rentals</Link></li>
              <li><Link href="/off-plan" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Off-Plan</Link></li>
              <li><Link href="/developers" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Developers</Link></li>
              <li><Link href="/agents" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Our Team</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/consultation" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Consultation</Link></li>
              <li><Link href="/services/management" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Management</Link></li>
              <li><Link href="/services/sell" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Sell Property</Link></li>
              <li><Link href="/blog" className="text-white/60 text-sm hover:text-gold-300 transition-colors">Insights</Link></li>
              <li><Link href="/about" className="text-white/60 text-sm hover:text-gold-300 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Visit Us</h4>
            <div className="space-y-4 text-sm text-white/60 font-light leading-relaxed">
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-1">Office</div>
                <div>Unit 606, Aspect Tower</div>
                <div>Business Bay, Dubai, UAE</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-1">Phone</div>
                <a href="tel:+97142772373" className="hover:text-gold-300 transition-colors">+971 4 277 2373</a>
                <span className="text-white/20 mx-2">|</span>
                <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">+971 52 731 3111</a>
              </div>
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-1">Email</div>
                <a href="mailto:info@citiway.com" className="hover:text-gold-300 transition-colors">info@citiway.com</a>
              </div>
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-1">Hours</div>
                <div>Mon - Sat · 9:00 - 19:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-5 md:px-12 lg:px-24">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} Citiway Real Estate. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">Terms of Service</Link>
            <span>RERA Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
