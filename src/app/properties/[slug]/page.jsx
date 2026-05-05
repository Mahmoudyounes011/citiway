'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { properties as staticProperties } from '../../../data/properties';
import { supabase } from '../../../lib/supabase';
import { Icon, AMENITY_ICON_MAP } from '../../../components/Icons';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'features', label: 'Features' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'payment', label: 'Payment' },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const overviewRef = useRef(null);
  const galleryRef = useRef(null);
  const featuresRef = useRef(null);
  const amenitiesRef = useRef(null);
  const locationRef = useRef(null);
  const paymentRef = useRef(null);

  const sectionRefs = {
    overview: overviewRef,
    gallery: galleryRef,
    features: featuresRef,
    amenities: amenitiesRef,
    location: locationRef,
    payment: paymentRef,
  };

  useEffect(() => {
    if (!slug) return;
    const loadProperty = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          setProperty({
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            developer: data.developer,
            location: data.location,
            subLocation: data.sub_location,
            category: data.category,
            type: data.type,
            status: data.status,
            featured: data.featured,
            price: data.price,
            priceFrom: data.price_from,
            priceUnit: data.price_unit,
            completion: data.completion,
            paymentPlan: data.payment_plan,
            roi: data.roi,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            areaMin: data.area_min,
            areaMax: data.area_max,
            unit: data.unit,
            coverImage: data.cover_image,
            gallery: data.gallery || [],
            description: data.description,
            longDescription: data.long_description,
            features: data.features || [],
            amenities: data.amenities || [],
            paymentSchedule: data.payment_schedule || [],
            nearby: data.nearby || [],
            location_coords: { lat: data.location_lat, lng: data.location_lng },
          });
        } else {
          const found = staticProperties.find(p => p.slug === slug);
          if (found) setProperty(found);
        }
      } catch (e) {
        const found = staticProperties.find(p => p.slug === slug);
        if (found) setProperty(found);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [slug]);

  useEffect(() => {
    if (!lightboxOpen || !property) return;
    const imgs = [property.coverImage, ...(property.gallery || [])].filter(Boolean);
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') setLightboxImage((i) => (i - 1 + imgs.length) % imgs.length);
      else if (e.key === 'ArrowRight') setLightboxImage((i) => (i + 1) % imgs.length);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, property]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const bottom = top + ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveTab(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [property]);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const ref = sectionRefs[id];
    if (ref?.current) {
      const offset = 180;
      const top = ref.current.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <div className="mt-4 text-slate-500">Loading property...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Icon name="search-empty" className="w-20 h-20 mx-auto mb-4 text-slate-300" />
          <h2 className="font-display text-3xl mb-3" style={{ color: '#0f2444' }}>Property Not Found</h2>
          <p className="text-slate-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
            <Icon name="arrow-left" className="w-4 h-4" />
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [property.coverImage, ...(property.gallery || [])].filter(Boolean);
  const heroImage = allImages[activeImage] || property.coverImage;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-slate-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Breadcrumbs */}
          <div className="text-xs text-white/60 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icon name="chevron-right" className="w-3 h-3" />
            <Link href={`/${property.category === 'sale' ? 'properties' : property.category === 'rent' ? 'rent' : 'off-plan'}`} className="hover:text-white">
              {property.category === 'sale' ? 'For Sale' : property.category === 'rent' ? 'For Rent' : 'Off-Plan'}
            </Link>
            <Icon name="chevron-right" className="w-3 h-3" />
            <span className="text-white">{property.title}</span>
          </div>

          {/* Title Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {property.status && (
                  <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white" style={{ background: 'linear-gradient(135deg, #1e88e5, #1565c0)' }}>
                    {property.status}
                  </span>
                )}
                {property.featured && (
                  <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider bg-amber-500 text-white flex items-center gap-1">
                    <Icon name="star" className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {property.developer && (
                  <span className="text-xs text-white/70">by <span className="font-semibold text-white">{property.developer}</span></span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl text-white font-light leading-tight mb-2">
                {property.title}
              </h1>
              {property.subtitle && <p className="text-white/70 text-lg font-light">{property.subtitle}</p>}
              <div className="flex items-center gap-2 text-white/60 text-sm mt-3">
                <Icon name="map-pin" className="w-4 h-4" />
                {property.location}{property.subLocation && `, ${property.subLocation}`}
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs uppercase tracking-wider text-white/60 mb-1">{property.priceUnit || 'Starting from'}</div>
              <div className="font-display text-3xl md:text-5xl font-light" style={{ color: '#90caf9' }}>{property.price}</div>
            </div>
          </div>

          {/* Image Gallery — clean layout that adapts to image count */}
          <div className="rounded-lg overflow-hidden">
            {allImages.length === 1 ? (
              // Single image — full width
              <div
                className="relative cursor-pointer group rounded-lg overflow-hidden bg-slate-800"
                style={{ aspectRatio: '16/9', maxHeight: '500px' }}
                onClick={() => { setLightboxImage(0); setLightboxOpen(true); }}
              >
                <img src={heroImage} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 bg-white/95 px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 shadow-lg">
                    <Icon name="zoom" className="w-4 h-4" />
                    Click to enlarge
                  </div>
                </div>
              </div>
            ) : allImages.length === 2 ? (
              // Two images — side by side
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ aspectRatio: '16/7', maxHeight: '500px' }}>
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer group rounded-lg overflow-hidden bg-slate-800"
                    onClick={() => { setLightboxImage(idx); setLightboxOpen(true); }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                  </div>
                ))}
              </div>
            ) : (
              // 3+ images — 1 large + grid of thumbnails (Provident style)
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3" style={{ aspectRatio: '16/8', maxHeight: '500px' }}>
                {/* Main large image (left) */}
                <div
                  className="md:col-span-2 relative cursor-pointer group rounded-lg overflow-hidden bg-slate-800"
                  onClick={() => { setLightboxImage(activeImage); setLightboxOpen(true); }}
                >
                  <img src={heroImage} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 bg-white/95 px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 shadow-lg">
                      <Icon name="zoom" className="w-4 h-4" />
                      Click to enlarge
                    </div>
                  </div>
                </div>

                {/* Thumbnail grid (right) — hidden on mobile */}
                <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3">
                  {allImages.slice(1, 5).map((img, idx) => {
                    const isLast = idx === 3 && allImages.length > 5;
                    return (
                      <div
                        key={idx}
                        className="relative cursor-pointer group rounded-lg overflow-hidden bg-slate-800"
                        onClick={() => {
                          if (isLast) {
                            setLightboxImage(0);
                            setLightboxOpen(true);
                          } else {
                            setActiveImage(idx + 1);
                          }
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {isLast && (
                          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-white hover:bg-black/75 transition">
                            <Icon name="zoom" className="w-6 h-6 mb-1" />
                            <div className="font-display text-2xl font-light">+{allImages.length - 4}</div>
                            <div className="text-xs uppercase tracking-wider mt-0.5">View All</div>
                          </div>
                        )}
                        {!isLast && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile thumbnail strip (only on mobile, only when 2+ images) */}
          {allImages.length > 1 && (
            <div className="md:hidden flex gap-2 mt-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition ${activeImage === idx ? 'border-blue-500' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* "View all photos" button — always visible if 3+ images */}
          {allImages.length > 2 && (
            <button
              onClick={() => { setLightboxImage(0); setLightboxOpen(true); }}
              className="md:hidden mt-3 w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Icon name="zoom" className="w-4 h-4" />
              View all {allImages.length} photos
            </button>
          )}
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-7">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {property.bedrooms && (
              <Stat iconName="bed" label="Bedrooms" value={property.bedrooms} />
            )}
            {property.bathrooms && (
              <Stat iconName="bath" label="Bathrooms" value={property.bathrooms} />
            )}
            {property.areaMin && (
              <Stat
                iconName="ruler"
                label="Size"
                value={`${property.areaMin}${property.areaMax > property.areaMin ? `-${property.areaMax}` : ''}`}
                unit={property.unit || 'sq ft'}
              />
            )}
            {property.completion && (
              <Stat iconName="calendar" label="Handover" value={property.completion} />
            )}
            {property.roi && (
              <Stat iconName="trending" label="Expected ROI" value={property.roi} />
            )}
            {!property.roi && property.paymentPlan && (
              <Stat iconName="dollar" label="Payment Plan" value={property.paymentPlan} />
            )}
          </div>
        </div>
      </section>

      {/* STICKY TAB NAV */}
      <section className="sticky top-[80px] z-30 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 md:px-8 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-slate-50 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              {/* OVERVIEW */}
              <section ref={overviewRef} id="overview">
                <SectionTitle>About This Property</SectionTitle>
                {property.description && (
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">{property.description}</p>
                )}
                {property.longDescription && (
                  <p className="text-slate-600 leading-relaxed">{property.longDescription}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 p-6 bg-white rounded-xl border border-slate-100">
                  <InfoRow label="Property Type" value={property.type} />
                  <InfoRow label="Status" value={property.status} />
                  <InfoRow label="Developer" value={property.developer} />
                  <InfoRow label="Location" value={property.location} />
                  <InfoRow label="Sub-Location" value={property.subLocation} />
                  <InfoRow label="Reference" value={property.slug?.toUpperCase().slice(0, 12)} />
                </div>
              </section>

              {/* GALLERY */}
              <section ref={galleryRef} id="gallery">
                <SectionTitle>Gallery</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setLightboxImage(idx); setLightboxOpen(true); }}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                        <Icon name="zoom" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FEATURES */}
              {property.features?.length > 0 && (
                <section ref={featuresRef} id="features">
                  <SectionTitle>Key Features</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-100 hover:border-blue-200 transition">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1e88e5, #1565c0)' }}>
                          <Icon name="check" className="w-5 h-5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium pt-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* AMENITIES */}
              {property.amenities?.length > 0 && (
                <section ref={amenitiesRef} id="amenities">
                  <SectionTitle>Amenities & Facilities</SectionTitle>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition">
                        <div className="w-14 h-14 rounded-full mb-3 flex items-center justify-center" style={{ background: '#e8f1fb' }}>
                          <Icon name={AMENITY_ICON_MAP[amenity.icon] || 'check-circle'} className="w-6 h-6" stroke="#1565c0" />
                        </div>
                        <div className="text-sm font-semibold text-center" style={{ color: '#0f2444' }}>{amenity.name}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* LOCATION */}
              <section ref={locationRef} id="location">
                <SectionTitle>Location</SectionTitle>
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="aspect-[16/9] bg-slate-100 relative">
                    <iframe
                      src={`https://maps.google.com/maps?q=${property.location_coords?.lat || 25.2048},${property.location_coords?.lng || 55.2708}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Property Location"
                    />
                  </div>

                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1e88e5, #1565c0)' }}>
                        <Icon name="map-pin" className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-medium" style={{ color: '#0f2444' }}>{property.location}</div>
                        {property.subLocation && <div className="text-slate-500">{property.subLocation}</div>}
                        <a
                          href={`https://www.google.com/maps?q=${property.location_coords?.lat || 25.2048},${property.location_coords?.lng || 55.2708}`}
                          target="_blank" rel="noopener"
                          className="inline-flex items-center gap-2 text-sm font-semibold mt-3"
                          style={{ color: '#1565c0' }}
                        >
                          Open in Google Maps
                          <Icon name="external" className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {property.nearby?.length > 0 && (
                    <div className="p-6">
                      <h4 className="font-semibold mb-4" style={{ color: '#0f2444' }}>Nearby Landmarks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.nearby.map((place, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Icon name="map-pin" className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-700">{place.name}</span>
                            </div>
                            <span className="text-sm font-semibold" style={{ color: '#1565c0' }}>{place.distance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* PAYMENT PLAN */}
              {property.paymentSchedule?.length > 0 && (
                <section ref={paymentRef} id="payment">
                  <SectionTitle>Payment Plan</SectionTitle>
                  <div className="bg-white rounded-xl border border-slate-100 p-6">
                    <div className="grid gap-3">
                      {property.paymentSchedule.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border" style={{ borderColor: '#e8edf2', background: idx === 0 ? '#f4f8fd' : 'white' }}>
                          <div className="text-3xl font-display font-light" style={{ color: '#1565c0', minWidth: '70px' }}>{stage.percent}</div>
                          <div className="flex-1">
                            <div className="font-semibold" style={{ color: '#0f2444' }}>{stage.when}</div>
                            {stage.note && <div className="text-sm text-slate-500">{stage.note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[200px] space-y-4">
                <ContactCard property={property} onShowForm={() => setShowInquiryForm(true)} />
                <ShareCard property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50 p-3 flex gap-2">
        <a href="tel:+971502345678" className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold text-sm">
          <Icon name="phone" className="w-4 h-4" /> Call
        </a>
        <a href={`https://wa.me/971502345678?text=Hi! I'm interested in ${property.title}`} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm">
          <Icon name="whatsapp" className="w-4 h-4" fill="currentColor" stroke="none" /> WhatsApp
        </a>
        <button onClick={() => setShowInquiryForm(true)} className="flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-lg font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
          <Icon name="email" className="w-4 h-4" /> Inquire
        </button>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" onClick={() => setLightboxOpen(false)}>
          {/* Top bar: counter + close */}
          <div className="flex items-center justify-between p-4 text-white">
            <div className="text-sm font-medium bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              {lightboxImage + 1} <span className="text-white/50">/ {allImages.length}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="hover:text-blue-300 transition p-2 bg-white/10 backdrop-blur rounded-full"
              aria-label="Close"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center px-4 relative">
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxImage((lightboxImage - 1 + allImages.length) % allImages.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 z-10 p-3 bg-white/10 backdrop-blur rounded-full transition hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <Icon name="chevron-left" className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxImage((lightboxImage + 1) % allImages.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 z-10 p-3 bg-white/10 backdrop-blur rounded-full transition hover:bg-white/20"
                  aria-label="Next image"
                >
                  <Icon name="chevron-right" className="w-6 h-6" />
                </button>
              </>
            )}
            <img
              src={allImages[lightboxImage]}
              alt={`${property.title} - Photo ${lightboxImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Thumbnail strip at bottom */}
          {allImages.length > 1 && (
            <div className="px-4 pb-4 pt-2" onClick={(e) => e.stopPropagation()}>
              <div className="max-w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 justify-center min-w-min">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setLightboxImage(idx); }}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition ${
                        lightboxImage === idx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Help text */}
          <div className="text-center text-xs text-white/40 pb-2 hidden md:block">
            Press ESC to close · ← → to navigate
          </div>
        </div>
      )}

      {showInquiryForm && (
        <InquiryFormModal property={property} onClose={() => setShowInquiryForm(false)} />
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

// ──────────────────────────────────────────
function Stat({ iconName, label, value, unit }) {
  return (
    <div className="text-center md:text-left">
      <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0" style={{ background: '#e8f1fb' }}>
        <Icon name={iconName} className="w-5 h-5" stroke="#1565c0" />
      </div>
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="font-display text-xl md:text-2xl font-medium" style={{ color: '#0f2444' }}>
        {value} {unit && <span className="text-sm text-slate-400 font-normal">{unit}</span>}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-light mb-6" style={{ color: '#0f2444' }}>
      {children}
    </h2>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">{label}</div>
      <div className="font-semibold" style={{ color: '#0f2444' }}>{value}</div>
    </div>
  );
}

// ──────────────────────────────────────────
function ContactCard({ property, onShowForm }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
      <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #0f2444 0%, #1565c0 100%)' }}>
        <div className="text-xs uppercase tracking-wider text-white/70 mb-1">Interested in this property?</div>
        <div className="font-display text-xl font-light">Talk to a Citiway expert</div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" alt="Agent" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-semibold" style={{ color: '#0f2444' }}>Citiway Concierge</div>
            <div className="text-xs text-slate-500">Available 24/7</div>
          </div>
        </div>

        <div className="space-y-2">
          <a href="tel:+971502345678" className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold text-sm hover:bg-slate-200 transition">
            <Icon name="phone" className="w-4 h-4" /> Call Now
          </a>
          <a href={`https://wa.me/971502345678?text=Hi! I'm interested in ${property.title}`} target="_blank" className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition">
            <Icon name="whatsapp" className="w-4 h-4" fill="currentColor" stroke="none" /> WhatsApp Us
          </a>
          <button onClick={onShowForm} className="w-full flex items-center justify-center gap-2 py-3 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
            <Icon name="email" className="w-4 h-4" /> Send Inquiry
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
          <div>
            <Icon name="award" className="w-7 h-7 mx-auto mb-1" stroke="#1565c0" />
            <div className="text-xs text-slate-500">Award-winning service</div>
          </div>
          <div>
            <Icon name="users" className="w-7 h-7 mx-auto mb-1" stroke="#1565c0" />
            <div className="text-xs text-slate-500">15+ years in Dubai</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareCard({ property }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="font-semibold mb-3" style={{ color: '#0f2444' }}>Share This Property</div>
      <div className="flex gap-2">
        <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold">
          <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(`Check this property: ${property.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`)}`} target="_blank" className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center" title="WhatsApp">
          <Icon name="whatsapp" className="w-4 h-4" fill="currentColor" stroke="none" />
        </a>
        <a href={`mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent(`Check this property: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`} className="px-4 py-2 bg-slate-700 text-white rounded-lg flex items-center justify-center" title="Email">
          <Icon name="email" className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function InquiryFormModal({ property, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from('leads').insert([{
        ...form,
        property_slug: property.slug,
        source: 'property-detail-page',
        status: 'new',
      }]);
      setSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch (e) {
      alert('Submission failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="check" className="w-10 h-10 text-green-600" strokeWidth={3} />
            </div>
            <h3 className="font-display text-2xl mb-2" style={{ color: '#0f2444' }}>Thank You!</h3>
            <p className="text-slate-600">Our team will reach out to you shortly.</p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-light" style={{ color: '#0f2444' }}>Send Inquiry</h3>
                <p className="text-sm text-slate-500 mt-1">Re: {property.title}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: '#e8edf2' }} />
              <input type="email" required placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: '#e8edf2' }} />
              <input type="tel" required placeholder="Phone (with country code) *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: '#e8edf2' }} />
              <textarea placeholder="Your message (optional)" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: '#e8edf2' }} />
              <button type="submit" disabled={submitting} className="w-full py-3 text-white font-semibold rounded-lg disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' }}>
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>
              <p className="text-xs text-slate-400 text-center">By submitting, you agree to be contacted by Citiway.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
