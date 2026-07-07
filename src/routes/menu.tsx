import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { FloatingOrbs } from "@/components/FloatingOrbs";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Full Menu — Frost & Flame" },
      {
        name: "description",
        content:
          "Explore every dish across nine kitchens — desi, biryani, BBQ, sweets, cold-brew chai and more at Frost & Flame.",
      },
      { property: "og:title", content: "The Full Menu — Frost & Flame" },
      {
        property: "og:description",
        content: "Nine kitchens, one glacial table. Every dish, every ritual.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative pt-40 pb-8">
        <FloatingOrbs />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> Back to home
            </Link>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              The full <span className="text-gradient">library</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/60">
              Nine kitchens. Every dish we plate. Filter, explore, and compose your own
              tasting arc.
            </p>
          </motion.div>
        </div>
      </div>
      <Categories />
      <Footer />
    </div>
  );
}