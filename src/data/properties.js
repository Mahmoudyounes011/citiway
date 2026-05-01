// ═══════════════════════════════════════════════════════════════
// CITIWAY REAL ESTATE - PROPERTIES DATABASE
// ═══════════════════════════════════════════════════════════════
// To ADD a new property: copy any property object, change values, paste
// Use unique slugs (URL-friendly, lowercase, hyphens)
// Images should be high quality (1200px+ wide recommended)
// ═══════════════════════════════════════════════════════════════

export const properties = [
  {
    slug: 'montiva-vida-creek-harbour',
    title: 'Montiva by Vida',
    subtitle: 'A landmark residence at Dubai Creek Harbour',
    developer: 'Emaar Properties',
    location: 'Dubai Creek Harbour',
    subLocation: 'Island District',
    category: 'off-plan', // 'off-plan' | 'sale' | 'rent'
    type: 'Apartment & Penthouse',
    status: 'New Launch',
    featured: true,
    price: 'AED 1.85M',
    priceFrom: 1850000,
    priceUnit: 'Starting from',
    completion: 'Q4 2028',
    paymentPlan: '80/20',
    roi: '8-12%',
    bedrooms: '1-3',
    bathrooms: '1-4',
    areaMin: 750,
    areaMax: 2100,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    ],
    description: 'Montiva by Vida marks a new chapter in luxury living at Dubai Creek Harbour. Developed by Emaar, this landmark residence combines refined architecture with world-class amenities, offering panoramic views of the Dubai skyline, Ras Al Khor Wildlife Sanctuary, and the iconic Dubai Creek Tower.',
    longDescription: 'Nestled in the vibrant Island District of Dubai Creek Harbour, Montiva presents an exceptional opportunity for both residents and investors. Each residence is thoughtfully designed with floor-to-ceiling windows, premium finishes, and generous outdoor terraces. The development features a curated selection of 1 to 3-bedroom apartments and signature penthouses, all imbued with Vida Hotels and Resorts\' signature hospitality-inspired lifestyle.',
    features: [
      'Prime waterfront location',
      'Direct Dubai Creek views',
      'Vida-branded residences',
      'Hospitality-inspired amenities',
      '5-minute drive to Downtown Dubai',
      'World-class developer (Emaar)',
    ],
    amenities: [
      { icon: 'pool', name: 'Infinity Swimming Pool' },
      { icon: 'gym', name: 'State-of-the-Art Gym' },
      { icon: 'spa', name: 'Spa & Wellness Center' },
      { icon: 'kids', name: 'Kids Play Area' },
      { icon: 'park', name: 'Landscaped Gardens' },
      { icon: 'security', name: '24/7 Security' },
      { icon: 'parking', name: 'Dedicated Parking' },
      { icon: 'lounge', name: 'Resident Lounge' },
      { icon: 'dining', name: 'Fine Dining' },
      { icon: 'retail', name: 'Retail & Boutiques' },
    ],
    paymentSchedule: [
      { percent: '20%', when: 'Down Payment', note: 'Upon booking' },
      { percent: '60%', when: 'During Construction', note: 'Linked to milestones' },
      { percent: '20%', when: 'On Handover', note: 'Q4 2028' },
    ],
    nearby: [
      { name: 'Dubai Mall', distance: '12 min drive' },
      { name: 'Burj Khalifa', distance: '12 min drive' },
      { name: 'DXB Airport', distance: '15 min drive' },
      { name: 'Ras Al Khor Sanctuary', distance: '2 min walk' },
      { name: 'Creek Tower', distance: '1 min walk' },
    ],
    location_coords: { lat: 25.1885, lng: 55.3477 },
  },
  {
    slug: 'palm-vistas-palm-jumeirah',
    title: 'Palm Vistas Residence',
    subtitle: 'Exclusive beachfront villas on Palm Jumeirah',
    developer: 'Nakheel',
    location: 'Palm Jumeirah',
    subLocation: 'Frond H',
    category: 'off-plan',
    type: 'Villa',
    status: 'Selling Fast',
    featured: true,
    price: 'AED 12.5M',
    priceFrom: 12500000,
    priceUnit: 'Starting from',
    completion: 'Q2 2027',
    paymentPlan: '50/50',
    roi: '6-9%',
    bedrooms: '4-6',
    bathrooms: '5-7',
    areaMin: 5500,
    areaMax: 9200,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
    ],
    description: 'Palm Vistas Residence is an exclusive collection of 4-6 bedroom beachfront villas on the prestigious Palm Jumeirah. Each villa offers unparalleled luxury with direct beach access, private swimming pools, and breathtaking views of the Arabian Gulf and Dubai skyline.',
    longDescription: 'Set along the pristine beaches of Palm Jumeirah\'s Frond H, Palm Vistas represents the pinnacle of beachfront living. These architect-designed villas feature expansive living spaces, designer kitchens, premium finishes throughout, and landscaped gardens leading directly to private beaches. With only 24 villas in the collection, ownership is truly exclusive.',
    features: [
      'Direct beach access',
      'Private swimming pool',
      'Panoramic sea views',
      'Exclusive 24-villa community',
      'Smart home automation',
      'Private beach club access',
    ],
    amenities: [
      { icon: 'beach', name: 'Private Beach Access' },
      { icon: 'pool', name: 'Private Pool' },
      { icon: 'gym', name: 'Premium Fitness Center' },
      { icon: 'spa', name: 'Beach Club & Spa' },
      { icon: 'marina', name: 'Yacht & Marina' },
      { icon: 'security', name: 'Gated Community' },
      { icon: 'parking', name: '4-Car Garage' },
      { icon: 'concierge', name: 'Butler Service' },
    ],
    paymentSchedule: [
      { percent: '10%', when: 'Booking', note: 'Reservation deposit' },
      { percent: '40%', when: 'Construction', note: 'Milestone-linked' },
      { percent: '50%', when: 'Handover', note: 'Q2 2027' },
    ],
    nearby: [
      { name: 'Atlantis The Palm', distance: '3 min drive' },
      { name: 'Nakheel Mall', distance: '8 min drive' },
      { name: 'Dubai Marina', distance: '15 min drive' },
      { name: 'Al Maktoum Airport', distance: '40 min drive' },
    ],
    location_coords: { lat: 25.1124, lng: 55.1390 },
  },
  {
    slug: 'azure-residences-downtown',
    title: 'Azure Residences',
    subtitle: 'Urban sophistication in Downtown Dubai',
    developer: 'Emaar Properties',
    location: 'Downtown Dubai',
    subLocation: 'Opera District',
    category: 'off-plan',
    type: 'Apartment',
    status: 'Now Selling',
    featured: true,
    price: 'AED 2.4M',
    priceFrom: 2400000,
    priceUnit: 'Starting from',
    completion: 'Q3 2027',
    paymentPlan: '70/30',
    roi: '7-10%',
    bedrooms: '1-4',
    bathrooms: '1-5',
    areaMin: 820,
    areaMax: 3400,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    ],
    description: 'Azure Residences offers elevated living in the heart of Downtown Dubai, steps away from the Burj Khalifa and Dubai Mall. Contemporary design meets timeless elegance in every residence.',
    longDescription: 'Located in the prestigious Opera District, Azure Residences is a 42-story architectural masterpiece offering spectacular views of the Burj Khalifa, Dubai Fountain, and Business Bay. Each residence features open-plan layouts, floor-to-ceiling windows, and premium German kitchens. The development boasts world-class amenities on multiple podium levels.',
    features: [
      'Burj Khalifa views',
      'Walking distance to Dubai Opera',
      'Premium German kitchens',
      'Smart home technology',
      'Concierge services',
      'Prime freehold ownership',
    ],
    amenities: [
      { icon: 'pool', name: 'Infinity Pool' },
      { icon: 'gym', name: 'Signature Gym' },
      { icon: 'spa', name: 'Wellness Spa' },
      { icon: 'cinema', name: 'Private Cinema' },
      { icon: 'lounge', name: 'Sky Lounge' },
      { icon: 'retail', name: 'Retail Plaza' },
      { icon: 'kids', name: "Children's Club" },
      { icon: 'concierge', name: 'Concierge' },
    ],
    paymentSchedule: [
      { percent: '20%', when: 'Booking', note: '10% on SPA signing' },
      { percent: '50%', when: 'Construction', note: 'Progressive payments' },
      { percent: '30%', when: 'Handover', note: 'Q3 2027' },
    ],
    nearby: [
      { name: 'Dubai Mall', distance: '5 min walk' },
      { name: 'Burj Khalifa', distance: '3 min walk' },
      { name: 'Dubai Opera', distance: '2 min walk' },
      { name: 'DIFC', distance: '8 min drive' },
      { name: 'DXB Airport', distance: '15 min drive' },
    ],
    location_coords: { lat: 25.1972, lng: 55.2744 },
  },
  {
    slug: 'marina-edge-tower',
    title: 'Marina Edge Tower',
    subtitle: 'Contemporary living with marina views',
    developer: 'Select Group',
    location: 'Dubai Marina',
    subLocation: 'Marina Walk',
    category: 'off-plan',
    type: 'Studio, Apartment',
    status: 'Pre-Launch',
    featured: false,
    price: 'AED 980K',
    priceFrom: 980000,
    priceUnit: 'Starting from',
    completion: 'Q1 2027',
    paymentPlan: '60/40',
    roi: '9-14%',
    bedrooms: 'Studio - 3',
    bathrooms: '1-4',
    areaMin: 450,
    areaMax: 2200,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    ],
    description: 'Marina Edge Tower brings contemporary design and investment excellence to Dubai Marina. An ideal choice for young professionals and savvy investors.',
    longDescription: 'Strategically positioned along Marina Walk, Marina Edge offers direct access to the vibrant marina lifestyle. Each unit is designed to maximize views and natural light, with intelligent layouts that optimize every square foot. The tower features a podium level with comprehensive amenities and dedicated retail.',
    features: [
      'Marina waterfront views',
      'Walking distance to JBR Beach',
      'High rental yields',
      'Smart layouts',
      'Metro accessibility',
      'Golden Visa eligible',
    ],
    amenities: [
      { icon: 'pool', name: 'Rooftop Pool' },
      { icon: 'gym', name: 'Modern Gym' },
      { icon: 'lounge', name: 'Co-working Lounge' },
      { icon: 'retail', name: 'Ground Retail' },
      { icon: 'kids', name: 'Kids Area' },
      { icon: 'security', name: '24/7 Concierge' },
    ],
    paymentSchedule: [
      { percent: '10%', when: 'Booking', note: 'Initial deposit' },
      { percent: '50%', when: 'Construction', note: 'Milestone payments' },
      { percent: '40%', when: 'Handover', note: 'Q1 2027' },
    ],
    nearby: [
      { name: 'JBR Beach', distance: '5 min walk' },
      { name: 'Dubai Marina Metro', distance: '2 min walk' },
      { name: 'Marina Mall', distance: '4 min walk' },
      { name: 'Palm Jumeirah', distance: '8 min drive' },
    ],
    location_coords: { lat: 25.0772, lng: 55.1409 },
  },
  {
    slug: 'downtown-penthouse-sale',
    title: 'Sky Penthouse Downtown',
    subtitle: 'A rare 4-bedroom penthouse with skyline views',
    developer: 'Private Owner',
    location: 'Downtown Dubai',
    subLocation: 'Boulevard',
    category: 'sale',
    type: 'Penthouse',
    status: 'Ready to Move',
    featured: true,
    price: 'AED 8.5M',
    priceFrom: 8500000,
    priceUnit: 'Sale Price',
    completion: 'Ready',
    bedrooms: '4',
    bathrooms: '5',
    areaMin: 5200,
    areaMax: 5200,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
    ],
    description: 'An exquisite 4-bedroom penthouse offering 270-degree panoramic views of the Dubai skyline, Burj Khalifa, and Dubai Fountain. Fully furnished and ready to move in.',
    longDescription: 'This extraordinary penthouse spans 5,200 sq ft across the top floor of one of Downtown Dubai\'s most prestigious residential towers. Featuring a private rooftop terrace, designer interiors by a renowned international designer, and a private elevator, this residence represents the very pinnacle of Dubai luxury living.',
    features: [
      'Private rooftop terrace (2,000 sq ft)',
      'Fully furnished by designer',
      'Private elevator access',
      'Unobstructed Burj Khalifa views',
      'Smart home automation',
      'VOT (Vacant on Transfer)',
    ],
    amenities: [
      { icon: 'pool', name: 'Private Pool on Terrace' },
      { icon: 'gym', name: 'Building Gym Access' },
      { icon: 'spa', name: 'Spa & Sauna' },
      { icon: 'concierge', name: '24/7 Concierge' },
      { icon: 'parking', name: '3 Parking Bays' },
      { icon: 'security', name: 'CCTV & Security' },
    ],
    nearby: [
      { name: 'Dubai Mall', distance: '3 min walk' },
      { name: 'Burj Khalifa', distance: '5 min walk' },
      { name: 'Dubai Opera', distance: '4 min walk' },
    ],
    location_coords: { lat: 25.1972, lng: 55.2744 },
  },
  {
    slug: 'emirates-hills-mansion',
    title: 'Emirates Hills Signature Mansion',
    subtitle: 'A landmark estate in Dubai\'s most prestigious community',
    developer: 'Private Owner',
    location: 'Emirates Hills',
    subLocation: 'Sector E',
    category: 'sale',
    type: 'Villa',
    status: 'Exclusive Listing',
    featured: true,
    price: 'AED 45M',
    priceFrom: 45000000,
    priceUnit: 'Sale Price',
    completion: 'Ready',
    bedrooms: '7',
    bathrooms: '9',
    areaMin: 18000,
    areaMax: 18000,
    unit: 'sq ft',
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    ],
    description: 'An architectural masterpiece in Emirates Hills, offering 18,000 sq ft of living space, golf course frontage, and unparalleled luxury.',
    longDescription: 'This bespoke mansion sits on a prime 25,000 sq ft plot overlooking the Montgomerie Golf Course. Designed by a world-renowned architect, the property features 7 luxurious bedroom suites, a grand cinema, indoor pool, outdoor infinity pool, private elevator, and extensive staff quarters.',
    features: [
      'Golf course frontage',
      '25,000 sq ft plot',
      'Private indoor & outdoor pools',
      'Home cinema & entertainment',
      'Chef\'s kitchen & showcase kitchen',
      'Bespoke Italian interiors',
    ],
    amenities: [
      { icon: 'pool', name: 'Indoor & Outdoor Pools' },
      { icon: 'cinema', name: 'Home Cinema' },
      { icon: 'gym', name: 'Private Gym' },
      { icon: 'spa', name: 'Spa & Sauna' },
      { icon: 'garage', name: '6-Car Garage' },
      { icon: 'staff', name: 'Staff Quarters' },
    ],
    nearby: [
      { name: 'Montgomerie Golf Club', distance: 'Adjacent' },
      { name: 'Emirates Golf Club', distance: '5 min drive' },
      { name: 'Dubai Marina', distance: '10 min drive' },
    ],
    location_coords: { lat: 25.0589, lng: 55.1760 },
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getPropertyBySlug = (slug) => {
  return properties.find(p => p.slug === slug);
};

export const getFeaturedProperties = () => {
  return properties.filter(p => p.featured);
};

export const getPropertiesByCategory = (category) => {
  return properties.filter(p => p.category === category);
};

export const getRelatedProperties = (slug, limit = 3) => {
  const current = getPropertyBySlug(slug);
  if (!current) return [];
  return properties
    .filter(p => p.slug !== slug && (p.location === current.location || p.category === current.category))
    .slice(0, limit);
};

export const getPropertiesByDeveloper = (developerName) => {
  return properties.filter(p => p.developer === developerName);
};

export const getAllLocations = () => {
  return [...new Set(properties.map(p => p.location))];
};

export const getAllDevelopers = () => {
  return [...new Set(properties.map(p => p.developer))];
};
