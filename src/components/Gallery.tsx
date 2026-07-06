import { motion } from "framer-motion";
import karahi from "@/assets/hero-dish.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import burger from "@/assets/dish-burger.jpg";
import sweets from "@/assets/dish-sweets.jpg";
import chai from "@/assets/dish-chai.jpg";
import bbq from "@/assets/dish-bbq.jpg";

const grid = [
  { src: karahi, span: "md:col-span-2 md:row-span-2", h: "h-[500px]" },
  { src: biryani, span: "", h: "h-[240px]" },
  { src: chai, span: "", h: "h-[240px]" },
  { src: bbq, span: "md:col-span-2", h: "h-[280px]" },
  { src: sweets, span: "", h: "h-[280px]" },
  { src: burger, span: "", h: "h-[280px]" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <div className="mb-4 inline-block rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em]">
              Gallery
            </div>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Shot in <span className="text-gradient">cold light.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {grid.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl glass elegant-shadow ${g.span} ${g.h}`}
            >
              <img
                src={g.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--deep)]/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}