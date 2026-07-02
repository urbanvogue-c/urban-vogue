import Link from "next/link";
import { getDashboardStats } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Total Orders", value: stats.totalOrders.toLocaleString() },
    { label: "Total Revenue", value: formatPrice(stats.totalRevenue) },
    { label: "Total Products", value: stats.totalProducts.toLocaleString() },
  ];

  return (
    <div>
      <p className="eyebrow mb-3">Overview</p>
      <h1 className="font-display text-3xl mb-10">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-6 mb-14">
        {cards.map((card) => (
          <div key={card.label} className="border border-silver/40 p-6">
            <p className="eyebrow mb-3">{card.label}</p>
            <p className="font-display text-3xl tabular-nums">{card.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="eyebrow">Best Sellers</h2>
          <Link
            href="/admin/products"
            className="text-xs uppercase tracking-wide2 border-b border-ink pb-0.5"
          >
            Manage Products
          </Link>
        </div>

        {stats.bestSellers.length === 0 ? (
          <p className="text-sm text-graphite">
            No products marked as best sellers yet.
          </p>
        ) : (
          <div className="border border-silver/40 divide-y divide-silver/30">
            {stats.bestSellers.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm">{p.name}</p>
                  <p className="text-xs text-graphite">{p.category}</p>
                </div>
                <p className="text-sm tabular-nums">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
