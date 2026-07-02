import Reveal from "@/components/home/Reveal";

// No `reviews` table was specified in the brief's Supabase schema, so this
// section ships with curated placeholder copy. Swap for real testimonials,
// or ask to add a `reviews` table + admin moderation if you want these
// database-driven.
const REVIEWS = [
  {
    quote:
      "Every piece feels like it was made to be kept, not replaced next season. The construction alone justifies the price.",
    name: "S. Amrani",
    location: "Algiers",
  },
  {
    quote:
      "Ordering was effortless and the packaging felt like unboxing something from a flagship store, not a website.",
    name: "Y. Belkacem",
    location: "Oran",
  },
  {
    quote:
      "Urban Vogue is the rare brand that actually looks like its photos in person. Minimal, sharp, built to last.",
    name: "N. Haddad",
    location: "Constantine",
  },
];

export default function Reviews() {
  return (
    <section className="py-20 md:py-28 bg-ink text-paper">
      <div className="container-fluid">
        <Reveal className="text-center mb-16">
          <p className="eyebrow !text-silver mb-3">In Their Words</p>
          <h2 className="font-display text-3xl md:text-4xl">
            Trusted by the Discerning
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <blockquote className="h-full flex flex-col">
                <p className="font-display text-xl leading-relaxed text-paper/95">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-6 eyebrow !text-silver">
                  {review.name} — {review.location}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
