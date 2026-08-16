import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STORAGE_KEY = "regina-cookie-consent-v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage non disponibile */
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage non disponibile */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Preferenze cookie"
          className="fixed inset-x-0 bottom-0 z-[90] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center">
            <p className="min-w-0 flex-1 text-sm text-muted-foreground">
              Usiamo cookie tecnici. Gli strumenti di analisi restano disattivati fino al tuo
              consenso.{" "}
              <Link to="/cookie" className="underline underline-offset-4">
                Cookie policy
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="min-h-11 rounded-full border border-border px-5 text-sm"
              >
                Rifiuta
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="min-h-11 rounded-full bg-foreground px-5 text-sm text-background"
              >
                Accetta
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
