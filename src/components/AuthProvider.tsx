import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AuthUser = { name: string; email: string };

type AuthCtx = {
  user: AuthUser | null;
  signIn: (u: AuthUser) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "ff_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn = (u: AuthUser) => {
    setUser(u);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(u));
    } catch {}
  };
  const signOut = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(KEY);
    } catch {}
  };

  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}