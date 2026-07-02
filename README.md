# Urban Vogue — Setup & Deployment Guide

A luxury e-commerce storefront + admin dashboard built with Next.js 15,
Supabase, and Tailwind CSS.

## 1. Install dependencies

```bash
npm install
```

## 2. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → **New Project**.
2. Once it's provisioned, open **SQL Editor** and run the contents of
   `supabase/schema.sql` — this creates every table, RLS policy, the storage
   buckets (`products`, `brand-assets`, `hero-images`), and the order-number
   generator function.
3. (Optional) Run `supabase/seed.sql` to add 8 sample products so the
   storefront isn't empty while you upload real photography.
4. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret —
     never expose it with a `NEXT_PUBLIC_` prefix)

## 3. Create your admin account

Supabase Auth manages the `/admin` login. Create your first admin user:

1. In the Supabase dashboard, go to **Authentication → Users → Add User**.
2. Enter your email + password, and set "Auto Confirm User" to on.
3. That's it — any user in this table can sign in at `/admin/login`. There's
   no separate "admin" role table; access to `/admin` is gated purely by
   being an authenticated Supabase user (see `middleware.ts`).

## 4. Set environment variables

Copy `.env.example` to `.env.local` and fill in the values from step 2:

```bash
cp .env.example .env.local
```

For email notifications, sign up at [resend.com](https://resend.com) (free
tier is generous), verify a sending domain, and add your `RESEND_API_KEY`.
Until you do, orders still save correctly — the app just logs a warning and
skips the email instead of failing the checkout.

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the storefront and
`http://localhost:3000/admin/login` for the dashboard.

## 6. Add your first products

Log into `/admin`, go to **Products → Add Product**, upload images (they go
straight into the `products` Storage bucket), and mark items as Featured /
Best Seller / New Arrival to have them appear in the matching Home page rails.

## 7. Set your notification email

In `/admin/settings`, confirm the **Notification Email** field — this is
where every new order's confirmation email is sent. It defaults to
`urbanvogue.store@gmail.com` from the seed data; change it to your real inbox.

## 8. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In the Vercel project's **Environment Variables**, add the same four
   values from your `.env.local`.
4. Deploy. Vercel auto-detects Next.js — no build config needed.
5. Once live, update `metadataBase` in `app/layout.tsx` and the hardcoded
   URLs in `app/sitemap.ts` / `app/robots.ts` if your final domain differs
   from `urbanvogue.store`.

## Project structure

```
app/
  (storefront)/        Public site — home, shop, product, cart, checkout, contact
  admin/
    login/              Public login page
    (dashboard)/        Protected: dashboard, products, orders, settings
  api/
    orders/             Checkout submission (re-prices server-side, emails admin)
    contact/            Contact form submission
components/             UI components, grouped by area
lib/
  supabase/             Browser + server Supabase clients, auth middleware
  data/                 Read queries (products, admin)
  cart/                 Client-side cart context (persisted to localStorage)
  email/                Resend order-notification sender
  checkout/              Wilaya list for the address form
supabase/
  schema.sql            Run this first — full DB schema + RLS + storage buckets
  seed.sql              Optional sample products
```

## Notes on what's genuinely production-ready vs. what to finish

- **Checkout & orders**: fully wired end-to-end — prices are re-validated
  server-side against the database (never trusted from the client), stock is
  decremented, and an order-notification email fires automatically.
- **Admin auth**: real Supabase Auth, middleware-protected.
- **Reviews section**: currently static curated copy (no `reviews` table was
  in the original spec). Ask if you'd like this made database-driven with
  admin moderation.
- **Newsletter form**: captures the email client-side with a success state
  but doesn't persist it yet — say the word if you want a
  `newsletter_subscribers` table + route handler added.
- **Product photography**: seed data ships with no images — upload real
  photos via `/admin/products` once live.
