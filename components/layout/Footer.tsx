import Link from "next/link";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/shop?filter=new", label: "New Arrivals" },
      { href: "/shop?filter=best-sellers", label: "Best Sellers" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/cart", label: "Track My Order" },
    ],
  },
  {
    title: "The House",
    links: [
      { href: "/", label: "Our Story" },
      { href: "/contact", label: "Get in Touch" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-fluid pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          <div className="col-span-2">
            <span className="font-display text-3xl tracking-wide2">
              URBAN VOGUE
            </span>
            <p className="mt-4 text-sm text-silver max-w-xs leading-relaxed">
              Wear Your Legacy. Considered pieces for those who dress with
              intention.
            </p>
            <div className="mt-6 flex items-center gap-5">
              <a
                href="https://instagram.com/urbanvogue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-60 transition-opacity"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:opacity-60 transition-opacity"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:urbanvogue.store@gmail.com"
                aria-label="Email"
                className="hover:opacity-60 transition-opacity"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow !text-silver mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/90 hover:opacity-60 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline !border-paper/15 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-silver">
            © {new Date().getFullYear()} Urban Vogue. All rights reserved.
          </p>
          <p className="text-xs text-silver tracking-wide2 uppercase">
            Wear Your Legacy
          </p>
        </div>
      </div>
    </footer>
  );
}
