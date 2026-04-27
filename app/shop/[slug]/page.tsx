import { notFound } from "next/navigation";
import { getProduct } from "@/lib/woocommerce";
import { SingleProductView } from "../../../components/singleProductView/SingleProductView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || slug === "shop") {
    return notFound();
  }

  const product = await getProduct(slug);

  if (!product) {
    return notFound();
  }

  return <SingleProductView product={product} />;
}
