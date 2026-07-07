import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroDish from "@/assets/hero-dish.jpg";
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

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
              {"Taste the".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.6 }}
                  className="inline-block"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="text-gradient animate-aurora"
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
              <a
                href="#categories"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-7 py-4 text-sm font-semibold text-[var(--deep)] transition hover:shadow-[0_0_60px_-5px_var(--aurora)]"
              >
                <span>Explore the menu</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
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

          {/* Visual */}
          <motion.div
            style={{ scale, x: smx, y: smy }}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
          >
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/20" />
            <div
              className="absolute inset-6 animate-spin-slow rounded-full border border-white/10"
              style={{ animationDirection: "reverse", animationDuration: "40s" }}
            />

            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[var(--aurora)]/30 to-[var(--primary)]/30 blur-3xl" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-full glass-strong elegant-shadow"
            >
              <img
                src={heroDish}
                alt="Signature chicken karahi in copper pan"
                className="h-full w-full object-cover"
                width={1400}
                height={1400}
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </motion.div>

            {/* Floating chips */}
            {[
              { top: "8%", left: "-8%", label: "🌶️ Signature Spice", d: 0 },
              { top: "40%", left: "88%", label: "❄️ Cold Brew Chai", d: 1 },
              { top: "82%", left: "6%", label: "⭐ 4.9 / 2.1k reviews", d: 2 },
            ].map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + c.d * 0.2, duration: 0.6 }}
                className="absolute"
                style={{ top: c.top, left: c.left }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + c.d, repeat: Infinity, ease: "easeInOut" }}
                  className="whitespace-nowrap rounded-full glass-strong px-4 py-2 text-xs font-medium"
                >
                  {c.label}
                </motion.div>
              </motion.div>
            ))}
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