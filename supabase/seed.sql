-- ═══════════════════════════════════════════════════════════════
-- URBAN VOGUE — SAMPLE SEED DATA (optional)
-- Run after schema.sql if you want placeholder products to preview
-- the storefront before uploading real photography.
-- Replace image_url values with real Supabase Storage URLs once you've
-- uploaded product photography to the `products` bucket.
-- ═══════════════════════════════════════════════════════════════

insert into products (name, slug, description, category, price, stock, image_url, sizes, featured, best_seller, new_arrival)
values
  ('Legacy Wool Overcoat', 'legacy-wool-overcoat',
   'A structured silhouette in double-faced wool, built for decades of wear.',
   'Outerwear', 420.00, 12, null, array['S','M','L','XL'], true, true, false),

  ('Signature Crewneck', 'signature-crewneck',
   'Heavyweight cotton fleece with a tonal embroidered UV monogram.',
   'Knitwear', 165.00, 30, null, array['XS','S','M','L','XL'], true, true, true),

  ('Tailored Wide-Leg Trouser', 'tailored-wide-leg-trouser',
   'Italian wool-blend trouser with a fluid drape and clean waistband.',
   'Trousers', 210.00, 18, null, array['28','30','32','34','36'], true, false, true),

  ('Minimal Leather Tote', 'minimal-leather-tote',
   'Full-grain leather tote with an interior UV-stamped lining.',
   'Accessories', 340.00, 8, null, array[]::text[], true, false, false),

  ('Essential Oxford Shirt', 'essential-oxford-shirt',
   'Crisp cotton oxford with mother-of-pearl buttons and a clean collar.',
   'Shirts', 128.00, 25, null, array['S','M','L','XL'], false, true, false),

  ('Structured Bomber', 'structured-bomber',
   'A cropped, precision-tailored bomber in matte technical fabric.',
   'Outerwear', 385.00, 10, null, array['S','M','L'], false, true, true),

  ('Classic Straight Denim', 'classic-straight-denim',
   'Rigid Japanese selvedge denim with a clean straight leg.',
   'Denim', 190.00, 22, null, array['28','30','32','34','36'], false, false, true),

  ('Silk Pocket Square', 'silk-pocket-square',
   'Hand-rolled mulberry silk square with a subtle UV monogram corner.',
   'Accessories', 65.00, 40, null, array[]::text[], false, false, true);
