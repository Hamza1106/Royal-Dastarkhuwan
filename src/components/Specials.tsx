import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { dishes } from "./menuData";
import { useCart } from "./CartProvider";

// Six most story-worthy dishes for the landing page
const specialNames = [
  "Chicken Karahi",
  "Chicken Biryani",
  "BBQ Platter",
  "Cold-brew Chai",
  "Frost Signature Burger",
  "Gulab Jamun",
];

const specials = specialNames
  .map((n) => dishes.find((d) => d.name === n))
  .filter((d): d is (typeof dishes)[number] => Boolean(d));

const chapters = [
  "01 · From the copper pan",
  "02 · Layered rituals",
  "03 · Live fire theatre",
  "04 · Cold light bar",
  "05 · Late-night comfort",
  "06 · Sweet finale",
];

function SpecialCard({
  d,
  chapter,
  i,
}: {
  d: (typeof specials)[number];
  chapter: string;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const { add } = useCart();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] glass-strong elegant-shadow"
    >
      {/* Chapter tag */}
      <div className="absolute left-5 top-5 z-20 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
        {chapter}
      </div>
      {/* Rating */}
      <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-1 rounded-full glass-strong px-3 py-1 text-xs">
        <Star className="h-3 w-3 fill-[var(--aurora)] text-[var(--aurora)]" /> {d.rating}
      </div>

      {/* Image with parallax + glow */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-[var(--aurora)]/20 to-transparent" />
        {d.image ? (
          <motion.img
            src={d.image}
            alt={d.name}
            loading="lazy"
            style={{ y }}
            className="absolute inset-0 h-[120%] w-full object-cover transition duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-8xl">✦</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/20 to-transparent" />

        {/* Floating orbit spice */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-dashed border-white/20"
        />
      </div>

      {/* Text */}
      <div className="relative -mt-16 flex flex-1 flex-col gap-3 p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.28em] text-[var(--aurora)]"
        >
          {d.category}
        </motion.div>
        <h3 className="text-2xl font-semibold sm:text-3xl">{d.name}</h3>
        <p className="text-sm text-foreground/60">{d.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-foreground/50">From</div>
            <div className="text-2xl font-semibold text-gradient">
              Rs {d.price.toLocaleString()}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() =>
              add({ name: d.name, price: d.price, image: d.image, category: d.category })
            }
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-5 py-3 text-sm font-semibold text-[var(--deep)] shadow-[0_0_30px_-8px_var(--aurora)]"
          >
            <Plus className="h-4 w-4" />
            To table
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function Specials() {
  return (
    <section id="specials" className="relative py-32">
      {/* Ambient blooms */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-0 h-96 w-[90%] max-w-4xl -translate-x-1/2 rounded-full bg-[var(--aurora)]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/70">
              Tonight's specials
            </div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Six chapters,{" "}
              <span className="text-gradient">one glacial tasting menu.</span>
            </h2>
            <p className="mt-5 max-w-xl text-foreground/60">
              A curated arc of what we're plating tonight — from the first spark of the
              copper karahi to the last spoon of gulab jamun. Follow the story or open the
              full library.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full glass-strong px-6 py-4 text-sm font-semibold transition hover:bg-white/10"
            >
              Open full menu
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specials.map((d, i) => (
            <SpecialCard key={d.name} d={d} chapter={chapters[i]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}