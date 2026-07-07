import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Snowflake, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState } from "react";

export function CartDrawer() {
  const { open, setOpen, items, setQty, remove, subtotal, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-[var(--deep)]/60 backdrop-blur-md"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[81] flex h-full w-full max-w-md flex-col overflow-hidden"
          >
            {/* Frozen tray backdrop */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--deep)] via-[oklch(0.2_0.05_235)] to-[var(--deep)]" />
            <div className="absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-[var(--aurora)]/25 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full bg-[var(--frost)]/15 blur-3xl" />

            {/* Header — "Your Table" */}
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Your table
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <Snowflake className="h-5 w-5 text-[var(--aurora)]" />
                  <span className="text-2xl font-semibold text-gradient">
                    Table #{String(42).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Ice tray */}
            <div className="relative flex-1 overflow-y-auto p-6">
              {placed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid h-full place-items-center text-center"
                >
                  <div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]"
                    >
                      <Snowflake className="h-10 w-10" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-semibold">Order sent to the kitchen</h3>
                    <p className="mt-2 text-sm text-foreground/60">
                      A steward will confirm your table in under a minute.
                    </p>
                    <button
                      onClick={() => {
                        setPlaced(false);
                        clear();
                        setOpen(false);
                      }}
                      className="mt-8 rounded-full glass px-6 py-3 text-sm hover:bg-white/10"
                    >
                      Continue exploring
                    </button>
                  </div>
                </motion.div>
              ) : items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full glass">
                      <Snowflake className="h-6 w-6 text-[var(--aurora)]" />
                    </div>
                    <div className="text-lg font-semibold">Your table is empty</div>
                    <p className="mt-2 max-w-xs text-sm text-foreground/60">
                      Compose your feast — every plate here is served on a chilled slate.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((it, i) => (
                      <motion.li
                        key={it.name}
                        layout
                        initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className="group relative overflow-hidden rounded-2xl glass p-3"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
                            {it.image ? (
                              <img
                                src={it.image}
                                alt={it.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="grid h-full w-full place-items-center text-2xl">
                                ❄
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">{it.name}</div>
                            <div className="text-xs text-foreground/50">{it.category}</div>
                            <div className="mt-1 text-sm text-gradient">
                              Rs {(it.price * it.qty).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={() => remove(it.name)}
                              className="text-foreground/40 hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <div className="inline-flex items-center gap-1 rounded-full glass px-1 py-1">
                              <button
                                onClick={() => setQty(it.name, it.qty - 1)}
                                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/10"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-semibold">
                                {it.qty}
                              </span>
                              <button
                                onClick={() => setQty(it.name, it.qty + 1)}
                                className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--frost)] to-[var(--aurora)] text-[var(--deep)]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {!placed && items.length > 0 && (
              <div className="border-t border-white/10 p-6">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-foreground/60">
                    <span>{count} plate{count === 1 ? "" : "s"}</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Service</span>
                    <span>Rs {tax.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                      Total
                    </span>
                    <span className="text-3xl font-semibold text-gradient">
                      Rs {total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPlaced(true)}
                  className="relative mt-5 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--frost)] to-[var(--aurora)] px-6 py-4 text-sm font-semibold text-[var(--deep)] shadow-[0_0_40px_-8px_var(--aurora)]"
                >
                  <span className="relative z-10">Send to the kitchen →</span>
                  <motion.span
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-white/30 blur-md"
                  />
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}