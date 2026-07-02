import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendOrderNotification } from "@/lib/email/sendOrderNotification";

interface CheckoutLine {
  productId: string;
  size: string | null;
  quantity: number;
}

interface CheckoutBody {
  customerName: string;
  customerPhone: string;
  wilaya: string;
  address: string;
  notes?: string;
  lines: CheckoutLine[];
}

export async function POST(req: Request) {
  try {
    const body: CheckoutBody = await req.json();

    if (
      !body.customerName?.trim() ||
      !body.customerPhone?.trim() ||
      !body.wilaya?.trim() ||
      !body.address?.trim() ||
      !body.lines?.length
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Re-price every line from the database — never trust client-sent prices.
    const productIds = body.lines.map((l) => l.productId);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, stock")
      .in("id", productIds);

    if (productsError || !products) {
      return NextResponse.json({ error: "Could not verify products." }, { status: 500 });
    }

    let total = 0;
    const orderItemsPayload: {
      product_id: string;
      product_name: string;
      size: string | null;
      quantity: number;
      price: number;
    }[] = [];

    for (const line of body.lines) {
      const product = products.find((p: { id: string }) => p.id === line.productId);
      if (!product) {
        return NextResponse.json(
          { error: "One of the items in your bag is no longer available." },
          { status: 409 }
        );
      }
      if (product.stock < line.quantity) {
        return NextResponse.json(
          { error: `${product.name} doesn't have enough stock left.` },
          { status: 409 }
        );
      }
      total += product.price * line.quantity;
      orderItemsPayload.push({
        product_id: product.id,
        product_name: product.name,
        size: line.size,
        quantity: line.quantity,
        price: product.price,
      });
    }

    // Generate a unique order number via the DB sequence-backed function.
    const { data: orderNumberData, error: orderNumberError } = await supabase.rpc(
      "generate_order_number"
    );
    if (orderNumberError || !orderNumberData) {
      return NextResponse.json({ error: "Could not generate order number." }, { status: 500 });
    }
    const orderNumber: string = orderNumberData;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: body.customerName.trim(),
        customer_phone: body.customerPhone.trim(),
        customer_address: body.address.trim(),
        wilaya: body.wilaya,
        notes: body.notes?.trim() || null,
        total_price: total,
        status: "new",
      })
      .select()
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Could not save your order." }, { status: 500 });
    }

    await supabase
      .from("order_items")
      .insert(orderItemsPayload.map((item) => ({ ...item, order_id: order.id })));

    // Decrement stock for each product ordered.
    for (const item of orderItemsPayload) {
      const product = products.find((p: { id: string }) => p.id === item.product_id);
      if (product) {
        await supabase
          .from("products")
          .update({ stock: product.stock - item.quantity })
          .eq("id", item.product_id);
      }
    }

    await supabase.from("customers").insert({
      name: body.customerName.trim(),
      phone: body.customerPhone.trim(),
      address: body.address.trim(),
    });

    // Fire-and-forget the notification email — a delivery failure here should
    // never block the customer's order confirmation.
    sendOrderNotification({
      orderNumber,
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      wilaya: body.wilaya,
      address: body.address.trim(),
      items: orderItemsPayload,
      total,
    }).catch((err) => console.error("Order notification email failed:", err));

    return NextResponse.json({ orderNumber });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
