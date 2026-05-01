# 🎬 VIDEO SOURCES GUIDE

**All video locations on the site and how to change them**

---

## 🎯 WHERE TO FIND BETTER DUBAI VIDEOS

### **Best Free Sources:**

1. **Pexels** (Highest quality, no login needed)
   - https://www.pexels.com/search/videos/dubai/
   - https://www.pexels.com/search/videos/dubai%20marina/
   - https://www.pexels.com/search/videos/burj%20khalifa/
   - https://www.pexels.com/search/videos/palm%20jumeirah/

2. **Pixabay** (Backup option)
   - https://pixabay.com/videos/search/dubai/

3. **Coverr** (Curated quality)
   - https://coverr.co/

---

## 📥 HOW TO GET A VIDEO URL

1. Go to https://www.pexels.com/search/videos/dubai/
2. Click on a video you like
3. Click **"Free Download"**
4. **Right-click** the download button
5. Click **"Copy link address"**
6. The URL will look like: `https://videos.pexels.com/video-files/XXXXX/XXXXX-uhd_2560_1440_30fps.mp4`

That's your video URL! Paste it into the code.

---

## 📍 VIDEO LOCATIONS IN CODE

### **1. HERO SECTION (4 rotating videos)**
**File:** `src/components/VideoHero.jsx`  
**Lines:** 6-32

```javascript
const VIDEO_PLAYLIST = [
  {
    src: 'PASTE_NEW_URL_HERE.mp4',
    poster: 'PASTE_NEW_IMAGE_URL.jpg',
    label: 'Dubai Marina',  // What shows on the side
    subtitle: 'Where the waters meet ambition'
  },
  // ... 3 more
];
```

---

### **2. CINEMATIC NEIGHBORHOOD SECTIONS (4 videos)**
**File:** `src/components/CinematicSections.jsx`  
**Lines:** 7-60

Each section has its own video:
- **Downtown** (line ~13)
- **The Marina** (line ~25)  
- **The Palm** (line ~37)
- **Creek Harbour** (line ~49)

```javascript
{
  label: 'Downtown',
  title: 'The Heart',
  ...
  video: 'PASTE_NEW_URL_HERE.mp4',  // ← CHANGE THIS
  poster: 'PASTE_NEW_IMAGE.jpg',     // ← CHANGE THIS
  ...
}
```

---

## 🔥 RECOMMENDED DUBAI-SPECIFIC VIDEOS

### **For Hero (top of homepage):**

**Option A: Aerial Marina Sunset**
- Search: "dubai marina drone sunset"
- Pexels: https://www.pexels.com/search/videos/dubai%20marina/

**Option B: Burj Khalifa Soaring**
- Search: "burj khalifa drone"
- Pexels: https://www.pexels.com/search/videos/burj%20khalifa/

**Option C: Palm Jumeirah Aerial**
- Search: "palm jumeirah drone"
- Pexels: https://www.pexels.com/search/videos/palm%20jumeirah/

---

### **For Cinematic Sections (matching the location):**

**Downtown Dubai:**
- Burj Khalifa close-up
- Dubai Mall / Boulevard
- Downtown skyline at night
- Dubai Fountain

**Dubai Marina:**
- Marina Walk aerial
- Yacht-lined waters
- Marina sunset with skyscrapers
- JBR Beach view

**Palm Jumeirah:**
- Atlantis aerial
- Frond villas drone
- Palm trunk highway
- Beach club shots

**Creek Harbour:**
- Construction timelapse
- Future skyline (CGI/render works too)
- Dubai Creek aerial
- Ras Al Khor wildlife

---

## ⚡ QUICK SWAP EXAMPLE

**Before:**
```javascript
{
  src: 'https://videos.pexels.com/video-files/4625747/4625747-uhd_2560_1440_30fps.mp4',
  poster: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=85',
  label: 'Dubai Marina',
}
```

**After (with new video):**
```javascript
{
  src: 'https://videos.pexels.com/video-files/YOUR_NEW_ID/YOUR_NEW_ID-uhd.mp4',
  poster: 'https://images.unsplash.com/YOUR_NEW_IMAGE?w=1920&q=85',
  label: 'Dubai Marina',
}
```

Save → `npm run dev` → Refresh browser → New video plays!

---

## 🎨 VIDEO SPECS

For best results, choose videos that are:

✅ **4K or HD** quality (`uhd_2560_1440` in URL = 4K)  
✅ **Horizontal/landscape** format  
✅ **10+ seconds** long (so they look natural)  
✅ **No watermarks**  
✅ **Smooth movement** (drones, slow pans work best)  
✅ **Day OR night** (consistent lighting)  
✅ **Not too dark** (the overlay darkens it more)  

❌ **Avoid:** Vertical videos, talking heads, jerky footage, copyrighted content

---

## 🎬 PROFESSIONAL TIPS

### **Match Mood to Section**
- Hero = Wide aerial drone (epic feel)
- Downtown = Vertical buildings, fast city pace
- Marina = Slow boat/water shots, luxury feel
- Palm = Wide aerial, exclusive/serene
- Creek = Modern, futuristic shots

### **Keep Videos Consistent**
- Similar color grading (warm sunset, blue hour, etc.)
- Similar movement style
- Similar quality

### **File Size**
- Pexels videos auto-optimize
- No need to download/host yourself
- They use fast CDN globally

---

## 🚨 TROUBLESHOOTING

### **Video won't play?**
- Check URL is correct (no typos)
- Make sure URL ends in `.mp4`
- Test URL in browser directly first

### **Video loads slow?**
- Use lower resolution (`hd_1920_1080` instead of `uhd_2560_1440`)
- Or shorter video clips

### **Video looks dark?**
- The overlay darkens it intentionally
- For brighter video: edit `globals.css` line ~190
- Change `brightness(0.6)` to `brightness(0.8)`

---

## 💎 PREMIUM OPTIONS (Paid)

If you want truly cinematic, professional Dubai videos:

1. **Storyblocks** - https://www.storyblocks.com/
2. **Artgrid** - https://artgrid.io/
3. **Shutterstock** - https://www.shutterstock.com/
4. **Hire a drone operator in Dubai** - Get exclusive footage

---

## 📝 CURRENT VIDEO LIST

These are the videos currently on your site:

### Hero:
1. Dubai Marina aerial
2. Downtown / Burj Khalifa
3. Palm Jumeirah aerial
4. Dubai night cityscape

### Cinematic Sections:
1. Downtown - Burj Khalifa
2. Marina - Marina aerial
3. Palm - Palm Jumeirah
4. Creek Harbour - Night cityscape

---

**Happy filming! 🎬**

*Need help finding videos? Just ask your developer!*
