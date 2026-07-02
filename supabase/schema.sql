-- ═══════════════════════════════════════════════════════════════
-- URBAN VOGUE — SUPABASE SCHEMA
-- Run this once in the Supabase SQL editor on a fresh project.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- PRODUCTS
-- ─────────────────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  images text[] default '{}',
  sizes text[] default '{}',
  featured boolean not null default false,
  best_seller boolean not null default false,
  new_arrival boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_category on products (category);
create index if not exists idx_products_featured on products (featured) where featured = true;
create index if not exists idx_products_best_seller on products (best_seller) where best_seller = true;
create index if not exists idx_products_new_arrival on products (new_arrival) where new_arrival = true;

-- ─────────────────────────────────────────────────────────────
-- CUSTOMERS
-- ─────────────────────────────────────────────────────────────
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  address text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_customers_phone on customers (phone);

-- ─────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  wilaya text not null,
  notes text,
  total_price numeric(10,2) not null check (total_price >= 0),
  status text not null default 'new'
    check (status in ('new','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_status on orders (status);
create index if not exists idx_orders_created_at on orders (created_at desc);

-- ─────────────────────────────────────────────────────────────
-- ORDER ITEMS
-- ─────────────────────────────────────────────────────────────
create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  size text,
  quantity integer not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0)
);

create index if not exists idx_order_items_order_id on order_items (order_id);

-- ─────────────────────────────────────────────────────────────
-- SETTINGS  (single row, edited from /admin/settings)
-- ─────────────────────────────────────────────────────────────
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  store_name text not null default 'Urban Vogue',
  notification_email text not null default 'urbanvogue.store@gmail.com',
  created_at timestamptz not null default now()
);

insert into settings (store_name, notification_email)
select 'Urban Vogue', 'urbanvogue.store@gmail.com'
where not exists (select 1 from settings);

-- ─────────────────────────────────────────────────────────────
-- ORDER NUMBER GENERATOR — e.g. UV-20260701-0007
-- ─────────────────────────────────────────────────────────────
create sequence if not exists order_number_seq;

create or replace function generate_order_number()
returns text
language plpgsql
as $$
declare
  next_val bigint;
begin
  next_val := nextval('order_number_seq');
  return 'UV-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(next_val::text, 4, '0');
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Public (anon) visitors may READ products only.
-- Public may INSERT orders + order_items (checkout, no login required)
--   but may not read, update, or delete them back.
-- Authenticated admins (Supabase Auth users) get full access to everything.
-- ─────────────────────────────────────────────────────────────
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table customers enable row level security;
alter table settings enable row level security;

-- products: public read, admin write
create policy "products are publicly readable"
  on products for select
  to anon, authenticated
  using (true);

create policy "admins manage products"
  on products for all
  to authenticated
  using (true)
  with check (true);

-- orders: public can create, only admins can read/update/delete
create policy "anyone can place an order"
  on orders for insert
  to anon, authenticated
  with check (true);

create policy "admins read orders"
  on orders for select
  to authenticated
  using (true);

create policy "admins update orders"
  on orders for update
  to authenticated
  using (true)
  with check (true);

create policy "admins delete orders"
  on orders for delete
  to authenticated
  using (true);

-- order_items: same shape as orders
create policy "anyone can add order items at checkout"
  on order_items for insert
  to anon, authenticated
  with check (true);

create policy "admins read order items"
  on order_items for select
  to authenticated
  using (true);

create policy "admins manage order items"
  on order_items for all
  to authenticated
  using (true)
  with check (true);

-- customers: public can create, only admins can read
create policy "anyone can register as a customer at checkout"
  on customers for insert
  to anon, authenticated
  with check (true);

create policy "admins read customers"
  on customers for select
  to authenticated
  using (true);

-- settings: admins only, in both directions
create policy "admins read settings"
  on settings for select
  to authenticated
  using (true);

create policy "admins update settings"
  on settings for update
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────────
-- STORAGE BUCKETS
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('products', 'products', true),
  ('brand-assets', 'brand-assets', true),
  ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

create policy "public can view product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('products', 'brand-assets', 'hero-images'));

create policy "admins upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('products', 'brand-assets', 'hero-images'));

create policy "admins update their uploads"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('products', 'brand-assets', 'hero-images'));

create policy "admins delete uploads"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('products', 'brand-assets', 'hero-images'));
