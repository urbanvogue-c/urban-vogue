import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";

interface OrderItemForEmail {
  product_name: string;
  size: string | null;
  quantity: number;
  price: number;
}

interface OrderNotificationInput {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  wilaya: string;
  address: string;
  items: OrderItemForEmail[];
  total: number;
}

export async function sendOrderNotification(input: OrderNotificationInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "RESEND_API_KEY is not set — skipping order notification email. " +
        "Set it in your environment to enable this."
    );
    return;
  }

  const supabase = createServiceClient();
  const { data: settings } = await supabase
    .from("settings")
    .select("notification_email, store_name")
    .limit(1)
    .single();

  const notificationEmail = settings?.notification_email;
  if (!notificationEmail) {
    console.warn("No notification_email configured in Settings — skipping email.");
    return;
  }

  const productList = input.items
    .map(
      (item) =>
        `- ${item.product_name}${item.size ? ` (Size ${item.size})` : ""} × ${item.quantity} — $${(
          item.price * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Urban Vogue Orders <orders@urbanvogue.store>",
    to: notificationEmail,
    subject: "New Order - Urban Vogue",
    text: `New Order Received

Order Number: ${input.orderNumber}

Customer: ${input.customerName}

Phone: ${input.customerPhone}

Wilaya: ${input.wilaya}

Address: ${input.address}

Products Ordered:

${productList}

Total:

$${input.total.toFixed(2)}`,
  });
}
