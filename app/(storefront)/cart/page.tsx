"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="pt-40 pb-32 text-center">
        <p className="eyebrow mb-4">Your Bag</p>
        <h1 className="font-display text-3xl md:text-4xl mb-8">
          Your bag is empty
        </h1>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container-fluid">
        <p className="eyebrow mb-3">Your Bag</p>
        <h1 className="font-display text-4xl md:text-5xl mb-14">Shopping Bag</h1>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 flex flex-col divide-y divide-silver/30">
            {lines.map((line) => (
              <div
                key={`${line.productId}-${line.size ?? "nosize"}`}
                className="flex gap-5 py-8 first:pt-0"
              >
                <div className="relative h-32 w-24 shrink-0 bg-smoke/5 overflow-hidden">
                  {line.image && (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link
                        href={`/shop/${line.slug}`}
                        className="font-display text-lg hover:opacity-60 transition-opacity"
                      >
                        {line.name}
                      </Link>
                      {line.size && (
                        <p className="text-xs text-graphite mt-1">
                          Size {line.size}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(line.productId, line.size)}
                      aria-label="Remove item"
                      className="text-graphite hover:text-ink transition-colors"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-silver/50">
                      <button
                        onClick={() =>
                          updateQuantity(line.productId, line.size, line.quantity - 1)
                        }
                        className="p-2.5 hover:bg-smoke/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(line.productId, line.size, line.quantity + 1)
                        }
                        className="p-2.5 hover:bg-smoke/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-sm tabular-nums">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-silver/40 p-8">
              <h2 className="eyebrow mb-6">Order Summary</h2>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-graphite">Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-6">
                <span className="text-graphite">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="hairline pt-6 flex justify-between text-base mb-8">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <Link href="/checkout" className="btn-primary w-full">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
