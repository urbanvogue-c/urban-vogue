"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartProvider";
import { WILAYAS } from "@/lib/checkout/wilayas";

export default function CheckoutForm() {
  const router = useRouter();
  const { lines, clear } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    wilaya: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (lines.length === 0) {
      setError("Your bag is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lines: lines.map((l) => ({
            productId: l.productId,
            size: l.size,
            quantity: l.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      clear();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="eyebrow mb-2 block">Full Name</label>
        <input
          required
          value={form.customerName}
          onChange={(e) => update("customerName", e.target.value)}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Phone Number</label>
        <input
          required
          type="tel"
          value={form.customerPhone}
          onChange={(e) => update("customerPhone", e.target.value)}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Wilaya</label>
        <select
          required
          value={form.wilaya}
          onChange={(e) => update("wilaya", e.target.value)}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors"
        >
          <option value="" disabled>
            Select your wilaya
          </option>
          {WILAYAS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="eyebrow mb-2 block">Address</label>
        <textarea
          required
          rows={3}
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Notes (Optional)</label>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Delivery instructions, gift note, etc."
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Payment Method</label>
        <div className="border border-ink bg-ink/5 px-4 py-3.5 text-sm flex items-center justify-between">
          <span>Cash on Delivery</span>
          <span className="h-2 w-2 rounded-full bg-ink" />
        </div>
        <p className="text-xs text-graphite mt-2">
          Pay in cash when your order arrives. No online payment required.
        </p>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full mt-2">
        {submitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
