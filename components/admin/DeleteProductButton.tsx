"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/app/admin/(dashboard)/actions";

export default function DeleteProductButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    startTransition(() => deleteProduct(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-xs uppercase tracking-wide2 text-red-700 border-b border-red-700 pb-0.5 disabled:opacity-40"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
