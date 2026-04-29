export const dynamic = "force-dynamic";

import { getProducts, getTags } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";
import InfiniteProductGrid from "@/components/productGrid/InfiniteProductGrid";

export default async function TagPage({ params }: any) {
  const { slug } = await params;

  const tags = await getTags();
  const currentTag = tags.find((t: any) => t.slug === slug);

  const products = await getProducts(undefined, undefined, currentTag?.id);

  return (
    <StyledContainer>
      <Typography variant="h3">Fokus på</Typography>
      <Typography variant="h1">{currentTag?.name || slug}</Typography>

      <InfiniteProductGrid initialProducts={products} tagId={currentTag?.id} />
    </StyledContainer>
  );
}
