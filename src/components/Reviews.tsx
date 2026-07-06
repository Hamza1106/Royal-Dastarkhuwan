import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "Ayesha K.", city: "Karachi", text: "The moment they poured saffron milk on the biryani, my whole table went silent. It felt like theatre.", rating: 5 },
  { name: "Bilal R.", city: "Lahore", text: "Their cold-brew chai is a religious experience. I have never tasted chai this smooth in my life.", rating: 5 },
  { name: "Sana M.", city: "Islamabad", text: "The BBQ bar is unreal. You grill next to the chef under blue light. Cinema.", rating: 5 },
  { name: "Faraz A.", city: "Multan", text: "The karahi arrived still bubbling in a copper pan. My grandfather would have cried.", rating: 5 },
  { name: "Zara H.", city: "Karachi", text: "Booked a private glacier room for my birthday. Ras malai came out on ice sculpted plates.", rating: 5 },
  { name: "Hamza S.", city: "Rawalpindi", text: "Not a restaurant. A universe. My kids talk about it every week.", rating: 5 },
];

export function Reviews() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
              What guests say
            </div>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Two thousand tables.{" "}
              <span className="text-gradient">One rating.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl glass-strong px-6 py-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[var(--aurora)] text-[var(--aurora)]" />
              ))}
            </div>
            <div className="text-2xl font-semibold text-gradient">4.9</div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 elegant-shadow"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--aurora)]/30 to-transparent blur-2xl transition group-hover:from-[var(--aurora)]/50" />
              <Quote className="mb-6 h-8 w-8 text-[var(--aurora)]" />
              <blockquote className="text-lg leading-relaxed text-foreground/90">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-sm font-semibold text-[var(--deep)]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-foreground/60">{r.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}