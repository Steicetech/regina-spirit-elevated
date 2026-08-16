import { createFileRoute } from "@tanstack/react-router";

/**
 * Webhook Stripe (test mode). Verifica la firma prima di elaborare l'evento.
 * Configura STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET.
 */
export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_SECRET_KEY"];
        const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];
        const signature = request.headers.get("stripe-signature");
        if (!secret || !webhookSecret || !signature) {
          return new Response("Webhook non configurato", { status: 400 });
        }

        const body = await request.text();
        const { default: Stripe } = await import("stripe");
        const stripe = new Stripe(secret);

        try {
          const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
          if (event.type === "checkout.session.completed") {
            // Punto di aggancio per l'e-commerce attuale di Regina Spirits.
            console.log("Pagamento di test completato:", event.id);
          }
          return new Response("ok");
        } catch {
          return new Response("Firma non valida", { status: 401 });
        }
      },
    },
  },
});
