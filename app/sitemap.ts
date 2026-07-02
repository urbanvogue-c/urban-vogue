import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/data/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticRoutes = ["", "/shop", "/cart", "/contact"].map((path) => ({
    url: `https://urbanvogue.store${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `https://urbanvogue.store/shop/${p.slug}`,
    lastModified: new Date(p.created_at),
  }));

  return [...staticRoutes, ...productRoutes];
}
