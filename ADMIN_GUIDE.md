# 🏢 CITIWAY ADMIN PANEL — SETUP GUIDE

**Welcome to your professional admin panel!** This guide walks you through the entire setup in **15 minutes**.

---

## 📋 BEFORE YOU START

You'll need:
- ✅ Your project folder open in VS Code
- ✅ A web browser (Chrome recommended)
- ✅ Git Bash (or any terminal)

---

# 🚀 PART 1: SUPABASE SETUP (5 minutes)

### **Step 1: Create Free Supabase Account**

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign in with GitHub (easiest)

### **Step 2: Create the Project**

Click **"New Project"** and fill in:
- **Name:** `citiway-admin`
- **Database Password:** *Pick a strong one and SAVE IT!*
- **Region:** `Middle East (UAE) - me-central-1` (Dubai region!)
- **Pricing Plan:** `Free`

Click **"Create new project"** → Wait ~2 minutes.

### **Step 3: Run the Database Setup**

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open the file `SUPABASE_SETUP.sql` from this project
4. **Copy ALL the content** and paste into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see: ✅ "Success. No rows returned"

### **Step 4: Get Your API Keys**

1. Click **"Project Settings"** (gear icon, bottom left)
2. Click **"API"**
3. Copy these two values:

```
Project URL:  https://xxxxxxxx.supabase.co
anon public:  eyJhbGciOi....(very long key)
```

### **Step 5: Create Your Admin User**

1. Go to **"Authentication"** → **"Users"** (left sidebar)
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email:** `your-email@example.com`
   - **Password:** *Pick a strong password*
   - ✅ Check **"Auto Confirm User"**
4. Click **"Create user"**

**This is YOUR login** for the admin panel!

---

# 💻 PART 2: PROJECT SETUP (5 minutes)

### **Step 1: Add Environment Variables**

1. In your project folder, find the file `.env.example`
2. **Make a copy** named `.env.local`
3. Open `.env.local` and replace with YOUR values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-real-key
```

4. **Save the file**

### **Step 2: Install the New Package**

In Git Bash, in your project folder:

```bash
npm install
```

This installs `@supabase/supabase-js` (~10 seconds).

### **Step 3: Test Locally**

```bash
npm run dev
```

Open: **http://localhost:3000/admin/login**

Sign in with the email/password you created in Supabase!

---

# 🎉 PART 3: USING THE ADMIN PANEL

### **Dashboard** — `/admin`
- See all your stats at a glance
- Quick links to add properties, view leads
- Recent activity feed

### **Properties** — `/admin/properties`
- ✅ See all properties in a beautiful grid
- ✅ Search by title, location, developer
- ✅ Filter: Off-Plan / Sale / Rent / Featured / Hidden
- ✅ Click ⭐ to feature/unfeature
- ✅ Click 👁️ to hide/show
- ✅ Edit, View, or Delete

### **Add New Property** — `/admin/properties/new`
- Beautiful tabbed form:
  - 📝 Basic Info
  - 💰 Pricing & Specs
  - 🖼️ Images (drag & drop upload!)
  - 📋 Description
  - ✨ Features & Amenities
  - 💳 Payment & Location
- All fields properly labeled with hints
- Click "Create Property" → It's LIVE!

### **Developers** — `/admin/developers`
- Add Emaar, Nakheel, Damac, etc.
- Upload logos and cover images

### **Leads** — `/admin/leads`
- See all customer inquiries
- Update status: New → Contacted → Qualified → Converted
- One-click email reply or WhatsApp

### **Settings** — `/admin/settings`
- Change your password
- View account info

---

# 🌐 PART 4: DEPLOYMENT (5 minutes)

### **Step 1: Push to GitHub**

```bash
git add .
git commit -m "Add admin panel with Supabase"
git push
```

### **Step 2: Add Environment Variables to Vercel**

1. Go to **vercel.com** → Your project
2. Click **Settings** → **Environment Variables**
3. Add these two:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` |

4. Click **"Save"**
5. Go to **Deployments** → Click the latest → **"Redeploy"**

### **Step 3: You're LIVE!**

Your admin panel is now accessible at:
- **https://your-site.vercel.app/admin/login**

---

# 🎯 QUICK REFERENCE

## URLs:
| Page | URL |
|------|-----|
| Login | `/admin/login` |
| Dashboard | `/admin` |
| Properties | `/admin/properties` |
| Add Property | `/admin/properties/new` |
| Edit Property | `/admin/properties/[slug]` |
| Developers | `/admin/developers` |
| Leads | `/admin/leads` |
| Settings | `/admin/settings` |

## Common Tasks:

### **Add a property:**
1. Click "Add Property" button
2. Fill in tabs
3. Upload images (drag & drop)
4. Click "Create Property"
5. Done! ✅

### **Edit a property:**
1. Properties → Click ✏️ Edit
2. Make changes
3. Click "Save Changes"

### **Hide a property without deleting:**
1. Properties → Click 👁️ "Visible" toggle
2. It changes to "Hidden"
3. Won't show on website but stays in database

### **Feature a property on homepage:**
1. Properties → Click ☆ Feature
2. It changes to ⭐ Featured
3. Now shows on homepage

### **Delete a property forever:**
1. Properties → Click 🗑️
2. Confirm deletion
3. Gone forever (cannot undo!)

### **Reply to a lead:**
1. Leads → Click on a lead
2. Click "Reply via Email" or "WhatsApp"
3. Update status when done

---

# 🆘 TROUBLESHOOTING

### **"Invalid login credentials"**
- Make sure you created a user in Supabase Auth
- Double-check email and password
- Email must be confirmed (check "Auto Confirm" when creating)

### **"Failed to load properties"**
- Check `.env.local` has correct values
- Make sure you ran the SQL setup
- Restart `npm run dev`

### **Images won't upload**
- Check the SQL setup ran successfully
- Make sure storage bucket "images" exists in Supabase

### **Properties don't show on the live site**
- They're in the database, but the public site code still uses `properties.js`
- **Next step:** I can update the public site to read from Supabase too!

---

# 🎁 WHAT'S NEXT?

Once you're comfortable with the admin panel, ask me to:

1. **Connect the public site to Supabase** — so properties added in admin show on the website automatically
2. **Add multiple admin users** — for your team
3. **Add agent assignments** — so each property has a dedicated agent
4. **Email notifications** — get notified when new leads come in
5. **Analytics dashboard** — track views per property
6. **Image optimization** — automatic resizing for fast loading
7. **CSV import/export** — bulk add properties from Excel

---

**You're now running a professional real estate platform! 👑🏢**

*Need help? Just ask!*
