import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/home/Reveal";
import type { Product } from "@/types/database";

export default function ProductRail({
  eyebrow,
  title,
  products,
  viewAllHref,
}: {
  eyebrow: string;
  title: string;
  products: Product[];
  viewAllHref: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container-fluid">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden sm:inline text-[13px] uppercase tracking-wide2 border-b border-ink pb-1 hover:opacity-60 transition-opacity"
          >
            View All
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
