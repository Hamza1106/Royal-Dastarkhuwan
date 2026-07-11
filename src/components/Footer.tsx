import { motion } from "framer-motion";
import { Snowflake, ArrowRight, Camera, Users, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-24 pb-10">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.16 190 / 0.5), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 rounded-3xl glass-strong p-10 elegant-shadow md:p-16"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Reserve the <span className="text-gradient">glacier room.</span>
              </h3>
              <p className="mt-3 max-w-md text-foreground/70">
                Twelve seats. One chef. A four-hour tasting under blue light. Booked
                three weeks out.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full glass px-6 py-4 text-sm outline-none placeholder:text-foreground/50 focus:ring-2 focus:ring-[var(--aurora)]"
              />
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-6 py-4 text-sm font-semibold text-[var(--deep)] transition hover:shadow-[0_0_40px_-5px_var(--aurora)]">
                Notify me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </motion.div>

        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]">
                <Snowflake className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold text-gradient">Royal Dastarkhuwan</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-foreground/60">
              A living Pakistani restaurant universe. Slow fire, cold light, hand-crafted
              rituals across 12 cities.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-foreground/50">Menu</div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Desi", "Biryani", "BBQ", "Sweets", "Chai"].map((l) => (
                <li key={l}>
                  <a href="#categories" className="text-foreground/80 transition hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-foreground/50">Visit</div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Karachi", "Lahore", "Islamabad", "Multan", "All branches"].map((l) => (
                <li key={l}>
                  <a href="#branches" className="text-foreground/80 transition hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-foreground/50 md:flex-row">
          <div>© 2026 Royal Dastarkhuwan. Crafted with fire and frost.</div>
          <div className="flex gap-4">
            {[Camera, Users, MessageCircle].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full glass transition hover:bg-white/10"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}