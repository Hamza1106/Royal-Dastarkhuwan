import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";
import hero from "@/assets/hero-dish.jpg";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 2600);
    return () => window.clearTimeout(t);
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

          {/* The dish revealed behind the doors */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{
                scale: { delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { delay: 0.6, duration: 0.8 },
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              }}
              className="relative h-[52vmin] w-[52vmin] max-h-[520px] max-w-[520px]"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
              <div className="absolute inset-4 overflow-hidden rounded-full shadow-[0_0_120px_-10px_var(--aurora)]">
                <img
                  src={hero}
                  alt="Signature dish"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)]/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Brand + tagline in center between the doors */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute inset-x-0 bottom-14 z-10 flex flex-col items-center gap-3 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/80">
              <Snowflake className="h-3.5 w-3.5 text-[var(--aurora)]" />
              Frost & Flame
            </div>
            <div className="text-sm text-foreground/60">
              Opening the kitchen…
            </div>
          </motion.div>

          {/* Left door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 0.9, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
          >
            <div className="relative h-full w-full bg-gradient-to-r from-[oklch(0.14_0.04_240)] via-[oklch(0.18_0.06_235)] to-[oklch(0.22_0.08_230)]">
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--aurora)]/70 to-transparent" />
              <div className="absolute right-6 top-1/2 h-16 w-1 -translate-y-1/2 rounded-full bg-white/20" />
              {/* Etched vertical lines */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-10 w-px bg-white/5"
                  style={{ right: `${8 + i * 8}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 0.9, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 origin-right"
          >
            <div className="relative h-full w-full bg-gradient-to-l from-[oklch(0.14_0.04_240)] via-[oklch(0.18_0.06_235)] to-[oklch(0.22_0.08_230)]">
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--aurora)]/70 to-transparent" />
              <div className="absolute left-6 top-1/2 h-16 w-1 -translate-y-1/2 rounded-full bg-white/20" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-10 w-px bg-white/5"
                  style={{ left: `${8 + i * 8}%` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}