// app/api/variations/route.ts

import { NextResponse } from "next/server";
import { getProductVariations } from "@/lib/woocommerce";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const variations = await getProductVariations(Number(productId));

    return NextResponse.json(variations);
  } catch (error: any) {
    console.error("VARIATIONS API ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
