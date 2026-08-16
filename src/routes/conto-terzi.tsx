import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { contoTerziIntro } from "@/data/site-content";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/conto-terzi")({
  head: () => ({
    meta: [
      { title: "Produzione conto terzi — Regina Spirits" },
      {
        name: "description",
        content:
          "Regina Spirits sviluppa prodotti per aziende e professionisti nel proprio laboratorio di Pomponesco.",
      },
      { property: "og:title", content: "Produzione conto terzi — Regina Spirits" },
      { property: "og:description", content: "Sviluppiamo prodotti per aziende e professionisti." },
      { property: "og:url", content: "/conto-terzi" },
    ],
    links: [{ rel: "canonical", href: "/conto-terzi" }],
  }),
  component: ContoTerzi,
});

type Status = "idle" | "loading" | "done" | "error";

function ContoTerzi() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const missing: string[] = [];
    for (const field of ["nome", "azienda", "email", "telefono", "tipo", "descrizione"]) {
      if (!String(form.get(field) ?? "").trim()) missing.push(field);
    }
    if (!form.get("privacy")) missing.push("privacy");
    if (missing.length > 0) {
      setErrors(missing);
      setStatus("error");
      return;
    }
    setErrors([]);
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
  };

  const field =
    "mt-2 min-h-12 w-full rounded-xs border border-border bg-card px-4 text-sm outline-none";

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Conto terzi" title="Produzione conto terzi" intro={contoTerziIntro} />

      <div className="page-x mx-auto max-w-[1440px] grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h2 className="display-md">Parliamo del tuo progetto</h2>
          <p className="measure mt-6 text-sm text-muted-foreground">
            Quantità minime, tempistiche, capacità produttiva e condizioni commerciali sono [DA
            CONFERMARE] e vengono definite caso per caso.
          </p>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="nome" className="eyebrow">
                Nome*
              </label>
              <input id="nome" name="nome" autoComplete="name" className={field} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="azienda" className="eyebrow">
                Azienda*
              </label>
              <input id="azienda" name="azienda" autoComplete="organization" className={field} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="email" className="eyebrow">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={field}
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="telefono" className="eyebrow">
                Telefono*
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="tipo" className="eyebrow">
                Tipo di prodotto*
              </label>
              <input id="tipo" name="tipo" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="descrizione" className="eyebrow">
                Descrizione del progetto*
              </label>
              <textarea id="descrizione" name="descrizione" rows={5} className={`${field} py-3`} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="quantita" className="eyebrow">
                Quantità stimata
              </label>
              <input id="quantita" name="quantita" inputMode="numeric" className={field} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="tempi" className="eyebrow">
                Tempi desiderati
              </label>
              <input id="tempi" name="tempi" className={field} />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-xs sm:col-span-2">
              <input type="checkbox" name="privacy" className="mt-0.5 size-4 shrink-0" />
              <span className="text-muted-foreground">
                Ho letto l'informativa privacy e acconsento al trattamento dei miei dati.*
              </span>
            </label>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? "Invio…" : "Parliamo del tuo progetto"}
              </Button>
              <p aria-live="polite" className="mt-4 min-h-5 text-sm">
                {status === "done" && "Grazie, abbiamo ricevuto la tua richiesta."}
                {status === "error" && `Controlla i campi obbligatori: ${errors.join(", ")}.`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
