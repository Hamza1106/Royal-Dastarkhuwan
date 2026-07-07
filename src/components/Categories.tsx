import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Clock, Plus, Star } from "lucide-react";
import { categories, dishes, type Category } from "./menuData";
import { useCart } from "./CartProvider";

export function Categories() {
  const [active, setActive] = useState<Category>("All");
  const { add } = useCart();
  const filtered = useMemo(
    () => (active === "All" ? dishes : dishes.filter((d) => d.category === active)),
    [active],
  );

  return (
    <section id="categories" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
              The universe
            </div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Nine kitchens.{" "}
              <span className="text-gradient">One glacial table.</span>
            </h2>
          </motion.div>
          <p className="max-w-sm text-foreground/60">
            Tap a world to reveal its dishes. Every card is hand-composed, hand-plated,
            and photographed inside our own cold-light studio.
          </p>
        </div>

        {/* Category chips */}
        <div className="mb-14 flex flex-wrap gap-3">
          {categories.map((c, i) => {
            const isActive = c.name === active;
            return (
              <motion.button
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(c.name)}
                className={`relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-medium transition ${
                  isActive ? "text-[var(--deep)]" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${c.tint}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 -z-10 rounded-2xl glass" />
                )}
                <span className="mr-2">{c.icon}</span>
                {c.name}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <motion.article
                layout
                key={`${active}-${d.name}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (i % 9) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass p-5 elegant-shadow"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0">
                  {d.image ? (
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-6xl opacity-70">
                      {categories.find((c) => c.name === d.category)?.icon}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--deep)]/70 via-transparent to-transparent" />
                  {d.badge && (
                    <div className="absolute left-3 top-3 rounded-full glass-strong px-3 py-1 text-xs">
                      {d.badge}
                    </div>
                  )}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full glass-strong px-3 py-1 text-xs">
                    <Star className="h-3 w-3 fill-[var(--aurora)] text-[var(--aurora)]" />
                    {d.rating}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-foreground/50">
                      {d.category}
                    </div>
                    <h3 className="mt-1 text-xl font-semibold">{d.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gradient">
                      Rs {d.price.toLocaleString()}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-foreground/60">
                      <Clock className="h-3 w-3" />
                      {d.time}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/60">{d.desc}</p>
                <button
                  onClick={() =>
                    add({
                      name: d.name,
                      price: d.price,
                      image: d.image,
                      category: d.category,
                    })
                  }
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-sm font-medium transition hover:bg-gradient-to-r hover:from-[var(--frost)] hover:to-[var(--aurora)] hover:text-[var(--deep)]"
                >
                  <Plus className="h-4 w-4" />
                  Add to table
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}