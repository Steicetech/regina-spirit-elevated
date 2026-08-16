# Contenuti da confermare — Regina Spirits

Tutto ciò che è marcato `[DA CONFERMARE]` nel codice deve essere fornito dalla Regina.

## Prodotti (`src/data/products.ts`)
- Nomi reali dei 4 prodotti principali (ora PRODOTTO_01…04)
- Categoria, descrizione breve e completa
- Prezzo, formato, gradazione
- Note di degustazione e suggerimenti di servizio
- Fotografie ufficiali di bottiglie ed etichette (le attuali sono segnaposto generati)

## Premi (`src/data/awards.ts`)
- Nome concorso, fiera, città, anni, prodotto premiato, eventuale immagine
- La sezione resta nascosta finché `showAwardsSection = false` e `verified = false`

## Punti vendita (`src/data/stockists.ts`)
- Elenco reale di bar, ristoranti, enoteche, hotel, negozi (ora solo segnaposto)
- Eventuale fornitore mappa

## Editoriale (`src/data/stories.ts`)
- Testi definitivi degli articoli, date reali, immagini

## Istituzionale (`src/data/site-content.ts`)
- Testo su azienda, laboratorio, conto terzi
- Username social ufficiale
- URL del catalogo completo (~90 prodotti)

## Legale
- Privacy, cookie e termini definitivi (`src/routes/privacy|cookie|termini.tsx`)

## Immagini necessarie
- Logo ufficiale in SVG (oggi il header usa un wordmark testuale)
- 4 bottiglie su fondo avorio, dettagli etichette
- Laboratorio: ambiente, processo, squadra, ingredienti
- Mantova: acqua, architettura, tavola
- Cocktail e aperitivo
