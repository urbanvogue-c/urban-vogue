import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/home/Reveal";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: product.image_url ? { images: [product.image_url] } : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.id);
  const images = product.images?.length
    ? product.images
    : product.image_url
    ? [product.image_url]
    : [];

  return (
    <div className="pt-32 pb-24">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={images} name={product.name} />

          <div className="lg:max-w-md">
            <p className="eyebrow mb-3">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl mb-4">
              {product.name}
            </h1>
            <p className="text-xl mb-8 tabular-nums">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-graphite text-sm leading-relaxed mb-10">
                {product.description}
              </p>
            )}

            <AddToCartPanel product={product} />

            <div className="hairline mt-10 pt-6">
              <p className="text-xs text-graphite leading-relaxed">
                Cash on Delivery available nationwide. Orders are prepared
                with care and typically ship within 2–4 business days.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <Reveal className="mb-12">
              <p className="eyebrow mb-3">You May Also Like</p>
              <h2 className="font-display text-3xl">Complete the Look</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
