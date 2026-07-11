import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroPlating from "@/assets/hero-plating.jpg";
import dishNihari from "@/assets/dish-nihari.jpg";
import dishRasMalai from "@/assets/dish-ras-malai.jpg";
import dishChai from "@/assets/dish-chai.jpg";
import { FloatingOrbs, Particles } from "./FloatingOrbs";
import { StoryModal } from "./StoryModal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Hero() {
  const [storyOpen, setStoryOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32 pb-20">
      <FloatingOrbs />
      <Particles count={40} />

      {/* Aurora background */}
      <div
        className="absolute inset-0 opacity-60 animate-aurora"
        style={{
          background:
            "linear-gradient(120deg, oklch(0.3 0.12 220 / 0.4), oklch(0.35 0.15 180 / 0.4), oklch(0.28 0.1 260 / 0.4))",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--aurora)]" />
              A living restaurant universe
            </motion.div>

            <h1 className="font-display text-6xl font-[400] leading-[0.95] tracking-[-0.02em] sm:text-8xl lg:text-[6.5rem]">
              {"Taste the".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.6 }}
                  className="inline-block italic"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="text-gradient animate-aurora font-[500]"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, var(--frost), var(--aurora), var(--primary), var(--frost))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200% 200%",
                }}
              >
                Frost & Flame.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-6 max-w-lg text-lg text-foreground/70"
            >
              Where the fire of Karachi karahi meets the calm of a glacier lounge. An
              immersive tasting journey across biryani, BBQ, sweets & cold-brew chai.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/menu"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-7 py-4 text-sm font-semibold text-[var(--deep)] transition hover:shadow-[0_0_60px_-5px_var(--aurora)]"
              >
                <span>Explore the menu</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <button
                onClick={() => setStoryOpen(true)}
                className="group inline-flex items-center gap-3 rounded-full glass px-6 py-4 text-sm font-medium transition hover:bg-white/10"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition group-hover:scale-110">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Watch the story
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {[
                { n: 42, s: "+", label: "Dishes crafted daily" },
                { n: 128000, s: "+", label: "Guests served" },
                { n: 12, s: "", label: "Cities across Pakistan" },
              ].map((st) => (
                <div key={st.label}>
                  <div className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                    <Counter to={st.n} suffix={st.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-foreground/60">
                    {st.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual — editorial magazine composition */}
          <motion.div
            style={{ scale, x: smx, y: smy }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[540px]"
          >
            {/* Soft ambient glow */}
            <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-[var(--aurora)]/25 via-[var(--primary)]/20 to-transparent blur-3xl" />

            {/* Vertical label */}
            <div className="absolute -left-4 top-8 z-20 hidden rotate-180 text-[10px] uppercase tracking-[0.5em] text-foreground/50 [writing-mode:vertical-rl] sm:block">
              Chapter 01 — The Sapphire Plate
            </div>

            {/* Main tilted card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative h-full w-full overflow-hidden rounded-[2.2rem] glass-strong elegant-shadow"
            >
              <img
                src={heroPlating}
                alt="Saffron biryani plated with rose petals and silver leaf"
                className="h-full w-full object-cover"
                width={1280}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/15" />

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-foreground/60">Tonight's signature</div>
                  <div className="mt-1 font-display text-2xl italic leading-none">Sindhi Royal Biryani</div>
                </div>
                <div className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
                  Rs. 1,290
                </div>
              </div>
            </motion.div>

            {/* Floating dish thumb — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20, rotate: 8 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="absolute -right-6 top-6 z-10 w-36 sm:w-44"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-2xl glass-strong elegant-shadow ring-1 ring-white/10"
              >
                <img src={dishNihari} alt="Slow-cooked nihari" className="aspect-square w-full object-cover" />
                <div className="flex items-center justify-between px-3 py-2 text-[10px]">
                  <span className="font-medium">Nihari</span>
                  <span className="text-foreground/60">Slow · 8h</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating chai — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20, rotate: -10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="absolute -left-8 bottom-16 z-10 w-32 sm:w-40"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-2xl glass-strong elegant-shadow ring-1 ring-white/10"
              >
                <img src={dishChai} alt="Cold brew Kashmiri chai" className="aspect-square w-full object-cover" />
                <div className="flex items-center justify-between px-3 py-2 text-[10px]">
                  <span className="font-medium">Cold Chai</span>
                  <span className="text-foreground/60">Iced</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating dessert badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="absolute -right-10 bottom-8 z-20 hidden w-32 sm:block"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [4, -2, 4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-full glass-strong ring-1 ring-white/15 elegant-shadow"
              >
                <img src={dishRasMalai} alt="Ras malai" className="aspect-square w-full object-cover" />
              </motion.div>
              <div className="mt-2 rounded-full glass px-3 py-1 text-center text-[10px] font-medium">
                ⭐ 4.9 · 2.1k reviews
              </div>
            </motion.div>

            {/* Corner accent */}
            <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] blur-2xl opacity-60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-white/10 py-4 backdrop-blur">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-xs uppercase tracking-[0.35em] text-foreground/60">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-16">
              <span>❄ Karahi</span>
              <span>◆ Biryani</span>
              <span>❄ Nihari</span>
              <span>◆ Haleem</span>
              <span>❄ BBQ Platter</span>
              <span>◆ Ras Malai</span>
              <span>❄ Handi</span>
              <span>◆ Chai Glaciale</span>
              <span>❄ Naan</span>
              <span>◆ Shawarma</span>
            </div>
          ))}
        </div>
      </div>
      <StoryModal open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
  );
}