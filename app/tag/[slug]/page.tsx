import ProductGrid from "@/components/productGrid/ProductGrid";
import { getProducts, getTags } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";

export default async function TagPage({ params }: any) {
  const { slug } = await params;
  const tags = await getTags();
  const currentTag = tags.find((t: any) => t.slug === slug);

  const products = await getProducts(undefined, undefined, slug);

  return (
    <StyledContainer>
      <Typography variant="h3">Fokus på</Typography>
      <Typography variant="h1">{currentTag?.name || slug}</Typography>

      <ProductGrid products={products} />
    </StyledContainer>
  );
}
