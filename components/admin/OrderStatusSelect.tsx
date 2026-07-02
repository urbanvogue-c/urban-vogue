"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/(dashboard)/actions";
import type { OrderStatus } from "@/types/database";

const OPTIONS: OrderStatus[] = ["new", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => updateOrderStatus(orderId, e.target.value as OrderStatus))
      }
      className="border border-silver/50 bg-transparent px-4 py-3 text-sm capitalize focus:outline-none focus:border-ink"
    >
      {OPTIONS.map((opt) => (
        <option key={opt} value={opt} className="capitalize">
          {opt}
        </option>
      ))}
    </select>
  );
}
