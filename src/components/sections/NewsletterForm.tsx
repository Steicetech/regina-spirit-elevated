import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const dark = variant === "dark";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className={cn("eyebrow", dark && "text-background/50")}>Newsletter</h2>
      <p className={cn("mt-5 text-sm", dark ? "text-background/80" : "text-muted-foreground")}>
        Storie, prodotti e appuntamenti dal nostro laboratorio.
      </p>

      <label htmlFor={`nl-email-${variant}`} className="sr-only">
        Email
      </label>
      <input
        id={`nl-email-${variant}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="La tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          "mt-5 min-h-12 w-full rounded-full border px-5 text-sm outline-none",
          dark
            ? "border-background/25 bg-transparent text-background placeholder:text-background/40"
            : "border-border bg-card",
        )}
      />

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-current"
        />
        <span className={dark ? "text-background/60" : "text-muted-foreground"}>
          Acconsento al trattamento dei miei dati per l'invio della newsletter.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "mt-5 min-h-12 w-full rounded-full text-sm transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-8",
          dark ? "bg-background text-ink" : "bg-foreground text-background",
        )}
      >
        {status === "loading" ? "Invio…" : "Iscriviti"}
      </button>

      <p
        aria-live="polite"
        className={cn("mt-3 min-h-5 text-xs", dark ? "text-background/70" : "text-muted-foreground")}
      >
        {status === "done" && "Grazie, iscrizione registrata."}
        {status === "error" && "Inserisci un'email valida e presta il consenso."}
      </p>
    </form>
  );
}
