export type OrderStatus =
  | "new"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  stock: number;
  image_url: string | null;
  images: string[] | null;
  sizes: string[] | null;
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  slug: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  wilaya: string;
  notes: string | null;
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  size: string | null;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Settings {
  id: string;
  store_name: string;
  notification_email: string;
  created_at: string;
}

// Minimal Supabase Database generic — enough for the typed client.
// Regenerate with `supabase gen types typescript` once the project is live
// for full type safety, and swap this file out.
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Partial<Product> & Pick<Product, "name" | "category" | "price">;
        Update: Partial<Product>;
      };
      orders: {
        Row: Order;
        Insert: Partial<Order> &
          Pick<
            Order,
            | "order_number"
            | "customer_name"
            | "customer_phone"
            | "customer_address"
            | "wilaya"
            | "total_price"
          >;
        Update: Partial<Order>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Partial<OrderItem> &
          Pick<OrderItem, "order_id" | "product_id" | "quantity" | "price">;
        Update: Partial<OrderItem>;
      };
      customers: {
        Row: Customer;
        Insert: Partial<Customer> & Pick<Customer, "name" | "phone" | "address">;
        Update: Partial<Customer>;
      };
      settings: {
        Row: Settings;
        Insert: Partial<Settings> & Pick<Settings, "store_name" | "notification_email">;
        Update: Partial<Settings>;
      };
    };
  };
}
