import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    console.log("👉 WEBHOOK CALLED");

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("❌ Webhook verify error:", err);
    return new NextResponse("Webhook error", { status: 400 });
  }

  console.log("✅ EVENT TYPE:", event.type);

  // 🔥 KUN DETTE EVENT ER VIGTIGT
  if (event.type === "checkout.session.completed") {
    console.log("🔥 ENTERED CHECKOUT SESSION");

    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // 🛒 HENT LINE ITEMS FRA STRIPE
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          limit: 100,
          expand: ["data.price.product"],
        },
      );

      console.log("🛒 LINE ITEMS:", JSON.stringify(lineItems.data, null, 2));

      // 🧾 SEND TIL WOOCOMMERCE
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3/orders`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
              ).toString("base64"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_method: "stripe",
            payment_method_title: "Stripe",
            set_paid: true,

            line_items: lineItems.data.map((item: any) => ({
              product_id: Number(item.price.product.metadata.product_id),
              quantity: item.quantity,
            })),
          }),
        },
      );

      const text = await res.text();

      console.log("🧾 WOO STATUS:", res.status);
      console.log("🧾 WOO RESPONSE:", text);
    } catch (err) {
      console.error("🔥 WEBHOOK CRASH:", err);
    }
  }

  return NextResponse.json({ received: true });
}
