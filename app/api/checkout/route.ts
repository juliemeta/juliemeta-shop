import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const items = body.items;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: items.map((item: any) => ({
      price_data: {
        currency: "dkk",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          metadata: {
            product_id: item.id.toString(),
          },
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    })),

    success_url: `${process.env.NEXT_PUBLIC_STRIPE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_URL}/cart`,
    metadata: {
      items: JSON.stringify(
        items.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      ),
    },
  });

  return NextResponse.json({ url: session.url });
}
