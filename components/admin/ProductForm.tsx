import { saveProduct } from "@/app/admin/(dashboard)/actions";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Product } from "@/types/database";

export default function ProductForm({ product }: { product?: Product }) {
  return (
    <form action={saveProduct} className="flex flex-col gap-6 max-w-xl">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div>
        <label className="eyebrow mb-2 block">Product Name</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="eyebrow mb-2 block">Category</label>
          <input
            name="category"
            required
            defaultValue={product?.category}
            placeholder="e.g. Outerwear"
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Price (USD)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="eyebrow mb-2 block">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product?.stock ?? 0}
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Sizes (comma-separated)</label>
          <input
            name="sizes"
            defaultValue={product?.sizes?.join(", ") ?? ""}
            placeholder="S, M, L, XL"
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      <ImageUploader
        label="Main Image"
        fieldName="image_url"
        initialUrls={product?.image_url ? [product.image_url] : []}
      />

      <ImageUploader
        label="Gallery Images"
        fieldName="images"
        initialUrls={product?.images ?? []}
        multiple
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="best_seller" defaultChecked={product?.best_seller} />
          Best Seller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="new_arrival" defaultChecked={product?.new_arrival} />
          New Arrival
        </label>
      </div>

      <button type="submit" className="btn-primary self-start">
        {product ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
