'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitLead, honeypotInputProps } from '../../lib/submitLead';
import { Icon } from '../../components/Icons';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '',
  });
  const [company, setCompany] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await submitLead({
        formType: 'contact',
        company, // honeypot
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });

      setSent(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #0a1628 100%)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-wider mb-6">
            <Link href="/" className="text-white/50 hover:text-blue-300">Home</Link>
            <span className="text-white/30">/</span>
            <span style={{ color: '#90caf9' }}>Contact</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
            Get in <em className="italic" style={{ color: '#90caf9' }}>Touch</em>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            We're here to help. Reach out for property inquiries, consultations, or any questions about Dubai real estate.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              {
                icon: 'map-pin',
                title: 'Visit Us',
                body: <>Unit 606, Aspect Tower<br />Business Bay, Dubai, UAE<br />P.O. Box 34201</>,
              },
              {
                icon: 'phone',
                title: 'Call Us',
                body: <>
                  <a href="tel:+97142772373" className="hover:text-blue-600 block">+971 4 277 2373 (Office)</a>
                  <a href="tel:+971527313111" className="hover:text-blue-600 block">+971 52 731 3111 (Mobile)</a>
                </>,
              },
              {
                icon: 'message-circle',
                title: 'Email & WhatsApp',
                body: <>
                  <a href="mailto:info@citiway.com" className="hover:text-blue-600 block">info@citiway.com</a>
                  <a href="https://wa.me/971527313111" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 block">WhatsApp Us →</a>
                </>,
              },
              {
                icon: 'clock',
                title: 'Business Hours',
                body: <>Sunday - Thursday: 9AM - 6PM<br />Friday: 9AM - 12PM<br />Saturday: By Appointment</>,
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderColor: '#e8edf2' }}>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ background: '#e8f1fb' }}>
                  <Icon name={item.icon} className="w-6 h-6" stroke="#1565c0" />
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: '#0f2444' }}>{item.title}</div>
                <div className="text-sm leading-relaxed text-slate-600">{item.body}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-10 bg-white border rounded-xl shadow-sm" style={{ borderColor: '#e8edf2' }}>
              <h2 className="font-display text-3xl font-light mb-2" style={{ color: '#0f2444' }}>
                Send a <em className="italic" style={{ color: '#1565c0' }}>Message</em>
              </h2>
              <p className="text-sm mb-8" style={{ color: '#5a6b7c' }}>
                Fill in the form below and our team will get back to you within 24 hours.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {sent ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl mb-2" style={{ color: '#0f2444' }}>Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input {...honeypotInputProps} value={company} onChange={(e) => setCompany(e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>First Name *</label>
                      <input
                        type="text" required
                        value={form.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: '#e8edf2' }}
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>Last Name *</label>
                      <input
                        type="text" required
                        value={form.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: '#e8edf2' }}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>Email *</label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: '#e8edf2' }}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>Phone *</label>
                      <input
                        type="tel" required
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: '#e8edf2' }}
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      style={{ borderColor: '#e8edf2' }}
                    >
                      <option value="">Select a topic</option>
                      <option>Property Inquiry</option>
                      <option>Property Consultation</option>
                      <option>Property Management</option>
                      <option>Sell My Property</option>
                      <option>Investment Advisory</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0f2444' }}>Message *</label>
                    <textarea
                      rows="5" required
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: '#e8edf2' }}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 text-white font-semibold tracking-wider text-sm uppercase rounded-lg disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="mt-8 aspect-video rounded-xl overflow-hidden border" style={{ borderColor: '#e8edf2' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5!2d55.265!3d25.187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d8c9a0b0a7%3A0x8b6c5a5e0c6e8c8b!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
