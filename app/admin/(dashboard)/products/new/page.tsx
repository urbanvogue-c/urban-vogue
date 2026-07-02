import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <p className="eyebrow mb-3">Manage</p>
      <h1 className="font-display text-3xl mb-10">Add Product</h1>
      <ProductForm />
    </div>
  );
}
