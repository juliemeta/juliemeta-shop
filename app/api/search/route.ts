import { getProducts, getCategories } from "@/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ products: [], categories: [] });
  }

  try {
    // 🔍 produkter
    const products = await getProducts(undefined, query);

    // 🏷️ kategorier
    const categories = await getCategories();

    const filteredCategories = categories.filter((cat: any) =>
      cat.name.toLowerCase().includes(query.toLowerCase()),
    );

    return Response.json({
      products: products?.slice(0, 5) || [],
      categories: filteredCategories.slice(0, 3),
    });
  } catch (error) {
    console.error("SEARCH ERROR:", error);

    return Response.json({
      products: [],
      categories: [],
    });
  }
}
