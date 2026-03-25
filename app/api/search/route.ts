import { getAllProductsCached, getCategories } from "@/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    return Response.json({ products: [], categories: [] });
  }

  if (query === "all") {
    const products = await getAllProductsCached();

    return Response.json({
      products,
      categories: [],
    });
  }

  try {
    const allProducts = await getAllProductsCached();

    const products = allProducts.filter((p: any) =>
      p.name.toLowerCase().includes(query),
    );

    // categories
    const categories = await getCategories();

    const filteredCategories = categories.filter((cat: any) =>
      cat.name.toLowerCase().includes(query),
    );

    return Response.json({
      products: products.slice(0, 5),
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
