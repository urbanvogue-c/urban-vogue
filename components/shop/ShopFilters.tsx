"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function ShopFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "newest";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam("search", search);
  }

  return (
    <div className="flex flex-col gap-6 mb-12">
      <form onSubmit={handleSearchSubmit} className="relative max-w-sm">
        <Search
          size={16}
          strokeWidth={1.5}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-graphite"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="w-full bg-transparent border-b border-silver/50 pl-6 pb-2 text-sm focus:outline-none focus:border-ink transition-colors"
        />
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("category", "all")}
            className={cn(
              "text-[12px] uppercase tracking-wide2 px-4 py-2 border transition-colors",
              activeCategory === "all"
                ? "bg-ink text-paper border-ink"
                : "border-silver/50 hover:border-ink"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParam("category", cat)}
              className={cn(
                "text-[12px] uppercase tracking-wide2 px-4 py-2 border transition-colors",
                activeCategory === cat
                  ? "bg-ink text-paper border-ink"
                  : "border-silver/50 hover:border-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="bg-transparent border border-silver/50 text-[12px] uppercase tracking-wide2 px-4 py-2 focus:outline-none focus:border-ink"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
