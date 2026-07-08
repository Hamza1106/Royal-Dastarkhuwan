import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthProvider";

export type CartItem = {
  name: string;
  price: number;
  image?: string;
  category: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (name: string) => void;
  setQty: (name: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
  lastAdded: string | null;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpenState] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const requireAuth = () => {
    if (!user) {
      setOpenState(false);
      navigate({ to: "/auth" });
      return false;
    }
    return true;
  };

  const setOpen = (v: boolean) => {
    if (v && !requireAuth()) return;
    setOpenState(v);
  };

  const add: CartCtx["add"] = (item) => {
    if (!requireAuth()) return;
    setItems((prev) => {
      const ex = prev.find((p) => p.name === item.name);
      if (ex) return prev.map((p) => (p.name === item.name ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
    setLastAdded(item.name);
    setOpenState(true);
    window.setTimeout(() => setLastAdded(null), 1400);
  };
  const remove: CartCtx["remove"] = (name) =>
    setItems((prev) => prev.filter((p) => p.name !== name));
  const setQty: CartCtx["setQty"] = (name, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.name !== name)
        : prev.map((p) => (p.name === name ? { ...p, qty } : p)),
    );
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      lastAdded,
    }),
    [items, open, lastAdded, user],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}