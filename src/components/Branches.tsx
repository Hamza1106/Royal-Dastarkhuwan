import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, MapPin, Phone, Snowflake, Users, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "@tanstack/react-router";

const branches = [
  { city: "Karachi", area: "Clifton, Block 4", hours: "12pm – 3am", phone: "+92 21 111 999" },
  { city: "Lahore", area: "MM Alam Road", hours: "12pm – 2am", phone: "+92 42 111 999" },
  { city: "Islamabad", area: "F-7 Markaz", hours: "12pm – 1am", phone: "+92 51 111 999" },
  { city: "Rawalpindi", area: "Bahria Town", hours: "12pm – 1am", phone: "+92 51 222 999" },
  { city: "Multan", area: "Cantt", hours: "12pm – 12am", phone: "+92 61 111 999" },
  { city: "Faisalabad", area: "D Ground", hours: "12pm – 12am", phone: "+92 41 111 999" },
];

export function Branches() {
  const [reserveFor, setReserveFor] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onReserveClick = (city: string) => {
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    setReserveFor(city);
  };

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
              <button
                onClick={() => onReserveClick(b.city)}
                className="mt-6 w-full rounded-xl bg-white/5 py-3 text-sm font-medium transition hover:bg-gradient-to-r hover:from-[var(--frost)] hover:to-[var(--aurora)] hover:text-[var(--deep)]"
              >
                Reserve a table
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <ReserveModal city={reserveFor} onClose={() => setReserveFor(null)} />
    </section>
  );
}

function ReserveModal({ city, onClose }: { city: string | null; onClose: () => void }) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("20:00");
  const [confirmed, setConfirmed] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };
  const close = () => {
    onClose();
    setTimeout(() => setConfirmed(false), 400);
  };

  return (
    <AnimatePresence>
      {city && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-[var(--deep)]/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="fixed left-1/2 top-1/2 z-[91] w-[min(480px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl glass-strong elegant-shadow"
          >
            <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[var(--aurora)]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[var(--frost)]/20 blur-3xl" />
            <div className="relative p-7">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                    Reserve · {city}
                  </div>
                  <h3 className="mt-2 text-3xl font-semibold text-gradient">
                    A table under blue light
                  </h3>
                </div>
                <button
                  onClick={close}
                  className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {confirmed ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]"
                  >
                    <Check className="h-8 w-8" />
                  </motion.div>
                  <div className="mt-5 text-xl font-semibold">
                    Table held at {city}
                  </div>
                  <p className="mt-2 text-sm text-foreground/60">
                    {date || "Tonight"} · {time} · {guests} guest{guests === 1 ? "" : "s"}
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    A steward will call to confirm within 10 minutes.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full glass px-6 py-2.5 text-sm hover:bg-white/10"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60">
                      <Calendar className="h-3.5 w-3.5" /> Date
                    </span>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-[var(--aurora)]"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60">
                        <Snowflake className="h-3.5 w-3.5" /> Time
                      </span>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-[var(--aurora)]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60">
                        <Users className="h-3.5 w-3.5" /> Guests
                      </span>
                      <div className="flex items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          className="grid h-11 w-11 place-items-center text-lg"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-sm font-semibold">
                          {guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests((g) => Math.min(20, g + 1))}
                          className="grid h-11 w-11 place-items-center text-lg"
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] shadow-[0_0_40px_-8px_var(--aurora)]"
                  >
                    Reserve tonight →
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}