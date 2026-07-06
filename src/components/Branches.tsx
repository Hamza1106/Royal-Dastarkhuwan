import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const branches = [
  { city: "Karachi", area: "Clifton, Block 4", hours: "12pm – 3am", phone: "+92 21 111 999" },
  { city: "Lahore", area: "MM Alam Road", hours: "12pm – 2am", phone: "+92 42 111 999" },
  { city: "Islamabad", area: "F-7 Markaz", hours: "12pm – 1am", phone: "+92 51 111 999" },
  { city: "Rawalpindi", area: "Bahria Town", hours: "12pm – 1am", phone: "+92 51 222 999" },
  { city: "Multan", area: "Cantt", hours: "12pm – 12am", phone: "+92 61 111 999" },
  { city: "Faisalabad", area: "D Ground", hours: "12pm – 12am", phone: "+92 41 111 999" },
];

export function Branches() {
  return (
    <section id="branches" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em]">
            Find us
          </div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Twelve rooms.{" "}
            <span className="text-gradient">All lit blue.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, i) => (
            <motion.div
              key={b.city}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative overflow-hidden rounded-3xl glass p-7 elegant-shadow"
            >
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--aurora)]/30 to-transparent blur-3xl transition group-hover:from-[var(--aurora)]/60" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/50">
                    Branch {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-3xl font-semibold">{b.city}</h3>
                </div>
                <div className="rounded-full glass-strong px-3 py-1 text-xs">Open</div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--aurora)]" /> {b.area}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[var(--aurora)]" /> {b.phone}
                </div>
                <div className="text-foreground/60">{b.hours}</div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-white/5 py-3 text-sm font-medium transition hover:bg-gradient-to-r hover:from-[var(--frost)] hover:to-[var(--aurora)] hover:text-[var(--deep)]">
                Reserve a table
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}