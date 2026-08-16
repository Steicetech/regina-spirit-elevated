# Contenuti da confermare — Regina Spirits

Tutto ciò che è marcato `[DA CONFERMARE]` nel codice deve essere fornito dalla Regina.

## Prodotti (`src/data/products.ts`)
- Nomi reali dei 4 prodotti più venduti (ora PRODOTTO_01…04, `featured: true`)
- Testi, prezzi, formati e gradazioni ancora marcati `[DA CONFERMARE]`
- **Fotografie ufficiali delle 36 bottiglie**: oggi `hasOfficialPhoto: false` per tutti. Senza foto ufficiale il sito mostra un blocco neutro (coroa + nome), mai la foto di un'altra bottiglia.
- Verifica del resto del catalogo nelle quattro categorie

## Premi (`src/data/awards.ts`)
- Nome concorso, fiera, città, anni, prodotto premiato, eventuale immagine
- La sezione resta nascosta finché `showAwardsSection = false` e `verified = false`

## Editoriale (`src/data/stories.ts`)
- Testi definitivi degli articoli, date reali, immagini

## Istituzionale (`src/data/site-content.ts`)
- Testo su azienda, laboratorio, conto terzi
- Username social ufficiale

## Legale
- Privacy, cookie e termini definitivi (`src/routes/privacy|cookie|termini.tsx`)

## Immagini necessarie
- Logo ufficiale in SVG (oggi header e age gate usano corona + wordmark)
- Foto ufficiali delle 36 bottiglie a catalogo (nessuna è ancora `hasOfficialPhoto`)
- Laboratorio: ambiente, processo, squadra, ingredienti
- Mantova: acqua, architettura, tavola
- Cocktail e aperitivo
