import Link from "next/link";
import { Check } from "lucide-react";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="pt-40 pb-32 text-center">
      <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-ink">
        <Check size={22} strokeWidth={1.5} />
      </div>
      <p className="eyebrow mb-4">Order Confirmed</p>
      <h1 className="font-display text-4xl md:text-5xl mb-6">
        Thank You
      </h1>
      <p className="text-graphite text-sm max-w-md mx-auto mb-2">
        Your order has been received and will be prepared with care. We'll
        contact you shortly to confirm delivery details.
      </p>
      {order && (
        <p className="text-sm uppercase tracking-wide2 mt-6 mb-10">
          Order Number: <span className="font-medium">{order}</span>
        </p>
      )}
      <Link href="/shop" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
}
