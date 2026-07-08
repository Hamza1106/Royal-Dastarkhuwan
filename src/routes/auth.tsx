import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Lock, User, Snowflake } from "lucide-react";
import { FloatingOrbs, Particles } from "@/components/FloatingOrbs";
import { useAuth } from "@/components/AuthProvider";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Frost & Flame" },
      { name: "description", content: "Enter the Frost & Flame universe." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || email.split("@")[0] || "Guest";
    signIn({ name: displayName, email: email || "guest@frost.flame" });
    navigate({ to: "/" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingOrbs />
      <Particles count={30} />

      <Link
        to="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-foreground/80 transition hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Visual side */}
        <div className="relative hidden overflow-hidden lg:block">
          <div
            className="absolute inset-0 animate-aurora"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.3 0.12 220), oklch(0.35 0.18 180), oklch(0.28 0.14 260))",
              backgroundSize: "200% 200%",
            }}
          />
          <div className="absolute inset-0 backdrop-blur-3xl" />

          {/* Floating ice shards */}
          {Array.from({ length: 14 }).map((_, i) => {
            const size = 40 + Math.random() * 90;
            return (
              <motion.div
                key={i}
                className="absolute rounded-2xl glass-strong"
                style={{
                  width: size,
                  height: size,
                  top: `${Math.random() * 90}%`,
                  left: `${Math.random() * 90}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            );
          })}

          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]">
                <Snowflake className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">Frost & Flame</span>
            </div>
            <div className="max-w-md">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-semibold leading-tight tracking-tight"
              >
                Step into the{" "}
                <span className="text-gradient">glacier lounge.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-4 text-foreground/70"
              >
                Members unlock cold-brew chai tastings, private karahi nights, and
                first access to seasonal drops.
              </motion.p>
              <div className="mt-10 flex gap-3">
                {["Cold-brew Chai", "Private BBQ", "Chef's Table"].map((c) => (
                  <div key={c} className="rounded-full glass-strong px-4 py-2 text-xs">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="relative flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md rounded-3xl glass-strong p-8 elegant-shadow sm:p-10"
          >
            <div className="mb-8 flex rounded-full bg-white/5 p-1">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                    mode === m ? "text-[var(--deep)]" : "text-foreground/70"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="auth-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{m === "login" ? "Sign in" : "Create account"}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                transition={{ duration: 0.35 }}
                onSubmit={onSubmit}
                className="space-y-4"
              >
                <h1 className="text-3xl font-semibold tracking-tight">
                  {mode === "login" ? "Welcome back." : "Join the universe."}
                </h1>
                <p className="text-sm text-foreground/60">
                  {mode === "login"
                    ? "Your table remembers you."
                    : "Reserve your name in our guest book."}
                </p>

                {mode === "signup" && (
                  <Field
                    icon={<User className="h-4 w-4" />}
                    placeholder="Your name"
                    type="text"
                    value={name}
                    onChange={(v) => setName(v)}
                  />
                )}
                <Field
                  icon={<Mail className="h-4 w-4" />}
                  placeholder="you@email.com"
                  type="email"
                  value={email}
                  onChange={(v) => setEmail(v)}
                />
                <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" />

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-foreground/60 hover:text-foreground">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] transition hover:shadow-[0_0_40px_-5px_var(--aurora)]"
                >
                  {mode === "login" ? "Enter the lounge" : "Create my membership"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-4 py-2 text-xs text-foreground/50">
                  <span className="h-px flex-1 bg-white/10" />
                  or continue with
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Google", "Apple"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="rounded-full glass py-3 text-sm transition hover:bg-white/10"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function Field({
  icon,
  placeholder,
  type,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 transition group-focus-within:text-[var(--aurora)]">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-foreground/40 transition focus:border-[var(--aurora)]/50 focus:bg-white/10 focus:ring-2 focus:ring-[var(--aurora)]/30"
      />
    </label>
  );
}