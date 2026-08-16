# Contenuti da confermare — Regina Spirits

Tutto ciò che è marcato `[DA CONFERMARE]` nel codice deve essere fornito dalla Regina.

## Prodotti (`src/data/products.ts`)
- I quattro più venduti: Lotus Gin, Melon Gin, 46100 GIN PREMIUM, Cream Liqueur Melone
- **Lotus Gin** era `available: false`. Impostato a `true` perché è il prodotto di punta. Confermare con il cliente se è davvero in vendita.
- Testi, prezzi, formati e gradazioni ancora marcati `[DA CONFERMARE]`
- **Fotografie ufficiali delle 36 bottiglie**: oggi `hasOfficialPhoto: false` per tutti. Senza foto ufficiale il sito mostra un blocco neutro (coroa + nome), mai la foto di un'altra bottiglia.
- I quattro più venduti usano per ora quattro placeholder distinti. Priorità massima: foto ufficiali di quelle quattro bottiglie.
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
- **Priorità massima:** foto ufficiali delle quattro bottiglie in evidenza (Lotus Gin, Melon Gin, 46100, Cream Liqueur Melone). Oggi usano placeholder distinti.
- Foto reali dei fiori di loto del Lago Superiore / Mincio (la sezione in home usa `mantova.jpg` come sostituto)
- Foto ufficiali delle 36 bottiglie a catalogo (nessuna è ancora `hasOfficialPhoto`)
- Laboratorio: ambiente, processo, squadra, ingredienti
- Mantova: acqua, architettura, tavola
- Cocktail e aperitivo

## Storia del fiore di loto
- Confermare con il cliente il testo su Maria Pellegreffi, il 1921 e i lótus del Lago Superiore e del Mincio
- Confermare il claim di esclusività regionale (Lotus Gin, Melon Gin, Cream Liqueur Melone)
