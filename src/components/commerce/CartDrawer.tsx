import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, setQuantity, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Chiudi il carrello"
            className="absolute inset-0 bg-ink/30"
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrello"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <h2 className="font-display text-lg">Carrello</h2>
              <button
                type="button"
                onClick={closeCart}
                autoFocus
                aria-label="Chiudi il carrello"
                className="grid size-11 place-items-center rounded-full hover:bg-secondary"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5" aria-live="polite">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="size-7 text-muted-foreground" strokeWidth={1.25} />
                  <p className="text-sm text-muted-foreground">Il tuo carrello è vuoto.</p>
                  <Link
                    to="/prodotti"
                    onClick={closeCart}
                    className="min-h-11 rounded-full border border-foreground px-6 text-sm leading-[2.75rem]"
                  >
                    Scopri i prodotti
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4 py-5">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        width={80}
                        height={104}
                        loading="lazy"
                        className="h-26 w-20 shrink-0 rounded-sm bg-card object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-base">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              aria-label={`Riduci quantità di ${product.name}`}
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              className="grid size-10 place-items-center"
                            >
                              <Minus className="size-4" strokeWidth={1.5} />
                            </button>
                            <span className="w-6 text-center text-sm">{quantity}</span>
                            <button
                              type="button"
                              aria-label={`Aumenta quantità di ${product.name}`}
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              className="grid size-10 place-items-center"
                            >
                              <Plus className="size-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="link-text min-h-10 text-xs text-muted-foreground"
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-5 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotale</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Link
                  to="/carrello"
                  onClick={closeCart}
                  className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-foreground text-sm text-background"
                >
                  Vai al carrello
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
