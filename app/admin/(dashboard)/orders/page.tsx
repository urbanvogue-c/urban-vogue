import Link from "next/link";
import { getOrders } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import OrderFilters from "@/components/admin/OrderFilters";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const orders = await getOrders(params.status, params.search);

  return (
    <div>
      <p className="eyebrow mb-3">Manage</p>
      <h1 className="font-display text-3xl mb-10">Orders</h1>

      <OrderFilters />

      {orders.length === 0 ? (
        <p className="text-sm text-graphite mt-8">No orders match your filters.</p>
      ) : (
        <div className="border border-silver/40 divide-y divide-silver/30 mt-8">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-smoke/5 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm">{order.order_number}</p>
                <p className="text-xs text-graphite">
                  {order.customer_name} · {order.wilaya}
                </p>
              </div>
              <p className="text-sm tabular-nums w-20 text-right">
                {formatPrice(order.total_price)}
              </p>
              <OrderStatusBadge status={order.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
