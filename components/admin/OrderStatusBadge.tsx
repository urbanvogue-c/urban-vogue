import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/database";

const LABELS: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "text-[10px] uppercase tracking-label px-3 py-1.5 border shrink-0",
        status === "delivered" && "bg-ink text-paper border-ink",
        status === "cancelled" && "border-red-700 text-red-700",
        status !== "delivered" && status !== "cancelled" && "border-silver/60 text-graphite"
      )}
    >
      {LABELS[status]}
    </span>
  );
}
