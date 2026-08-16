import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { cities, stockists, stockistTypes } from "@/data/stockists";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/dove-trovarci")({
  head: () => ({
    meta: [
      { title: "Dove trovarci — Regina Spirits" },
      {
        name: "description",
        content: "Bar, ristoranti, enoteche, hotel e negozi dove trovare i prodotti Regina Spirits.",
      },
      { property: "og:title", content: "Dove trovarci — Regina Spirits" },
      { property: "og:description", content: "I punti vendita e i locali partner." },
      { property: "og:url", content: "/dove-trovarci" },
    ],
    links: [{ rel: "canonical", href: "/dove-trovarci" }],
  }),
  component: DoveTrovarci,
});

function DoveTrovarci() {
  const [city, setCity] = useState("tutte");
  const [type, setType] = useState("tutti");
  const [showMap, setShowMap] = useState(false);

  const results = useMemo(
    () =>
      stockists.filter(
        (s) => (city === "tutte" || s.city === city) && (type === "tutti" || s.type === type),
      ),
    [city, type],
  );

  const select =
    "mt-2 min-h-12 w-full rounded-md border border-border bg-card px-4 text-sm outline-none";

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Dove trovarci"
        title="I locali e i negozi"
        intro="Elenco in costruzione: tutti i punti mostrati sono segnaposto in attesa dei dati ufficiali."
      />

      <div className="page-x mx-auto max-w-[1440px]">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className="eyebrow">
              Città
            </label>
            <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className={select}>
              <option value="tutte">Tutte</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="prov" className="eyebrow">
              Provincia
            </label>
            <select id="prov" value={city} onChange={(e) => setCity(e.target.value)} className={select}>
              <option value="tutte">Tutte</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="eyebrow">
              Tipo di locale
            </label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} className={select}>
              <option value="tutti">Tutti</option>
              {stockistTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p aria-live="polite" className="eyebrow">
              {results.length} risultati
            </p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {results.map((s) => (
                <li key={s.id} className="flex min-h-[4.5rem] items-center gap-4 py-4">
                  <MapPin className="size-4 shrink-0 text-bronzo" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.type} · {s.city} ({s.province}) · {s.address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setShowMap((v) => !v)}
              className="min-h-12 w-full rounded-full border border-border px-6 text-sm lg:hidden"
            >
              {showMap ? "Nascondi la mappa" : "Mostra la mappa"}
            </button>
            <div
              className={`mt-4 grid aspect-[4/3] place-items-center rounded-sm border border-dashed border-border bg-card text-center text-sm text-muted-foreground lg:mt-0 ${
                showMap ? "" : "hidden lg:grid"
              }`}
            >
              <p className="px-6">
                Mappa interattiva [DA CONFERMARE]
                <br />
                Verrà caricata solo su richiesta, per non appesantire il mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
