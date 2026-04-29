export const dynamic = "force-dynamic";

import InfiniteProductGrid from "@/components/productGrid/InfiniteProductGrid";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";

export default async function CategoryPage(props: any) {
  const params = await props.params;
  const { slug } = params;

  const categories = await getCategories();

  const currentCategory = categories.find((c: any) => c.slug === slug);

  const products = await getProducts(currentCategory?.id);

  return (
    <StyledContainer>
      <Typography variant="h1">{currentCategory?.name || slug}</Typography>

      <InfiniteProductGrid
        initialProducts={products}
        tagId={currentCategory?.id || null}
      />
    </StyledContainer>
  );
}
