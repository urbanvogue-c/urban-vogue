"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop?filter=best-sellers", label: "Best Sellers" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-luxe",
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-silver/30 py-4"
            : "bg-transparent py-7"
        )}
      >
        <div className="container-fluid flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "flex items-center gap-2 text-[13px] uppercase tracking-wide2 transition-colors",
              scrolled ? "text-ink" : "text-ink"
            )}
          >
            <Menu size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline">Menu</span>
          </button>

          <Link
            href="/"
            className="font-display text-xl md:text-2xl tracking-wide2 text-ink"
          >
            URBAN VOGUE
          </Link>

          <div className="flex items-center gap-5">
            <button aria-label="Search" className="text-ink">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/cart" aria-label="Cart" className="relative text-ink">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-paper text-[10px]">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-ink text-paper flex flex-col"
          >
            <div className="container-fluid flex items-center justify-between py-7">
              <span className="font-display text-xl tracking-wide2">
                URBAN VOGUE
              </span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="container-fluid flex flex-1 flex-col justify-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl md:text-6xl hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-fluid pb-10 eyebrow !text-silver">
              Wear Your Legacy
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
