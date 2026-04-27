import { getProducts } from "@/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const tag = searchParams.get("tag") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = Number(searchParams.get("page") || 1);

  const products = await getProducts(undefined, undefined, tag, sort, page);

  return Response.json(products);
}
