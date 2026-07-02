"use client";

import { useState } from "react";
import Reveal from "@/components/home/Reveal";

// No newsletter/subscribers table was specified in the brief. This captures
// the email client-side and shows a success state. Say the word if you'd
// like a `newsletter_subscribers` table + route handler added to persist these.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container-fluid max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">Stay Close</p>
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Join the Urban Vogue Circle
          </h2>
          <p className="text-graphite text-sm mb-10 max-w-md mx-auto">
            Be first to know about new drops, private previews, and pieces
            made in limited runs.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {submitted ? (
            <p className="text-sm uppercase tracking-wide2">
              You&rsquo;re on the list. Welcome.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-ink px-5 py-4 text-sm focus:outline-none"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
