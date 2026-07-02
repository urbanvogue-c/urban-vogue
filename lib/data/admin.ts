import { createClient } from "@/lib/supabase/server";
import type { Order, OrderItem, Product, Settings } from "@/types/database";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [{ count: totalOrders }, { count: totalProducts }, { data: orders }, { data: bestSellers }] =
    await Promise.all([
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("total_price"),
      supabase
        .from("products")
        .select("*")
        .eq("best_seller", true)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const totalRevenue = (orders ?? []).reduce((sum, o) => sum + Number(o.total_price), 0);

  return {
    totalOrders: totalOrders ?? 0,
    totalProducts: totalProducts ?? 0,
    totalRevenue,
    bestSellers: (bestSellers ?? []) as Product[],
  };
}

export async function getOrders(status?: string, search?: string): Promise<Order[]> {
  const supabase = await createClient();
  let query = supabase.from("orders").select("*").order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`
    );
  }

  const { data } = await query;
  return data ?? [];
}

export async function getOrderById(
  id: string
): Promise<{ order: Order; items: OrderItem[] } | null> {
  const supabase = await createClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();
  if (!order) return null;
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);
  return { order, items: items ?? [] };
}

export async function getAdminProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data ?? null;
}

export async function getSettings(): Promise<Settings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*").limit(1).single();
  return data ?? null;
}
