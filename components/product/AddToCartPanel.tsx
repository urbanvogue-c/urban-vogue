"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";

export default function AddToCartPanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const sizes = product.sizes ?? [];
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const soldOut = product.stock <= 0;

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image_url,
        size,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8">
      {sizes.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-[48px] px-4 py-3 text-[13px] border transition-colors",
                  size === s
                    ? "bg-ink text-paper border-ink"
                    : "border-silver/50 hover:border-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">Quantity</p>
        <div className="inline-flex items-center border border-silver/50">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-smoke/5 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="p-3 hover:bg-smoke/5 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={soldOut}
        className={cn(
          "btn-primary w-full",
          soldOut && "opacity-40 pointer-events-none"
        )}
      >
        {soldOut ? "Sold Out" : added ? "Added to Bag" : "Add to Bag"}
      </button>

      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="text-[13px] uppercase tracking-wide2 border-b border-ink pb-1 self-start hover:opacity-60 transition-opacity"
        >
          View Bag
        </button>
      )}
    </div>
  );
}
