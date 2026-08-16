import laboratorio from "@/assets/laboratorio.jpg";
import mantovaImg from "@/assets/mantova.jpg";
import cocktail from "@/assets/cocktail.jpg";
import mani from "@/assets/mani.jpg";

export type StoryCategory =
  | "prodotti"
  | "laboratorio"
  | "Mantova"
  | "aperitivo"
  | "cocktail"
  | "persone"
  | "conto terzi";

export type Story = {
  slug: string;
  title: string;
  category: StoryCategory;
  image: string;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string[];
  seoDescription: string;
  related: string[];
};

export const storyCategories: StoryCategory[] = [
  "prodotti",
  "laboratorio",
  "Mantova",
  "aperitivo",
  "cocktail",
  "persone",
  "conto terzi",
];

/** Contenuti editoriali segnaposto: testi definitivi [DA CONFERMARE]. */
export const stories: Story[] = [
  {
    slug: "dentro-il-laboratorio",
    title: "Dentro il laboratorio",
    category: "laboratorio",
    image: laboratorio,
    date: "2026-05-12",
    readingTime: "4 min",
    excerpt:
      "Uno sguardo al luogo di Pomponesco dove nascono i nostri liquori. Testo [DA CONFERMARE].",
    body: [
      "Testo dell'articolo [DA CONFERMARE].",
      "Questo spazio è pronto ad accogliere il racconto ufficiale del laboratorio, senza dati inventati.",
    ],
    seoDescription:
      "Il laboratorio Regina Spirits a Pomponesco, Mantova. Contenuto [DA CONFERMARE].",
    related: ["mantova-da-gustare", "aperitivo-in-terra-mantovana"],
  },
  {
    slug: "mantova-da-gustare",
    title: "Mantova da Gustare",
    category: "Mantova",
    image: mantovaImg,
    date: "2026-04-28",
    readingTime: "5 min",
    excerpt:
      "Acqua, architettura e tavola: il territorio che dà forma al nostro gusto. Testo [DA CONFERMARE].",
    body: [
      "Testo dell'articolo [DA CONFERMARE].",
      "Il concetto Mantova da Gustare resta il filo conduttore del racconto.",
    ],
    seoDescription: "Mantova da Gustare: territorio e gusto. Contenuto [DA CONFERMARE].",
    related: ["dentro-il-laboratorio", "aperitivo-in-terra-mantovana"],
  },
  {
    slug: "aperitivo-in-terra-mantovana",
    title: "L'aperitivo in terra mantovana",
    category: "aperitivo",
    image: cocktail,
    date: "2026-04-02",
    readingTime: "3 min",
    excerpt: "Come si beve a Mantova, fra bar storici e nuove miscelazioni. Testo [DA CONFERMARE].",
    body: ["Testo dell'articolo [DA CONFERMARE]."],
    seoDescription: "L'aperitivo mantovano secondo Regina Spirits. Contenuto [DA CONFERMARE].",
    related: ["mantova-da-gustare", "le-mani-che-lavorano"],
  },
  {
    slug: "le-mani-che-lavorano",
    title: "Le mani che lavorano",
    category: "persone",
    image: mani,
    date: "2026-03-15",
    readingTime: "4 min",
    excerpt: "Le persone dietro ogni bottiglia. Testo [DA CONFERMARE].",
    body: ["Testo dell'articolo [DA CONFERMARE]."],
    seoDescription: "Le persone di Regina Spirits. Contenuto [DA CONFERMARE].",
    related: ["dentro-il-laboratorio"],
  },
];

export const latestStories = stories.slice(0, 3);

export const getStoryBySlug = (slug: string) => stories.find((s) => s.slug === slug);
