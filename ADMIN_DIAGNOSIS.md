# 🩺 ADMIN DIAGNOSTIC GUIDE

If you added a property in admin but it doesn't show on the public site, follow these steps **in order**.

---

## ✅ STEP 1 — Verify Your Property Was Actually Saved

1. Go to **`/admin/properties`** (the admin properties list)
2. Look for your property — is it in the list?

### **If NO** → Your property never saved!
- Did you click "Save Changes" or "Create Property"?
- Did you see any red error message?
- Most common errors:
  - ❌ **"Slug is required"** → Add a URL slug (e.g., `my-villa-marina`)
  - ❌ **"A property with slug X already exists"** → Use a different slug
  - ❌ **"Permission denied"** → You're not logged in. Go to `/admin/login`

### **If YES** → Continue to Step 2

---

## ✅ STEP 2 — Verify the Property Settings

Click on your property in the admin to edit it. **Check these critical fields:**

| Field | Required Value |
|-------|---------------|
| **Title** | ✅ Must have one |
| **Slug** | ✅ Lowercase, hyphens only (e.g., `my-villa-1`) |
| **Location** | ✅ Must have one |
| **Category** | ✅ MUST be `sale`, `rent`, OR `off-plan` |
| **Hidden** | ❌ Must be **UNCHECKED** (visible) |
| **Cover Image** | ✅ Should have one |

**Most common reason properties don't show: `Hidden` was accidentally checked!**

---

## ✅ STEP 3 — Visit the Right URL

Properties only show on pages that match their category:

| Category in admin | Public URL |
|-------------------|------------|
| `sale` | `https://yoursite.com/properties` |
| `rent` | `https://yoursite.com/rent` |
| `off-plan` | `https://yoursite.com/off-plan` |

A "rent" property will NEVER show on `/properties` (Buy page)!

---

## ✅ STEP 4 — Hard Refresh the Page

Browsers cache old pages. Force refresh:
- **Windows**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

---

## ✅ STEP 5 — Check Browser Console

If still not showing, open DevTools (F12) → Console tab. Look for errors:

- **"Citiway: Loaded X properties from admin..."** ✓ Working
- **"Citiway: No properties in admin for X yet..."** → Empty database
- **"Citiway: Supabase error..."** → Connection problem (env vars)
- **"Citiway: Connection error..."** → Network problem

---

## ✅ STEP 6 — Verify Vercel Environment Variables

If you deployed to Vercel and admin works locally but not on production:

1. Go to **vercel.com → your project → Settings → Environment Variables**
2. Verify these EXIST:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<your-project-ref>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_...`
3. If missing → add them
4. Go to **Deployments → click latest → Redeploy**

---

## 🔍 STEP 7 — Verify in Supabase Directly

1. Go to **https://supabase.com/dashboard/project/<your-project-ref>/editor**
2. Click on the **`properties`** table
3. Find your property
4. Check:
   - Is `hidden` set to `false`?
   - Is `category` set correctly?
   - Is `slug` correct?

If the row doesn't exist there → it was never saved (go back to Step 1).

---

## 💡 PRO TIPS

### **Quickly Check What's Live**

Add this to your URL: `?debug=true`

Example: `https://yoursite.com/rent?debug=true`

(Then open browser console and you'll see all the load logs)

### **Clear Form & Retry**

If the form is acting weird:
1. Click "Cancel" or navigate away
2. Refresh the page
3. Start fresh — don't paste in browser cache

### **The Magic of Merge**

The site now shows **BOTH** your admin properties AND the sample/seed properties.
- Admin properties always appear FIRST
- Sample properties fill in below
- This means the page never looks empty even if admin is empty

---

## 🆘 STILL NOT WORKING?

Check this checklist:
- [ ] Property has `category` = `sale` / `rent` / `off-plan`
- [ ] Property has `hidden` = `false`
- [ ] Property has `title`, `slug`, `location` filled in
- [ ] You visited the correct page (`/properties` for sale, `/rent` for rent, etc.)
- [ ] You hard-refreshed (Ctrl+Shift+R)
- [ ] You're logged out (test as a regular visitor)
- [ ] Vercel env vars are set (if deployed)

If after ALL THIS it still doesn't work, send me a screenshot of:
1. Your property in admin (showing all the fields)
2. The browser console errors
3. The page where you expect to see the property

---

**Most likely culprit: `hidden` was accidentally checked OR the wrong `category` was selected!** 👑
