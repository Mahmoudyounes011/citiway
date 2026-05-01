# ⚡ CITIWAY ELITE - QUICK REFERENCE CHEAT SHEET

**Copy & Paste Solutions for Common Tasks**

---

## 🏢 ADD A PROPERTY (FASTEST WAY)

**File:** `src/data/properties.js`

```javascript
{
  slug: 'my-property-name',
  title: 'Beautiful Villa',
  subtitle: 'Luxury living',
  developer: 'Emaar Properties',  // MUST EXIST in developers.js
  location: 'Dubai Marina',
  subLocation: 'JBR',
  category: 'sale',  // 'sale' | 'rent' | 'off-plan'
  type: 'Villa',
  status: 'Ready',
  featured: true,
  price: 'AED 3M',
  priceFrom: 3000000,
  priceUnit: 'Starting from',
  completion: 'Ready',
  paymentPlan: 'Cash',
  roi: '5-7%',
  bedrooms: '4',
  bathrooms: '5',
  areaMin: 3000,
  areaMax: 3500,
  unit: 'sq ft',
  coverImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80',
  ],
  description: 'Luxury villa with stunning views',
  longDescription: 'Premium luxury villa located in the heart of Dubai Marina...',
  features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'],
  amenities: [
    { icon: 'pool', name: 'Pool' },
    { icon: 'gym', name: 'Gym' },
    { icon: 'security', name: 'Security' },
    { icon: 'parking', name: 'Parking' },
  ],
  paymentSchedule: [
    { percent: '100%', when: 'Handover', note: 'Ready for move-in' },
  ],
  nearby: [
    { name: 'Dubai Mall', distance: '10 min' },
    { name: 'Beach', distance: '5 min' },
  ],
  location_coords: { lat: 25.0800, lng: 55.1412 },
}
```

**Then:** Save → `npm run dev` → Test → `git add . && git commit -m "Added villa" && git push`

---

## 🏗️ ADD A DEVELOPER (FASTEST WAY)

**File:** `src/data/developers.js`

```javascript
{
  slug: 'new-developer',
  name: 'Developer Name',
  tagline: 'Their motto here',
  established: 2020,
  headquarters: 'Dubai, UAE',
  logo: 'LOGO',
  coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  logoImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  featured: true,
  projectCount: 50,
  totalUnits: '10,000+',
  description: 'Short description',
  longDescription: 'Longer description about the company',
  specialties: ['Luxury', 'Villas', 'Communities'],
  awards: ['Award 1', 'Award 2'],
  signatureProjects: [
    { name: 'Project 1', location: 'Location 1' },
    { name: 'Project 2', location: 'Location 2' },
  ],
}
```

---

## ✏️ QUICK EDITS

### Change Property Price
```javascript
// Find in src/data/properties.js
price: 'AED 3M',        // Display price
priceFrom: 3000000,     // For sorting
```

### Change Property Images
```javascript
coverImage: 'https://new-image-url.jpg',
gallery: ['https://img1.jpg', 'https://img2.jpg', ...],
```

### Change Phone Number
Replace everywhere:
```
+971 4 277 2373   →   +971 XX XXX XXXX
```

Files:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/app/contact/page.jsx`

### Change Logo Text
**File:** `src/components/Header.jsx` (line 44-49)
```javascript
<div>CITIWAY</div>        // Change this
<div>Real Estate</div>    // And this
```

### Change Gold Color
**File:** `src/app/globals.css` (line 3)
```css
--gold: #caa244;   →   --gold: #d4af37;  (or any hex code)
```

---

## 🎬 CHANGE VIDEOS

**File:** `src/components/VideoHero.jsx` (lines 6-22)

```javascript
const VIDEO_PLAYLIST = [
  {
    src: 'https://your-video-url.mp4',
    poster: 'https://your-image-url.jpg',
  },
];
```

**Find videos at:** pexels.com/videos (free, no attribution needed)

**Change rotation speed:**
```javascript
}, 10000);  // 10000 = 10 seconds, 15000 = 15 seconds
```

---

## 🚀 DEPLOY CHANGES

**Always test first:**
```bash
npm run dev
```

**Then push:**
```bash
git add .
git commit -m "Description of change"
git push
```

**Check:** Vercel dashboard → green checkmark = live! ✓

---

## 🔧 COMMON ERRORS & FIXES

### "Developer not found"
```javascript
developer: 'Emaar Properties',  // MUST match exactly in developers.js
```

### Images not showing
```javascript
coverImage: 'https://...',  // Must be HTTPS (not HTTP)
```

### Slug already exists
```javascript
slug: 'unique-name-here',  // No duplicates allowed
```

### Changes not showing
```bash
npm run dev  # Stop with Ctrl+C
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📁 FILE LOCATIONS

| Task | File |
|------|------|
| Add property | `src/data/properties.js` |
| Add developer | `src/data/developers.js` |
| Change logo | `src/components/Header.jsx` |
| Change colors | `src/app/globals.css` |
| Change phone | `src/components/Header.jsx` |
| Change fonts | `tailwind.config.js` |
| Edit home | `src/app/page.jsx` |
| Edit about | `src/app/about/page.jsx` |
| Edit contact | `src/app/contact/page.jsx` |

---

## ⏱️ TYPICAL WORKFLOW

1. **Edit locally**
   ```bash
   npm run dev  # Test at localhost:3000
   ```

2. **Check everything**
   - ✓ New content appears
   - ✓ Mobile looks good
   - ✓ All links work

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Clear message"
   git push
   ```

4. **Wait for live**
   - 2-3 minutes
   - Check Vercel dashboard

5. **Done!** 🎉

---

## 🎯 QUICK TIPS

- **Always test locally first** (`npm run dev`)
- **Use clear commit messages** ("Added villa" not "update")
- **Match developer names exactly** (case-sensitive!)
- **Use HTTPS image links only**
- **Pull before editing** (`git pull`)
- **One change at a time** (easier to debug)

---

## 📞 STUCK?

1. Check full guide: `EDITING_GUIDE.md`
2. Test locally: `npm run dev`
3. Check GitHub
4. Ask developer

---

**Save this as a bookmark for instant access!** 🚀
