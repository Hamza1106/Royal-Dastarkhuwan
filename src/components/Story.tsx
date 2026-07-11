import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const chapters = [
  {
    year: "1998",
    title: "A single karahi in Karachi",
    body: "Chef Anwar lit his first coal fire in a two-table roadside dhaba. Every dish was measured by hand, seasoned by memory.",
  },
  {
    year: "2007",
    title: "The recipes travel north",
    body: "The family moved to Lahore. Nihari simmered for 14 hours. Biryani stacked in layers only a grandmother could remember.",
  },
  {
    year: "2016",
    title: "Frost meets Flame",
    body: "We paired centuries-old fire cooking with cold-brew chai bars and glacier-lit dining rooms. A new sensory grammar.",
  },
  {
    year: "2026",
    title: "12 cities. One universe.",
    body: "Today, Royal Dastarkhuwan is a living brand — kitchens, roasteries, and immersive rooms across Pakistan.",
  },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="story" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
            Our story
          </div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            A quarter century of{" "}
            <span className="text-gradient">slow fire and cold precision.</span>
          </h2>
        </motion.div>

        <div className="relative pl-12 md:pl-20">
          {/* Vertical track */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-8" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-[var(--frost)] via-[var(--aurora)] to-[var(--primary)] md:left-8"
          />

          <div className="space-y-32">
            {chapters.map((c, i) => (
              <motion.div
                key={c.year}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.div
                  whileInView={{ scale: [0.6, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute -left-[52px] top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] shadow-[0_0_30px_var(--aurora)] md:-left-[76px]"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--deep)]" />
                </motion.div>
                <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
                  <span
                    className="text-6xl font-semibold text-gradient md:text-7xl"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {c.year}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                    <p className="mt-3 text-foreground/70">{c.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}