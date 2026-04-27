import ProductsView from "@/components/productsView/ProductsView";
import { getProducts } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();
  console.log("SHOP PRODUCTS:", products);

  return <ProductsView products={products} />;
}
