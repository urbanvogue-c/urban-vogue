"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/types/database";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
// @ts-ignore
  await supabase.from("orders").update({ status }).eq("id", orderId);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProduct(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string) || null;
  const category = (formData.get("category") as string).trim();
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const sizes = (formData.get("sizes") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const image_url = (formData.get("image_url") as string) || null;
  const images = (formData.get("images") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";
  const best_seller = formData.get("best_seller") === "on";
  const new_arrival = formData.get("new_arrival") === "on";

  const payload = {
    name,
    slug: slugify(name),
    description,
    category,
    price,
    stock,
    sizes,
    image_url,
    images,
    featured,
    best_seller,
    new_arrival,
  };

  if (id) {
    await supabase.from("products").update(payload).eq("id", id);
  } else {
    await supabase.from("products").insert(payload);
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/products");
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const store_name = (formData.get("store_name") as string).trim();
  const notification_email = (formData.get("notification_email") as string).trim();

  await supabase.from("settings").update({ store_name, notification_email }).eq("id", id);
  revalidatePath("/admin/settings");
}
