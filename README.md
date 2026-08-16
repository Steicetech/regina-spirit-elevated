# Regina Spirits — reginaspirits.com

Sito del liquorificio artigianale Regina Spirits (Pomponesco, Mantova), concetto
**Mantova da Gustare**. Interfaccia in italiano, editoriale, mobile-first.

## Stack
React 19 + TypeScript, TanStack Start/Router (router del progetto, sostituisce React Router),
Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide, Stripe Checkout (test mode).

## Installazione
```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # build di produzione
```

## Stripe (solo test)
1. Copia `.env.example` in `.env`
2. Inserisci `STRIPE_SECRET_KEY` (solo chiavi `sk_test_…`, altrimenti il checkout è bloccato)
3. Webhook: `POST /api/public/stripe-webhook`, con `STRIPE_WEBHOOK_SECRET`
4. I prezzi vengono validati lato server da `src/data/products.ts`: il client non li invia mai.
   Con prezzo `0` il checkout resta disattivato finché i prezzi ufficiali non saranno confermati.

## Struttura
```
src/components/{ui,layout,sections,commerce,motion}
src/data/{products,site-content,awards,stockists,stories}.ts
src/routes            # pagine (file-based routing)
src/lib               # carrello, checkout server function
docs/content-needed.md
```

## Note
- Age gate, cookie consent e carrello sono persistiti in localStorage.
- La sezione premi è nascosta finché i dati non sono verificati.
- Tutti i dati non confermati sono marcati `[DA CONFERMARE]`: nessuna informazione inventata.
