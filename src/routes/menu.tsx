import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/use-document-head";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
});

function MenuPage() {
  useDocumentHead(
    "The Full Menu — Royal Dastarkhuwan",
    "Explore every dish across nine kitchens — desi, biryani, BBQ, sweets, cold-brew chai and more at Royal Dastarkhuwan.",
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-32">
        <Categories />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full glass-strong px-7 py-4 text-sm font-semibold transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}