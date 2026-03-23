import ProductsView from "@/components/productsView/ProductsView";
import { getProducts } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;

  const products = await getProducts(params.category);

  return <ProductsView products={products} />;
}
