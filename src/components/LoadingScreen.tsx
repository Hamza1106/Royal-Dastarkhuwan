import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";
import hero from "@/assets/hero-dish.jpg";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[var(--deep)]"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--aurora)]/20 blur-3xl" />

          {/* Left door — carries the LEFT half of the dish as its handle */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 0.9, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2"
          >
            <div className="relative h-full w-full overflow-hidden bg-gradient-to-r from-[oklch(0.14_0.04_240)] via-[oklch(0.18_0.06_235)] to-[oklch(0.22_0.08_230)]">
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--aurora)]/70 to-transparent" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-10 w-px bg-white/5"
                  style={{ right: `${10 + i * 9}%` }}
                />
              ))}
              {/* Dish handle — left half, centered on the seam */}
              <div
                className="absolute top-1/2 h-[46vmin] w-[46vmin] max-h-[460px] max-w-[460px] -translate-y-1/2"
                style={{ right: "-23vmin" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-3 overflow-hidden rounded-full shadow-[0_0_120px_-10px_var(--aurora)] ring-1 ring-white/15">
                    <img src={hero} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)]/40 via-transparent to-transparent" />
                  </div>
                </motion.div>
                {/* Handle stem into door */}
                <div className="absolute right-full top-1/2 h-2 w-16 -translate-y-1/2 rounded-l-full bg-gradient-to-l from-white/40 to-white/5" />
              </div>
            </div>
          </motion.div>

          {/* Right door — carries the RIGHT half of the dish */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 0.9, duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
          >
            <div className="relative h-full w-full overflow-hidden bg-gradient-to-l from-[oklch(0.14_0.04_240)] via-[oklch(0.18_0.06_235)] to-[oklch(0.22_0.08_230)]">
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--aurora)]/70 to-transparent" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-10 w-px bg-white/5"
                  style={{ left: `${10 + i * 9}%` }}
                />
              ))}
              <div
                className="absolute top-1/2 h-[46vmin] w-[46vmin] max-h-[460px] max-w-[460px] -translate-y-1/2"
                style={{ left: "-23vmin" }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-3 overflow-hidden rounded-full shadow-[0_0_120px_-10px_var(--aurora)] ring-1 ring-white/15">
                    <img src={hero} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)]/40 via-transparent to-transparent" />
                  </div>
                </motion.div>
                <div className="absolute left-full top-1/2 h-2 w-16 -translate-y-1/2 rounded-r-full bg-gradient-to-r from-white/40 to-white/5" />
              </div>
            </div>
          </motion.div>

          {/* Brand + progress — pinned to bottom, above the doors */}
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-4 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/80"
            >
              <Snowflake className="h-3.5 w-3.5 text-[var(--aurora)]" />
              Frost & Flame
            </motion.div>
            <div className="w-full max-w-sm">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ width: `${progress * 100}%` }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--frost)] via-white to-[var(--aurora)] shadow-[0_0_20px_var(--aurora)]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                <span>Opening the kitchen</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}