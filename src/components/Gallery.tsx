import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, ArrowUpRight } from "lucide-react";
import karahi from "@/assets/hero-dish.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import burger from "@/assets/dish-burger.jpg";
import sweets from "@/assets/dish-sweets.jpg";
import chai from "@/assets/dish-chai.jpg";
import bbq from "@/assets/dish-bbq.jpg";

const panels = [
  { src: karahi, title: "Mutton Karahi", tag: "The Signature", hue: "Sapphire steam" },
  { src: biryani, title: "Sindhi Biryani", tag: "Layered Ritual", hue: "Saffron ember" },
  { src: bbq, title: "Charcoal BBQ", tag: "Live Fire", hue: "Ember glow" },
  { src: sweets, title: "Mithai Table", tag: "Sweet Finale", hue: "Rose gold" },
  { src: chai, title: "Kashmiri Chai", tag: "Winter Comfort", hue: "Blush frost" },
  { src: burger, title: "Smash Stack", tag: "Modern Cravings", hue: "Cobalt neon" },
];

export function Gallery() {
  const [active, setActive] = useState(0);

  return (
    <section id="gallery" className="relative py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[480px] max-w-6xl rounded-[3rem] opacity-40 blur-3xl"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em]">
              <Camera className="h-3.5 w-3.5" /> Gallery
            </div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              A <span className="text-gradient">frozen frame</span> of every craving.
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              Hover any panel — the room shifts, the plate opens, the story of the shot unfolds.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="inline-block h-px w-10 bg-current opacity-40" />
            {String(active + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
          </div>
        </motion.div>

        {/* Expanding panel accordion */}
        <div
          className="flex h-[520px] w-full gap-3 overflow-hidden rounded-3xl"
          onMouseLeave={() => setActive(0)}
        >
          {panels.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: isActive ? 6 : 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-w-[60px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 elegant-shadow"
              >
                <motion.img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  animate={{ scale: isActive ? 1.05 : 1.25 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* frost overlay for inactive */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 0.55 }}
                  className="absolute inset-0 backdrop-blur-[2px]"
                  style={{ background: "linear-gradient(180deg, var(--deep)/0.2, var(--deep)/0.85)" }}
                />
                {/* bottom gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/40 to-transparent" />

                {/* Vertical label for inactive */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-end justify-center pb-6"
                >
                  <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-medium uppercase tracking-[0.35em] text-white/80">
                    {p.title}
                  </span>
                </motion.div>

                {/* Expanded content */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: isActive ? 0.15 : 0 }}
                  className="absolute inset-x-0 bottom-0 p-8"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--aurora)]" />
                    {p.tag}
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60">
                        {p.hue}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition group-hover:bg-white/20">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* active accent line */}
                <motion.div
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-x-6 top-6 h-px origin-left bg-gradient-to-r from-[var(--aurora)] via-white to-transparent"
                />
              </motion.div>
            );
          })}
        </div>

        {/* progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {panels.map((_, i) => (
            <button
              key={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`Show panel ${i + 1}`}
              className="group relative h-1.5 overflow-hidden rounded-full bg-white/10"
              style={{ width: i === active ? 44 : 18 }}
            >
              <motion.span
                animate={{ scaleX: i === active ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--ember)] to-[var(--aurora)]"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}