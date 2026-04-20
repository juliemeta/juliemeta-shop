import ProductsView from "@/components/productsView/ProductsView";
import { getProducts } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();

  return <ProductsView products={products} />;
}
