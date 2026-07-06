import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { dishes } from "./menuData";

export function Trending() {
  const items = dishes
    .filter((d) => d.image)
    .concat(dishes.filter((d) => d.image))
    .slice(0, 12);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto mb-10 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
              <TrendingUp className="h-3 w-3 text-[var(--aurora)]" /> Trending tonight
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              What the room is <span className="text-gradient">ordering right now.</span>
            </h2>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--deep)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--deep)] to-transparent" />
        <div className="flex animate-marquee gap-6 py-6">
          {items.concat(items).map((d, i) => (
            <div
              key={i}
              className="group relative h-72 w-72 shrink-0 overflow-hidden rounded-3xl glass elegant-shadow"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-xs uppercase tracking-widest text-foreground/70">
                  {d.category}
                </div>
                <div className="mt-1 text-xl font-semibold">{d.name}</div>
                <div className="mt-1 text-sm text-gradient">Rs {d.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}