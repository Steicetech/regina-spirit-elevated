export type StockistType = "Bar" | "Ristorante" | "Enoteca" | "Hotel" | "Negozio";

export type Stockist = {
  id: string;
  name: string;
  type: StockistType;
  city: string;
  province: string;
  address: string;
  mapUrl?: string;
  placeholder: boolean;
};

export const stockistTypes: StockistType[] = [
  "Bar",
  "Ristorante",
  "Enoteca",
  "Hotel",
  "Negozio",
];

export const cities = ["Mantova", "Verona", "Brescia", "Parma", "Milano"];

const provinceByCity: Record<string, string> = {
  Mantova: "MN",
  Verona: "VR",
  Brescia: "BS",
  Parma: "PR",
  Milano: "MI",
};

/** Segnaposto: nessun locale reale. Da sostituire con l'elenco ufficiale. */
export const stockists: Stockist[] = cities.flatMap((city) =>
  stockistTypes.map((type, i) => ({
    id: `${city.toLowerCase()}-${type.toLowerCase()}-${i}`,
    name: `${type} — SEGNAPOSTO ${city} 0${i + 1}`,
    type,
    city,
    province: provinceByCity[city] ?? "",
    address: "Indirizzo [DA CONFERMARE]",
    placeholder: true,
  })),
);
