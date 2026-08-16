import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/data/products";

/**
 * Crea una sessione Stripe Checkout (solo test mode).
 * I prezzi vengono letti dal catalogo lato server: il client non può inviarli.
 */
export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        lines: z
          .array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(99) }))
          .min(1),
        origin: z.string().url(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const secret = process.env["STRIPE_SECRET_KEY"];
    if (!secret) {
      return {
        ok: false as const,
        error:
          "Stripe non è configurato. Imposta STRIPE_SECRET_KEY (chiave di test sk_test_...) per attivare il checkout.",
      };
    }
    if (!secret.startsWith("sk_test_")) {
      return {
        ok: false as const,
        error: "Sono ammesse solo chiavi Stripe di test (sk_test_...). Pagamenti reali disattivati.",
      };
    }

    const lineItems = data.lines.map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product || !product.available) {
        throw new Error(`Prodotto non disponibile: ${line.productId}`);
      }
      if (product.price <= 0) {
        throw new Error(
          `Prezzo non confermato per ${product.name}. Il checkout resta disattivato finché i prezzi ufficiali non saranno inseriti.`,
        );
      }
      return {
        quantity: line.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: { name: product.name, description: product.category },
        },
      };
    });

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        success_url: `${data.origin}/checkout/successo?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${data.origin}/checkout/annullato`,
      });
      if (!session.url) return { ok: false as const, error: "Sessione Stripe senza URL." };
      return { ok: true as const, url: session.url };
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : "Errore durante la creazione del checkout.",
      };
    }
  });
