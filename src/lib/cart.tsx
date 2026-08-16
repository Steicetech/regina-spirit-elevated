import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  items: { product: Product; quantity: number }[];
  count: number;
  subtotal: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "regina-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* storage non disponibile */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage non disponibile */
    }
  }, [lines]);

  const add = useCallback((productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.available) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: Math.min(l.quantity + quantity, 99) }
            : l,
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) =>
            l.productId === productId ? { ...l, quantity: Math.min(quantity, 99) } : l,
          ),
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        return product ? { product, quantity: l.quantity } : null;
      })
      .filter((x): x is { product: Product; quantity: number } => x !== null);

    return {
      lines,
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.product.price * i.quantity, 0),
      add,
      remove,
      setQuantity,
      clear: () => setLines([]),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, add, remove, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve essere usato dentro CartProvider");
  return ctx;
}
