"use client";

import Link from "next/link";
import Image from "next/image";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCart } from "@/lib/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="pt-40 pb-32 text-center">
        <p className="eyebrow mb-4">Checkout</p>
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
        <p className="eyebrow mb-3">Checkout</p>
        <h1 className="font-display text-4xl md:text-5xl mb-14">
          Delivery Details
        </h1>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <div className="border border-silver/40 p-8">
              <h2 className="eyebrow mb-6">Order Summary</h2>

              <div className="flex flex-col gap-5 mb-6">
                {lines.map((line) => (
                  <div
                    key={`${line.productId}-${line.size ?? "nosize"}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-16 w-12 shrink-0 bg-smoke/5 overflow-hidden">
                      {line.image && (
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex justify-between text-sm">
                      <div>
                        <p>{line.name}</p>
                        <p className="text-xs text-graphite mt-0.5">
                          {line.size ? `Size ${line.size} · ` : ""}Qty {line.quantity}
                        </p>
                      </div>
                      <p className="tabular-nums whitespace-nowrap">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hairline pt-6 flex justify-between text-base">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
