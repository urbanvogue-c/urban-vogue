import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderById(id);
  if (!result) notFound();
  const { order, items } = result;

  return (
    <div>
      <p className="eyebrow mb-3">Order</p>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">{order.order_number}</h1>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="eyebrow mb-4">Customer</h2>
          <div className="text-sm space-y-1.5">
            <p>{order.customer_name}</p>
            <p className="text-graphite">{order.customer_phone}</p>
            <p className="text-graphite">{order.wilaya}</p>
            <p className="text-graphite">{order.customer_address}</p>
            {order.notes && (
              <p className="text-graphite pt-2 italic">Note: {order.notes}</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="eyebrow mb-4">Order Info</h2>
          <div className="text-sm space-y-1.5">
            <p className="text-graphite">
              Placed {new Date(order.created_at).toLocaleString()}
            </p>
            <p className="text-graphite">Payment: Cash on Delivery</p>
          </div>
        </div>
      </div>

      <h2 className="eyebrow mb-4">Items</h2>
      <div className="border border-silver/40 divide-y divide-silver/30 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm">{item.product_name}</p>
              <p className="text-xs text-graphite">
                {item.size ? `Size ${item.size} · ` : ""}Qty {item.quantity}
              </p>
            </div>
            <p className="text-sm tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <p className="font-display text-xl">
          Total: {formatPrice(order.total_price)}
        </p>
      </div>
    </div>
  );
}
