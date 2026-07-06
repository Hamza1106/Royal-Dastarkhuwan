import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Snowflake, User } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const links = [
    { to: "/", label: "Home" },
    { to: "/", label: "Menu", hash: "categories" },
    { to: "/", label: "Story", hash: "story" },
    { to: "/", label: "Branches", hash: "branches" },
    { to: "/", label: "Gallery", hash: "gallery" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong elegant-shadow" : "glass"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]"
            >
              <Snowflake className="h-5 w-5" />
            </motion.div>
            <span className="text-lg font-semibold tracking-tight text-gradient">
              Frost & Flame
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.hash ? `#${l.hash}` : "/"}
                className="group relative rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:text-foreground"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 scale-75 rounded-full bg-white/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <Link
            to="/auth"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-5 py-2 text-sm font-medium text-[var(--deep)] transition hover:shadow-[0_0_30px_-5px_var(--aurora)]"
          >
            <User className="h-4 w-4" />
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}