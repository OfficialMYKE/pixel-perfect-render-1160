import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  detailedLines: Array<{ line: CartLine; product: Product }>;
}

const STORAGE_KEY = "avnyc-cart";

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.slug === "string" &&
        typeof l?.size === "string" &&
        typeof l?.qty === "number" &&
        products.some((p) => p.slug === l.slug),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(readStored());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage full or unavailable — ignore
    }
  }, [lines]);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (idx >= 0 && prev[idx]) {
        const current = prev[idx];
        const next = [...prev];
        next[idx] = {
          slug: current.slug,
          size: current.size,
          qty: Math.min(99, current.qty + qty),
        };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => !(l.slug === slug && l.size === size));
      return prev.map((l) =>
        l.slug === slug && l.size === size ? { ...l, qty: Math.min(99, qty) } : l,
      );
    });
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const detailedLines = lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        return product ? { line, product } : null;
      })
      .filter((x): x is { line: CartLine; product: Product } => x !== null);

    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = detailedLines.reduce(
      (sum, { line, product }) => sum + product.price * line.qty,
      0,
    );

    return { lines, count, subtotal, add, setQty, remove, clear, detailedLines };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
