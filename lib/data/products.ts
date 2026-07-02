import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/database";

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("best_seller", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getNewArrivals(limit = 4): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("new_arrival", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getAllProducts(params?: {
  category?: string;
  search?: string;
  sort?: "newest" | "price-asc" | "price-desc";
  filter?: "best-sellers" | "new";
}): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from("products").select("*");

  if (params?.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }
  if (params?.search) {
    query = query.ilike("name", `%${params.search}%`);
  }
  if (params?.filter === "best-sellers") {
    query = query.eq("best_seller", true);
  } else if (params?.filter === "new") {
    query = query.eq("new_arrival", true);
  }
  if (params?.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (params?.sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data } = await query;
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 4
): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);
  return data ?? [];
}

export async function getCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("category");
  const unique = Array.from(new Set((data ?? []).map((p) => p.category)));
  return unique;
}
