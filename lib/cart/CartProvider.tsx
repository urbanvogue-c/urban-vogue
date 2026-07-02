"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  size: string | null;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size: string | null) => void;
  updateQuantity: (productId: string, size: string | null, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "urban-vogue-cart";

function lineKey(productId: string, size: string | null) {
  return `${productId}::${size ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted cart state
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem: CartContextValue["addItem"] = (line, quantity = 1) => {
    setLines((prev) => {
      const key = lineKey(line.productId, line.size);
      const existing = prev.find((l) => lineKey(l.productId, l.size) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.productId, l.size) === key
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { ...line, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (productId, size) => {
    setLines((prev) => prev.filter((l) => lineKey(l.productId, l.size) !== lineKey(productId, size)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, size, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => lineKey(l.productId, l.size) !== lineKey(productId, size))
        : prev.map((l) =>
            lineKey(l.productId, l.size) === lineKey(productId, size)
              ? { ...l, quantity }
              : l
          )
    );
  };

  const clear = () => setLines([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.quantity * l.price, 0),
    }),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, updateQuantity, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
