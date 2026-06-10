# JLX Performance — Web App (PWA)

Works in any browser. Installs on Android home screen like a native app.
Zero native setup — no Expo, no Android SDK, no local build required.

---

## Run it from your Android phone (GitHub Codespaces)

### Step 1 — Upload to GitHub
1. Go to **github.com** on your phone browser
2. Create a free account (or log in)
3. Click **+** → **New repository** → name it `jlx-performance-web` → Create
4. Click **uploading an existing file** → upload everything from this zip

### Step 2 — Open Codespaces
1. On your repo page → green **Code** button → **Codespaces** tab → **Create codespace**
2. A VS Code editor opens in your browser (free, no install)
3. In the bottom terminal panel, run:
```bash
npm install
```

### Step 3 — Add your Supabase keys
1. In the file explorer (left panel) → create a file called `.env`
2. Add your credentials (get these from supabase.com → your project → Settings → API):
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_COACH_ID=your-coach-user-uuid-here
```

### Step 4 — Run the app
```bash
npm run dev
```
Codespaces will show a popup: **"Open in Browser"** → tap it.
Your app is live! You'll see the JLX login screen.

### Step 5 — Create your Supabase database
1. Go to **supabase.com** → your project → **SQL Editor**
2. Create a new query → paste the contents of `supabase/migrations/001_initial.sql`
3. Click **Run**

### Step 6 — Create your coach account
1. Sign up in the app with your email
2. In Supabase → **Table Editor** → `profiles` → find your row
3. Change `role` from `athlete` to `coach`
4. Copy your `id` → paste it as `VITE_COACH_ID` in your `.env`
5. Restart with `npm run dev`

---

## Deploy to Vercel (permanent live URL)

### From Codespaces terminal:
```bash
npm install -g vercel
npm run build
vercel --prod
```
Vercel will ask you to log in → follow the link.
When it asks for environment variables, add your 3 VITE_ keys.
You'll get a live URL like `jlx-performance.vercel.app`.

### Add to Android home screen:
1. Open your Vercel URL in Chrome
2. Tap the **⋮ menu** → **Add to Home screen**
3. Done — it opens like a native app, full screen, no browser bar

---

## Project structure
```
src/
  pages/          7 screens (Dashboard, Plan, Progress, Shop, Supplements, Messages, Profile)
  components/     TabBar + shared UI components
  lib/            Supabase client + Zustand store
  hooks/          useAuth
  constants/      Colors, fonts, spacing
  types/          TypeScript types
supabase/
  migrations/     Full database schema (run this first)
```

---

## Tech stack
- **Vite + React + TypeScript** — fast, zero config
- **React Router v6** — client-side navigation
- **Supabase** — auth, database, realtime messages
- **Recharts** — progress charts
- **Zustand** — global state
- **vite-plugin-pwa** — installable on Android/iOS

---

Coach Fares Jlassi · fares.jlassi4h@gmail.com · WA #LI 41383
