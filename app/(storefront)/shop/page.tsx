import ProductCard from "@/components/product/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import { getAllProducts, getCategories } from "@/lib/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the full Urban Vogue collection.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: "newest" | "price-asc" | "price-desc";
    filter?: "best-sellers" | "new";
  }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(params),
    getCategories(),
  ]);

  const heading =
    params.filter === "best-sellers"
      ? "Best Sellers"
      : params.filter === "new"
      ? "New Arrivals"
      : "The Collection";

  return (
    <div className="pt-32 pb-24">
      <div className="container-fluid">
        <div className="mb-12">
          <p className="eyebrow mb-3">Shop</p>
          <h1 className="font-display text-4xl md:text-5xl">{heading}</h1>
        </div>

        <ShopFilters categories={categories} />

        {products.length === 0 ? (
          <p className="text-graphite text-sm py-20 text-center">
            No pieces match your search. Try a different filter.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
