import ProductsView from "@/components/productsView/ProductsView";
import { getProducts } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: any) {
  const { sort = "" } = await searchParams;

  const products = await getProducts(undefined, undefined, undefined, sort);

  console.log("SHOP SORT:", sort);

  return <ProductsView products={products} />;
}
