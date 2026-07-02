import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminProductById } from "@/lib/data/admin";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductById(id);
  if (!product) notFound();

  return (
    <div>
      <p className="eyebrow mb-3">Manage</p>
      <h1 className="font-display text-3xl mb-10">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
