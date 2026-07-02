import type { Metadata } from "next";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Urban Vogue.",
};

const CHANNELS = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@urbanvogue",
    href: "https://instagram.com/urbanvogue",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message Us",
    href: "https://wa.me/000000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "urbanvogue.store@gmail.com",
    href: "mailto:urbanvogue.store@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-fluid">
        <div className="max-w-xl mb-16">
          <p className="eyebrow mb-3">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-5xl mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-graphite text-sm leading-relaxed">
            Questions about an order, a piece, or a collaboration — reach us
            directly through any of the channels below, or send a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col gap-6">
              {CHANNELS.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 border border-silver/40 p-6 hover:border-ink transition-colors group"
                >
                  <channel.icon size={20} strokeWidth={1.5} />
                  <div>
                    <p className="eyebrow mb-1">{channel.label}</p>
                    <p className="text-sm group-hover:opacity-60 transition-opacity">
                      {channel.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
