import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getAdminProducts } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="eyebrow mb-3">Manage</p>
          <h1 className="font-display text-3xl">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={14} className="mr-2" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-graphite">No products yet. Add your first piece.</p>
      ) : (
        <div className="border border-silver/40 divide-y divide-silver/30">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4">
              <div className="relative h-14 w-11 shrink-0 bg-smoke/5 overflow-hidden">
                {p.image_url && (
                  <Image src={p.image_url} alt={p.name} fill sizes="44px" className="object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{p.name}</p>
                <p className="text-xs text-graphite">
                  {p.category} · Stock: {p.stock}
                </p>
              </div>
              <p className="text-sm tabular-nums w-20 text-right">{formatPrice(p.price)}</p>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="text-xs uppercase tracking-wide2 border-b border-ink pb-0.5"
                >
                  Edit
                </Link>
                <DeleteProductButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
