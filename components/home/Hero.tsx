"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const monogramY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-paper"
    >
      {/* Signature element: oversized outlined UV monogram, echoing the brand mark,
          sitting quietly behind the content with a slow parallax drift on scroll. */}
      <motion.div
        style={{ y: monogramY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-display leading-none text-[42vw] md:text-[32vw]"
          style={{
            WebkitTextStroke: "1px rgba(250,250,248,0.08)",
            color: "transparent",
          }}
        >
          UV
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative h-20 w-20 md:h-24 md:w-24 mb-8"
        >
          <Image
            src="/images/uv-logo.jpeg"
            alt="Urban Vogue"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="font-display text-5xl md:text-8xl tracking-wide2"
        >
          URBAN VOGUE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
          className="mt-5 text-sm md:text-base uppercase tracking-label text-silver"
        >
          Wear Your Legacy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.8 }}
          className="mt-10"
        >
          <Link href="/shop" className="btn-ghost-dark">
            Explore the Collection
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="h-10 w-px bg-paper/30" />
      </motion.div>
    </section>
  );
}
