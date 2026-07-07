import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Snowflake, X } from "lucide-react";
import { useEffect, useState } from "react";

const scenes = [
  {
    year: "1998",
    title: "A single karahi",
    body: "Chef Anwar lights the first coal in a two-table Karachi dhaba.",
    bg: "radial-gradient(circle at 30% 40%, oklch(0.5 0.2 30 / 0.6), transparent 60%), linear-gradient(135deg, #1a0b0b, #0b1a24)",
    accent: "🔥",
  },
  {
    year: "2007",
    title: "Recipes travel north",
    body: "A 14-hour nihari finds its second home in Lahore.",
    bg: "radial-gradient(circle at 70% 30%, oklch(0.55 0.15 60 / 0.55), transparent 60%), linear-gradient(135deg, #1a1408, #0a1220)",
    accent: "🌙",
  },
  {
    year: "2016",
    title: "Frost meets Flame",
    body: "Ancient fire kitchens meet glacier-lit dining rooms.",
    bg: "radial-gradient(circle at 20% 70%, oklch(0.6 0.18 200 / 0.55), transparent 60%), linear-gradient(135deg, #071a24, #0e2540)",
    accent: "❄",
  },
  {
    year: "2026",
    title: "One living universe",
    body: "12 cities. 42 dishes crafted daily. One story you're now inside.",
    bg: "radial-gradient(circle at 50% 50%, oklch(0.65 0.2 180 / 0.55), transparent 60%), linear-gradient(135deg, #041826, #0a2f3a)",
    accent: "✦",
  },
];

export function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!open) {
      setI(0);
      setPlaying(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !playing) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % scenes.length), 4500);
    return () => window.clearTimeout(t);
  }, [i, open, playing]);

  const scene = scenes[i];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 elegant-shadow"
          >
            {/* Animated background per scene */}
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.year}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
                style={{ background: scene.bg }}
              />
            </AnimatePresence>

            {/* Drifting particles */}
            {Array.from({ length: 24 }).map((_, k) => (
              <motion.span
                key={k}
                className="absolute h-1 w-1 rounded-full bg-white/70 blur-[1px]"
                style={{ left: `${(k * 37) % 100}%`, top: "110%" }}
                animate={{ y: [-20, -600], opacity: [0, 1, 0] }}
                transition={{
                  duration: 8 + (k % 5),
                  delay: (k % 7) * 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Big accent glyph */}
            <motion.div
              key={`glyph-${scene.year}`}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute right-[-40px] top-[-40px] text-[24rem] leading-none"
            >
              {scene.accent}
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.year}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em]">
                    <Snowflake className="h-3 w-3 text-[var(--aurora)]" />
                    Chapter {i + 1} / {scenes.length} · {scene.year}
                  </div>
                  <h3 className="text-4xl font-semibold sm:text-6xl">{scene.title}</h3>
                  <p className="mt-3 max-w-xl text-lg text-white/70">{scene.body}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bars */}
              <div className="mt-8 flex gap-2">
                {scenes.map((s, k) => (
                  <button
                    key={s.year}
                    onClick={() => setI(k)}
                    className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/15"
                  >
                    {k < i && <span className="absolute inset-0 bg-white/80" />}
                    {k === i && playing && (
                      <motion.span
                        key={`p-${i}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)]"
                      />
                    )}
                    {k === i && !playing && (
                      <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute right-4 top-4 z-20 flex gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/20"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}