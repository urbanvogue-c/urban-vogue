"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-silver/40 p-10">
        <p className="font-display text-2xl mb-2">Message Sent</p>
        <p className="text-graphite text-sm">
          Thank you for reaching out. We'll respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow mb-2 block">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="eyebrow mb-2 block">Message</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Please try again or reach us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary self-start"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
