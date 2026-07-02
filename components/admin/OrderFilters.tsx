"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUSES = ["all", "new", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const activeStatus = searchParams.get("status") ?? "all";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParam("search", search);
        }}
        className="max-w-sm"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order #, name, or phone"
          className="w-full bg-transparent border-b border-silver/50 pb-2 text-sm focus:outline-none focus:border-ink"
        />
      </form>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => updateParam("status", s)}
            className={cn(
              "text-[11px] uppercase tracking-wide2 px-4 py-2 border transition-colors capitalize",
              activeStatus === s
                ? "bg-ink text-paper border-ink"
                : "border-silver/50 hover:border-ink"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
