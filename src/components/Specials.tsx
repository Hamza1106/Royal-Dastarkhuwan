import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

function Card({
  d,
  chapter,
  active,
}: {
  d: (typeof specials)[number];
  chapter: string;
  active: boolean;
}) {
  const { add } = useCart();
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] glass-strong elegant-shadow">
      <div className="absolute left-5 top-5 z-20 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
        {chapter}
      </div>
      <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-1 rounded-full glass-strong px-3 py-1 text-xs">
        <Star className="h-3 w-3 fill-[var(--aurora)] text-[var(--aurora)]" /> {d.rating}
      </div>
      <div className="relative aspect-[4/5] overflow-hidden">
        {d.image ? (
          <motion.img
            src={d.image}
            alt={d.name}
            loading="lazy"
            animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-8xl">✦</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/20 to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-dashed border-white/20"
        />
      </div>
      <div className="relative -mt-20 flex flex-1 flex-col gap-3 p-7">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--aurora)]">
          {d.category}
        </div>
        <h3 className="text-3xl font-semibold sm:text-4xl">{d.name}</h3>
        <p className="text-sm text-foreground/60">{d.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-foreground/50">From</div>
            <div className="text-3xl font-semibold text-gradient">
              Rs {d.price.toLocaleString()}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() =>
              add({ name: d.name, price: d.price, image: d.image, category: d.category })
            }
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-5 py-3 text-sm font-semibold text-[var(--deep)] shadow-[0_0_30px_-8px_var(--aurora)]"
          >
            <Plus className="h-4 w-4" />
            To table
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function offsetFor(idx: number, i: number, len: number) {
  let o = idx - i;
  if (o > len / 2) o -= len;
  if (o < -len / 2) o += len;
  return o;
}

export function Specials() {
  const len = specials.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + len) % len);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Auto-advance every 3s, pause on hover
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % len);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused, len]);

  return (
    <section id="specials" className="relative py-32">
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
              Six chapters glide by on their own — hover to pause, drag or use
              the arrows to linger on a plate.
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

        {/* Carousel stage */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto flex h-[640px] w-full items-center justify-center overflow-hidden"
          style={{ perspective: 1600 }}
        >
          {specials.map((d, idx) => {
            const o = offsetFor(idx, i, len);
            const abs = Math.abs(o);
            if (abs > 2) return null;
            const isActive = o === 0;
            return (
              <motion.div
                key={d.name}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                animate={{
                  x: `${o * 62}%`,
                  scale: isActive ? 1 : abs === 1 ? 0.78 : 0.6,
                  rotateY: -o * 14,
                  opacity: abs > 1 ? 0 : abs === 1 ? 0.45 : 1,
                  filter: isActive ? "blur(0px)" : "blur(3px)",
                  zIndex: 10 - abs,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                className="absolute h-full w-[min(420px,88vw)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card d={d} chapter={chapters[idx]} active={isActive} />
              </motion.div>
            );
          })}

          {/* Nav arrows */}
          <button
            aria-label="Previous chapter"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong transition hover:bg-white/15 md:left-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next chapter"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong transition hover:bg-white/15 md:right-8"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress + chapter label */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 * dir }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 * dir }}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-[0.4em] text-foreground/60"
            >
              {chapters[i]}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-2">
            {specials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDir(idx > i ? 1 : -1);
                  setI(idx);
                }}
                aria-label={`Go to chapter ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-10 bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)]"
                    : "w-4 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}