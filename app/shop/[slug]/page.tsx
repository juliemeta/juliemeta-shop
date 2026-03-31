import { getProduct } from "@/lib/woocommerce";
import { SingleProductView } from "../../../components/singleProductView/SingleProductView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return <div>Produkt ikke fundet</div>;
  }

  return <SingleProductView product={product} />;
}
