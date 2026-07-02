import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — logging contact message instead.");
      console.log({ name, email, message });
      return NextResponse.json({ ok: true });
    }

    const supabase = createServiceClient();
    const { data: settings } = await supabase
      .from("settings")
      .select("notification_email")
      .limit(1)
      .single();

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Urban Vogue Contact <contact@urbanvogue.store>",
      to: settings?.notification_email ?? "urbanvogue.store@gmail.com",
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
