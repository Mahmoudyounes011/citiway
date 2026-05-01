'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  return (
    <>
      <section className="relative py-32 px-6" style={{ background: '#0e1218' }}>
        <div className="container-max relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-gold-400">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-gold-400">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Get in <em className="italic text-gradient-gold">Touch</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">We&apos;re here to help. Reach out for property inquiries, consultations, or any questions about Dubai real estate.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            {[
              { icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>, title: 'Visit Us', body: <>Unit 606, Aspect Tower<br />Business Bay, Dubai, UAE<br />P.O. Box 34201</> },
              { icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>, title: 'Call Us', body: <><a href="tel:+97142772373" className="hover:text-gold-600">+971 4 277 2373</a> (Office)<br /><a href="tel:+971527313111" className="hover:text-gold-600">+971 52 731 3111</a> (Mobile)</> },
              { icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>, title: 'Email & WhatsApp', body: <><a href="mailto:info@citiway.com" className="hover:text-gold-600">info@citiway.com</a><br /><a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-500">WhatsApp Us</a></> },
              { icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>, title: 'Business Hours', body: <>Sunday - Thursday: 9AM - 6PM<br />Friday: 9AM - 12PM<br />Saturday: By Appointment</> },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-gray-100 hover:border-gold-300 transition-colors">
                <div className="text-gold-500 mb-3">{item.icon}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ink-900 font-bold mb-2">{item.title}</div>
                <div className="text-sm text-ink-600 leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="p-10 bg-white border border-gray-100">
              <h2 className="text-3xl font-light text-ink-900 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Send a <em className="italic text-gold-600">Message</em></h2>
              <p className="text-sm text-ink-500 mb-8">Fill in the form below and our team will get back to you within 24 hours.</p>

              {sent ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="text-2xl font-light text-ink-900 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Message Sent!</h3>
                  <p className="text-ink-500">Thank you for reaching out. We&apos;ll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">First Name *</label>
                      <input type="text" required className="form-input" placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">Last Name *</label>
                      <input type="text" required className="form-input" placeholder="Your last name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">Email *</label>
                      <input type="email" required className="form-input" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">Phone *</label>
                      <input type="tel" required className="form-input" placeholder="+971 XX XXX XXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">Subject</label>
                    <select className="form-select"><option value="">Select a topic</option><option>Property Inquiry</option><option>Property Consultation</option><option>Property Management</option><option>Sell My Property</option><option>Investment Advisory</option><option>General Inquiry</option></select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-ink-800 uppercase tracking-[0.2em] mb-2">Message *</label>
                    <textarea rows="5" required className="form-input" placeholder="Tell us how we can help you..." />
                  </div>
                  <button type="submit" className="btn btn-gold">Send Message</button>
                </form>
              )}
            </div>

            <div className="mt-8 aspect-video">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5!2d55.265!3d25.187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d8c9a0b0a7%3A0x8b6c5a5e0c6e8c8b!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
