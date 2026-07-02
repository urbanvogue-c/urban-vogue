import Hero from "@/components/home/Hero";
import ProductRail from "@/components/home/ProductRail";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
import {
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
} from "@/lib/data/products";

export default async function HomePage() {
  const [featured, bestSellers, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getNewArrivals(),
  ]);

  return (
    <>
      <Hero />
      <ProductRail
        eyebrow="Curated"
        title="Featured Pieces"
        products={featured}
        viewAllHref="/shop"
      />
      <ProductRail
        eyebrow="Most Coveted"
        title="Best Sellers"
        products={bestSellers}
        viewAllHref="/shop?filter=best-sellers"
      />
      <ProductRail
        eyebrow="Just Landed"
        title="New Arrivals"
        products={newArrivals}
        viewAllHref="/shop?filter=new"
      />
      <Reviews />
      <Newsletter />
    </>
  );
}
