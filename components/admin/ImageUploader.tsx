"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploader({
  label,
  fieldName,
  initialUrls = [],
  multiple = false,
}: {
  label: string;
  fieldName: string;
  initialUrls?: string[];
  multiple?: boolean;
}) {
  const supabase = createClient();
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("products").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("products").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
    }

    setUrls((prev) => (multiple ? [...prev, ...uploaded] : uploaded));
    setUploading(false);
  }

  function removeUrl(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input type="hidden" name={fieldName} value={urls.join(",")} />

      <div className="flex flex-wrap gap-3 mb-3">
        {urls.map((url) => (
          <div key={url} className="relative h-20 w-20 bg-smoke/5 overflow-hidden">
            <Image src={url} alt="" fill sizes="80px" className="object-cover" />
            <button
              type="button"
              onClick={() => removeUrl(url)}
              className="absolute top-1 right-1 bg-ink text-paper rounded-full p-0.5"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 border border-silver/50 px-4 py-2.5 text-xs uppercase tracking-wide2 cursor-pointer hover:border-ink transition-colors">
        <Upload size={14} strokeWidth={1.5} />
        {uploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
    </div>
  );
}
