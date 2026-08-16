import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/data/site-content";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={cn(
          "page-x mx-auto grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 transition-all duration-500",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-24",
        )}
      >
        <Logo className={cn(overHero && "text-background")} />

        <nav aria-label="Navigazione principale" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "text-[0.8rem] tracking-wide transition-opacity hover:opacity-60",
                    overHero ? "text-background" : "text-foreground",
                  )}
                  activeProps={{ className: "underline underline-offset-8 decoration-bronzo" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Link
            to="/prodotti"
            className={cn(
              "hidden min-h-11 items-center rounded-full border px-5 text-[0.8rem] transition-colors sm:inline-flex",
              overHero
                ? "border-background/40 text-background hover:bg-background/10"
                : "border-foreground text-foreground hover:bg-foreground hover:text-background",
            )}
          >
            Acquista
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Carrello, ${count} articoli`}
            className={cn(
              "relative grid size-11 place-items-center rounded-full transition-colors",
              overHero ? "text-background hover:bg-background/10" : "hover:bg-secondary",
            )}
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-bronzo text-[0.6rem] font-medium text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Apri il menu"
            aria-expanded={menuOpen}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              overHero ? "text-background hover:bg-background/10" : "hover:bg-secondary",
            )}
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Chiudi il menu"
              className="absolute inset-0 bg-ink/30"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-background pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="page-x flex h-16 items-center justify-between">
                <Logo />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setMenuOpen(false)}
                  aria-label="Chiudi il menu"
                  className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav aria-label="Navigazione mobile" className="page-x flex-1 overflow-y-auto py-6">
                <ul className="flex flex-col">
                  {nav.map((item) => (
                    <li key={item.to} className="border-b border-border">
                      <Link
                        to={item.to}
                        className="flex min-h-14 items-center font-display text-2xl tracking-tight"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/prodotti"
                  className="mt-8 flex min-h-12 w-full items-center justify-center rounded-full bg-foreground text-sm text-background"
                >
                  Acquista
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
