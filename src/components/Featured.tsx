import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import karahi from "@/assets/hero-dish.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import bbq from "@/assets/dish-bbq.jpg";
import chai from "@/assets/dish-chai.jpg";

const featured = [
  {
    tag: "Signature",
    name: "Copper Karahi",
    line: "Fourteen spices. One copper pan. Fire we hand-fan.",
    img: karahi,
  },
  {
    tag: "Bestseller",
    name: "Layered Biryani",
    line: "Saffron milk poured through parchment. A ritual, not a recipe.",
    img: biryani,
  },
  {
    tag: "Live fire",
    name: "Coal BBQ Bar",
    line: "Guests grill beside chefs. Smoke, laughter, iced kulfi.",
    img: bbq,
  },
  {
    tag: "House ritual",
    name: "Cold-brew Chai",
    line: "Steeped twelve hours in glacier-cold water. Never boiled.",
    img: chai,
  },
];

function Panel({ item, i }: { item: (typeof featured)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const reverse = i % 2 === 1;
  const swayDelay = i * 0.4;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div style={{ y, rotate: rot }} className="relative">
        {/* Hanging cords */}
        <div className="pointer-events-none absolute -top-24 left-1/4 z-0 h-24 w-px bg-gradient-to-b from-transparent via-white/30 to-white/50" />
        <div className="pointer-events-none absolute -top-24 right-1/4 z-0 h-24 w-px bg-gradient-to-b from-transparent via-white/30 to-white/50" />
        <div className="pointer-events-none absolute -top-24 left-1/4 h-2 w-2 -translate-x-1/2 rounded-full bg-white/60 shadow-[0_0_10px_var(--aurora)]" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-2 w-2 translate-x-1/2 rounded-full bg-white/60 shadow-[0_0_10px_var(--aurora)]" />

        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--aurora)]/30 to-[var(--primary)]/20 blur-3xl" />
        {/* Hanging / swaying wrapper */}
        <motion.div
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{
            duration: 6 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: swayDelay,
          }}
          style={{ transformOrigin: "top center" }}
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-[2rem] glass-strong elegant-shadow"
        >
          <motion.img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-[520px] w-full object-cover"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: swayDelay,
            }}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 inline-block rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[var(--aurora)]">
          {item.tag}
        </div>
        <h3 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {item.name}
        </h3>
        <p className="mt-4 max-w-md text-lg text-foreground/70">{item.line}</p>
        <div className="mt-8 flex gap-6 text-sm text-foreground/60">
          <div>
            <div className="text-3xl font-semibold text-gradient">
              {String(i * 3 + 12).padStart(2, "0")}
            </div>
            <div className="mt-1 uppercase tracking-widest">Ingredients</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-gradient">
              {i === 3 ? "12h" : `${20 + i * 10}m`}
            </div>
            <div className="mt-1 uppercase tracking-widest">Craft time</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Featured() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em]"
        >
          Featured dishes
        </motion.div>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Four rituals we perform{" "}
          <span className="text-gradient">every single night.</span>
        </h2>
        <div className="mt-40">
          {featured.map((f, i) => (
            <Panel key={f.name} item={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}