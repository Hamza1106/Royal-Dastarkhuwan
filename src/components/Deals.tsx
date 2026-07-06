import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const deals = [
  { title: "Family Feast", off: "25% OFF", price: "Rs 3,990", was: "Rs 5,290", tint: "from-[var(--frost)] to-[var(--aurora)]" },
  { title: "Late-Night Nihari", off: "12–3 AM", price: "Rs 1,490", was: "Rs 1,890", tint: "from-sky-300 to-blue-500" },
  { title: "Chai & Sweets", off: "15% OFF", price: "Rs 990", was: "Rs 1,190", tint: "from-cyan-300 to-teal-400" },
];

export function Deals() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em]">
              <Zap className="h-3 w-3 text-[var(--aurora)]" /> Live deals
            </div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Only glowing <span className="text-gradient">for tonight.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {deals.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-8 elegant-shadow"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition group-hover:opacity-80 ${d.tint}`}
              />
              <div className="flex items-center justify-between">
                <div className={`rounded-full bg-gradient-to-r ${d.tint} px-4 py-1.5 text-xs font-semibold text-[var(--deep)]`}>
                  {d.off}
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="h-8 w-8 rounded-full border border-dashed border-white/30"
                />
              </div>
              <h3 className="mt-6 text-3xl font-semibold">{d.title}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <div className="text-4xl font-semibold text-gradient">{d.price}</div>
                <div className="text-sm text-foreground/50 line-through">{d.was}</div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-white/5 py-3 text-sm font-medium transition hover:bg-white/10">
                Claim tonight
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}