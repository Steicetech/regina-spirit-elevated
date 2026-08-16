import bottiglia01 from "@/assets/bottiglia-01.jpg";
import bottiglia02 from "@/assets/bottiglia-02.jpg";
import bottiglia03 from "@/assets/bottiglia-03.jpg";
import bottiglia04 from "@/assets/bottiglia-04.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  currency: "EUR";
  volume: string;
  alcohol: string;
  images: string[];
  accentColor: string;
  tastingNotes: string[];
  servingSuggestions: string[];
  available: boolean;
  featured: boolean;
};

/**
 * I quattro prodotti principali.
 * Tutti i dati non ancora confermati dalla Regina sono marcati [DA CONFERMARE].
 * Le immagini sono segnaposto: verranno sostituite dalle fotografie ufficiali
 * delle bottiglie e delle etichette esistenti.
 */
export const products: Product[] = [
  {
    id: "prodotto-01",
    slug: "prodotto-01",
    name: "PRODOTTO_01",
    category: "Liquore [DA CONFERMARE]",
    shortDescription: "[DA CONFERMARE]",
    fullDescription:
      "Descrizione completa [DA CONFERMARE]. Il testo definitivo sarà fornito dalla Regina Spirits.",
    price: 0,
    currency: "EUR",
    volume: "[DA CONFERMARE]",
    alcohol: "[DA CONFERMARE]",
    images: [bottiglia01],
    accentColor: "var(--ambra)",
    tastingNotes: ["[DA CONFERMARE]"],
    servingSuggestions: ["[DA CONFERMARE]"],
    available: true,
    featured: true,
  },
  {
    id: "prodotto-02",
    slug: "prodotto-02",
    name: "PRODOTTO_02",
    category: "Gin [DA CONFERMARE]",
    shortDescription: "[DA CONFERMARE]",
    fullDescription:
      "Descrizione completa [DA CONFERMARE]. Il testo definitivo sarà fornito dalla Regina Spirits.",
    price: 0,
    currency: "EUR",
    volume: "[DA CONFERMARE]",
    alcohol: "[DA CONFERMARE]",
    images: [bottiglia02],
    accentColor: "var(--bronzo)",
    tastingNotes: ["[DA CONFERMARE]"],
    servingSuggestions: ["[DA CONFERMARE]"],
    available: true,
    featured: true,
  },
  {
    id: "prodotto-03",
    slug: "prodotto-03",
    name: "PRODOTTO_03",
    category: "Aperitivo [DA CONFERMARE]",
    shortDescription: "[DA CONFERMARE]",
    fullDescription:
      "Descrizione completa [DA CONFERMARE]. Il testo definitivo sarà fornito dalla Regina Spirits.",
    price: 0,
    currency: "EUR",
    volume: "[DA CONFERMARE]",
    alcohol: "[DA CONFERMARE]",
    images: [bottiglia03],
    accentColor: "var(--bitter)",
    tastingNotes: ["[DA CONFERMARE]"],
    servingSuggestions: ["[DA CONFERMARE]"],
    available: true,
    featured: true,
  },
  {
    id: "prodotto-04",
    slug: "prodotto-04",
    name: "PRODOTTO_04",
    category: "Liquore d'erbe [DA CONFERMARE]",
    shortDescription: "[DA CONFERMARE]",
    fullDescription:
      "Descrizione completa [DA CONFERMARE]. Il testo definitivo sarà fornito dalla Regina Spirits.",
    price: 0,
    currency: "EUR",
    volume: "[DA CONFERMARE]",
    alcohol: "[DA CONFERMARE]",
    images: [bottiglia04],
    accentColor: "var(--botanico)",
    tastingNotes: ["[DA CONFERMARE]"],
    servingSuggestions: ["[DA CONFERMARE]"],
    available: true,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatPrice = (value: number, currency: "EUR" = "EUR") =>
  value > 0
    ? new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(value)
    : "Prezzo [DA CONFERMARE]";
