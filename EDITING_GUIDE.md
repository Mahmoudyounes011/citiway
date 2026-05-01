# 🏆 CITIWAY ELITE - EDITING & MAINTENANCE GUIDE

**For: Managers, Developers, and Content Teams**  
**Version:** 5.0  
**Last Updated:** April 2025

---

## 📋 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Adding New Properties](#adding-new-properties)
3. [Adding New Developers](#adding-new-developers)
4. [Editing Content](#editing-content)
5. [Customizing Design](#customizing-design)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 QUICK START

### Prerequisites
- GitHub Account
- VS Code (or any code editor)
- Node.js installed
- Git installed

### Get the Code (First Time)

```bash
git clone https://github.com/Malika0695/Fayezo.git
cd Fayezo
npm install
npm run dev
```

Then visit: **http://localhost:3000**

---

## 🏢 ADDING NEW PROPERTIES

### WHERE: `src/data/properties.js`

This file is the **heart of the website**. Add a property here and it automatically appears everywhere!

### HOW: Copy & Edit

Find the end of the properties array and paste this template:

```javascript
{
  slug: 'luxury-penthouse-downtown',  // URL slug (lowercase, hyphens only!)
  title: 'Luxury Penthouse Downtown',
  subtitle: 'Stunning Burj Khalifa views',
  developer: 'Emaar Properties',  // MUST match a developer from developers.js
  location: 'Downtown Dubai',
  subLocation: 'Boulevard',
  category: 'off-plan',  // 'off-plan', 'sale', or 'rent'
  type: 'Penthouse',
  status: 'New Launch',
  featured: true,  // Only for best properties!
  price: 'AED 5.2M',
  priceFrom: 5200000,  // For sorting
  priceUnit: 'Starting from',
  completion: 'Q2 2027',
  paymentPlan: '70/30',
  roi: '9-12%',
  bedrooms: '3-4',
  bathrooms: '3-4',
  areaMin: 2200,
  areaMax: 2800,
  unit: 'sq ft',
  
  // Images (HTTPS only!)
  coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1?w=1600&q=80',
    'https://images.unsplash.com/photo-2?w=1600&q=80',
    'https://images.unsplash.com/photo-3?w=1600&q=80',
    'https://images.unsplash.com/photo-4?w=1600&q=80',
    'https://images.unsplash.com/photo-5?w=1600&q=80',
  ],
  
  // Descriptions
  description: 'A stunning penthouse with premium finishes and breathtaking views.',
  longDescription: 'Located in the heart of Downtown Dubai, this exquisite penthouse offers luxury living at its finest...',
  
  // Features & Amenities
  features: [
    'Smart home technology',
    'Private elevator',
    'Panoramic views',
    'High ceilings',
    'Premium finishes',
    'Spacious balcony',
  ],
  
  amenities: [
    { icon: 'pool', name: 'Swimming Pool' },
    { icon: 'gym', name: 'Fitness Center' },
    { icon: 'spa', name: 'Spa & Wellness' },
    { icon: 'security', name: '24/7 Security' },
    { icon: 'parking', name: 'Parking' },
    { icon: 'concierge', name: 'Concierge' },
  ],
  
  // Payment breakdown
  paymentSchedule: [
    { percent: '20%', when: 'Booking', note: 'Initial deposit' },
    { percent: '50%', when: 'During Construction', note: 'Monthly milestones' },
    { percent: '30%', when: 'Upon Handover', note: 'Q2 2027' },
  ],
  
  // Nearby locations
  nearby: [
    { name: 'Dubai Mall', distance: '5 min walk' },
    { name: 'Burj Khalifa', distance: '3 min walk' },
    { name: 'DIFC', distance: '8 min drive' },
    { name: 'DXB Airport', distance: '15 min drive' },
  ],
  
  // Coordinates for map
  location_coords: { lat: 25.1972, lng: 55.2744 },
}
```

### RULES ✅❌

**DO:**
- Use lowercase hyphens in slug: `my-villa-dubai` ✓
- Match developer name EXACTLY: `Emaar Properties`
- Use HTTPS image links
- Include 5+ gallery images
- Set `featured: true` for top properties only

**DON'T:**
- Use spaces in slug
- Invent developer names (add to developers.js first!)
- Use HTTP (non-secure) links
- Leave fields empty

### WHERE IT APPEARS

Once saved:
- `/properties/luxury-penthouse-downtown` (detail page)
- `/properties` (listing page)
- `/developers/emaar-properties` (on developer page)

---

## 🏗️ ADDING NEW DEVELOPERS

### WHERE: `src/data/developers.js`

### HOW: Add to Array

```javascript
{
  slug: 'damac-properties',  // URL: /developers/damac-properties
  name: 'Damac Properties',
  tagline: 'Luxury redefined. Excellence delivered.',
  established: 2002,
  headquarters: 'Dubai, UAE',
  logo: 'DAMAC',
  coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  logoImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  featured: true,  // true = shows in main grid
  projectCount: 120,
  totalUnits: '44,000+',
  description: 'Leading luxury developer with 20+ years experience.',
  longDescription: 'Since 2002, Damac has pioneered luxury living in Dubai...',
  
  specialties: [
    'Luxury Villas',
    'Branded Residences',
    'Master Communities',
    'Golf Developments',
  ],
  
  awards: [
    'Best Luxury Developer',
    'Top Branded Residences Developer',
    'International Property Awards Winner',
  ],
  
  signatureProjects: [
    { name: 'Damac Hills', location: 'Dubailand' },
    { name: 'Damac Lagoons', location: 'Dubailand' },
    { name: 'Cavalli Tower', location: 'Dubai Marina' },
    { name: 'Safa Park', location: 'Sheikh Zayed Road' },
  ],
}
```

### IMPORTANT

- Use the SAME name when adding properties!
- If you add `Damac Properties` as developer, properties must use `Damac Properties` (exact match, case-sensitive)
- Set `featured: true` only for major developers

---

## ✏️ EDITING CONTENT

### Change Property Info

**File:** `src/data/properties.js`

Find the property, edit any field:

```javascript
// Change title
title: 'OLD TITLE',  →  title: 'NEW TITLE',

// Change price
price: 'AED 3M',  →  price: 'AED 4.5M',

// Update description
description: 'OLD',  →  description: 'NEW',
```

### Change Developer Info

**File:** `src/data/developers.js`

Same process — find and edit:

```javascript
name: 'Old Name',  →  name: 'New Name',
tagline: 'Old',  →  tagline: 'New',
```

### Change Page Text

**Files:** `src/app/[page]/page.jsx`

Examples:
- **Home text:** `src/app/page.jsx`
- **About text:** `src/app/about/page.jsx`
- **Contact info:** `src/app/contact/page.jsx`

Look for text in the JSX and edit:

```javascript
// BEFORE
<h1>Where Ambition Finds Its Address</h1>

// AFTER
<h1>Find Your Luxury Home</h1>
```

### Change Header/Navigation

**File:** `src/components/Header.jsx` (around line 30)

```javascript
const nav = [
  {
    label: 'Buy',
    href: '/properties',
    menu: [
      { label: 'All Properties', href: '/properties' },
      // ADD NEW MENU ITEMS HERE
    ],
  },
];
```

### Change Footer

**File:** `src/components/Footer.jsx`

Find and edit:
```javascript
'+971 4 277 2373'  // Phone
'info@citiway.com'  // Email
'Business Bay, Dubai'  // Address
```

---

## 🎨 CUSTOMIZING DESIGN

### Change Colors

**File:** `src/app/globals.css` (lines 1-10)

```css
:root {
  --ink: #0e1218;      /* Dark blue */
  --gold: #caa244;     /* Gold accent */
  --cream: #f8f6f1;    /* Light background */
}
```

Change to your colors:
```css
--gold: #d4af37;   /* Different gold */
--ink: #1a1a1a;    /* Darker */
```

### Change Fonts

**File:** `tailwind.config.js` (line 13-14)

Current:
```javascript
fontFamily: {
  display: ['"Cormorant Garamond"','serif'],
  body: ['"Inter"','sans-serif'],
}
```

Change to Google Fonts:
```javascript
display: ['"Playfair Display"','serif'],
body: ['"Lato"','sans-serif'],
```

Then add to `src/app/globals.css` (line 1):
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap');
```

### Change Logo

**File:** `src/components/Header.jsx` (line 44-49)

```javascript
<div className="text-2xl font-light">
  CITIWAY  {/* CHANGE THIS */}
</div>
<div className="text-[9px] uppercase">
  Real Estate  {/* CHANGE THIS */}
</div>
```

### Change Hero Videos

**File:** `src/components/VideoHero.jsx` (lines 6-22)

```javascript
const VIDEO_PLAYLIST = [
  {
    src: 'https://videos.pexels.com/video-1.mp4',
    poster: 'https://images.unsplash.com/photo-1.jpg',
  },
  {
    src: 'https://videos.pexels.com/video-2.mp4',
    poster: 'https://images.unsplash.com/photo-2.jpg',
  },
];
```

Find videos at **pexels.com/videos** (free!)

**Change rotation speed:**
Line 42: `}, 10000);` → `10000` = 10 seconds

---

## 🚀 DEPLOYMENT

### 1. Test Locally FIRST

```bash
npm run dev
```

Visit http://localhost:3000 and verify:
- ✓ New properties appear
- ✓ Text is correct
- ✓ Mobile looks good
- ✓ Links work

### 2. Push to GitHub

```bash
# See changes
git status

# Stage all
git add .

# Commit with message
git commit -m "Added Damac Hills property and new developer"

# Push
git push
```

### 3. Automatic Deployment

Vercel auto-deploys:
- Website rebuilds
- Changes live in 2-3 minutes
- Check Vercel dashboard for status

### 4. Verify Live

- Go to your Vercel dashboard
- Look for green checkmark
- Once green, changes are LIVE!

---

## 🐛 TROUBLESHOOTING

### Changes Not Showing

```bash
# Stop dev server (Ctrl+C)
rm -rf .next
npm install
npm run dev
```

### Property Not Appearing

Checklist:
- [ ] Developer name EXACTLY matches (case-sensitive)
- [ ] Slug is lowercase with hyphens
- [ ] All fields are filled
- [ ] Image URLs are HTTPS
- [ ] No typos in `developer` field

**Example:** If developer is `Emaar Properties`, property must say:
```javascript
developer: 'Emaar Properties',  // Not 'Emaar' or 'emaar properties'
```

### Vercel Shows Error

1. Go to Vercel dashboard
2. Click failed deployment
3. Read error message
4. Fix locally
5. Test: `npm run dev`
6. Push: `git add . && git commit -m "Fix" && git push`

### Images Not Loading

- Make sure URLs are HTTPS (not HTTP)
- Test by pasting URL in browser
- Use images from:
  - unsplash.com
  - pexels.com
  - pixabay.com

---

## 📊 KEY FILES AT A GLANCE

| File | What It Does | Edit For |
|------|-------------|----------|
| `src/data/properties.js` | All properties | Add/edit properties |
| `src/data/developers.js` | All developers | Add/edit developers |
| `src/components/Header.jsx` | Top nav & logo | Logo, menu, contact |
| `src/components/Footer.jsx` | Footer | Address, phone, email |
| `src/app/page.jsx` | Home page | Hero text, messaging |
| `src/app/about/page.jsx` | About page | Company info |
| `src/app/contact/page.jsx` | Contact | Form, location |
| `src/app/globals.css` | Colors & fonts | Brand colors |
| `tailwind.config.js` | Tailwind config | Font families |

---

## 💡 BEST PRACTICES

✅ **Always test locally first**
```bash
npm run dev  # Test everything
```

✅ **Use clear commit messages**
```bash
git commit -m "Added Palm Vistas Villa project"  # ✓ Clear
git commit -m "update"  # ✗ Vague
```

✅ **One change at a time**
- Add property OR change color, not both
- Easier to fix if something breaks

✅ **Keep images optimized**
- Max 1600px width
- Compress before uploading
- Use free tools: tinypng.com

✅ **Backup before big changes**
```bash
git checkout -b backup-april-2025
git push origin backup-april-2025
```

✅ **Pull before you edit**
```bash
git pull  # Get latest from GitHub
# Then edit
# Then commit and push
```

---

## ❓ COMMON QUESTIONS

**Q: How do I undo a change?**
A: `git revert HEAD` or ask your developer

**Q: Can multiple people edit at once?**
A: Yes, but run `git pull` first

**Q: How long until changes go live?**
A: 2-3 minutes after pushing

**Q: Will my changes break the site?**
A: Only if there are syntax errors. Test locally first!

**Q: How do I delete a property?**
A: Remove the entire object from `properties.js`, save, commit, push

**Q: Can I add HTML/CSS?**
A: Yes, ask your developer for help

---

## 🔗 HELPFUL LINKS

- **GitHub Repo:** https://github.com/Malika0695/Fayezo
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Free Images:** https://unsplash.com
- **Free Videos:** https://pexels.com/videos
- **Color Picker:** https://htmlcolorcodes.com

---

## 📞 NEED HELP?

1. Check GitHub issues
2. Ask your developer
3. Check this guide again
4. Test locally: `npm run dev`

---

**Happy editing! 🚀**  
*Version 5.0 - April 2025*
