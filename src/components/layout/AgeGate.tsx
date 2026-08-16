import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { responsibleDrinking, site } from "@/data/site-content";

const STORAGE_KEY = "regina-age-ok-v1";

export function AgeGate() {
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      ok = false;
    }
    setConfirmed(ok);
    setReady(true);
  }, []);

  const open = ready && !confirmed;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* storage non disponibile */
    }
    setConfirmed(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-gate-title"
            className="w-full max-w-md text-center"
          >
            <Logo asLink={false} variant="stacked" />
            <h1 id="age-gate-title" className="display-md mt-10">
              Hai più di 18 anni?
            </h1>
            <p className="measure mx-auto mt-5 text-sm text-muted-foreground">
              {site.name} vende bevande alcoliche. L'accesso è riservato ai maggiorenni.
            </p>
            <Button
              ref={buttonRef}
              type="button"
              variant="brand"
              size="lg"
              onClick={confirm}
              className="mt-9 w-full"
            >
              Ho più di 18 anni
            </Button>
            <a
              href="https://www.google.com"
              className="link-text mt-5 inline-flex min-h-11 items-center text-xs text-muted-foreground"
            >
              Non ho l'età, esci dal sito
            </a>
            <p className="mt-10 text-xs text-muted-foreground">{responsibleDrinking}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
