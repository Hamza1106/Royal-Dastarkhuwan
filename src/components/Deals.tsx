import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap } from "lucide-react";
import { useRef, type MouseEvent } from "react";

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

        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: 1200 }}>
          {deals.map((d, i) => (
            <DealCard key={d.title} d={d} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DealCard({ d, i }: { d: (typeof deals)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 18,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -12 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden rounded-3xl glass-strong p-8 elegant-shadow"
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition group-hover:opacity-90 ${d.tint}`}
      />
      {/* Glare sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      <div
        className="flex items-center justify-between"
        style={{ transform: "translateZ(40px)" }}
      >
        <div
          className={`rounded-full bg-gradient-to-r ${d.tint} px-4 py-1.5 text-xs font-semibold text-[var(--deep)]`}
        >
          {d.off}
        </div>
        {/* Big rotating dashed ring */}
        <div className="relative h-20 w-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 group-hover:border-white/70"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-dashed border-white/25"
          />
          <div
            className={`absolute inset-6 rounded-full bg-gradient-to-br ${d.tint} opacity-80 blur-sm`}
          />
        </div>
      </div>
      <h3 className="mt-6 text-3xl font-semibold" style={{ transform: "translateZ(30px)" }}>
        {d.title}
      </h3>
      <div
        className="mt-4 flex items-baseline gap-3"
        style={{ transform: "translateZ(24px)" }}
      >
        <div className="text-4xl font-semibold text-gradient">{d.price}</div>
        <div className="text-sm text-foreground/50 line-through">{d.was}</div>
      </div>
      <button
        className="mt-6 w-full rounded-xl bg-white/5 py-3 text-sm font-medium transition hover:bg-white/10"
        style={{ transform: "translateZ(20px)" }}
      >
        Claim tonight
      </button>
    </motion.div>
  );
}