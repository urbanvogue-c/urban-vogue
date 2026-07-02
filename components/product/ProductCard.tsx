import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-smoke/5">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-silver text-xs uppercase tracking-label">
            No Image
          </div>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-paper text-ink text-[10px] uppercase tracking-label px-3 py-1.5">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="eyebrow mb-1">{product.category}</p>
          <h3 className="font-display text-lg leading-snug">{product.name}</h3>
        </div>
        <p className="text-sm tabular-nums pt-1 whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
