export const dynamic = "force-dynamic";

import InfiniteProductGrid from "@/components/productGrid/InfiniteProductGrid";
import { getProducts, getTags } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";

export default async function TagPage({ params }: any) {
  const { slug, sort } = await params;

  console.log("CATEGORY SORT:", sort);

  const tags = await getTags();
  const currentTag = tags.find((t: any) => t.slug === slug);

  const products = await getProducts(
    undefined,
    undefined,
    currentTag?.id,
    sort,
  );

  return (
    <StyledContainer>
      <Typography variant="h3">Fokus på</Typography>
      <Typography variant="h1">{currentTag?.name || slug}</Typography>

      <InfiniteProductGrid
        initialProducts={products}
        tagId={currentTag?.id}
        sort={sort}
      />
    </StyledContainer>
  );
}
