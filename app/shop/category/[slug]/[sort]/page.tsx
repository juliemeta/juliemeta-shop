export const dynamic = "force-dynamic";

import { getProducts, getCategories } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";
import InfiniteProductGrid from "@/components/productGrid/InfiniteProductGrid";

export default async function CategoryPage(props: any) {
  const params = await props.params;

  const { slug, sort } = params;

  console.log("PARAM SLUG:", slug);
  console.log("SORT:", sort);

  const categories = await getCategories();
  const currentCategory = categories.find((c: any) => c.slug === slug);

  console.log("CATEGORY ID:", currentCategory?.id);

  const products = await getProducts(
    currentCategory?.id,
    undefined,
    undefined,
    sort,
  );

  return (
    <StyledContainer>
      <Typography variant="h1">{currentCategory?.name || slug}</Typography>

      <InfiniteProductGrid
        initialProducts={products}
        tagId={currentCategory?.id || null}
        sort={sort || ""}
      />
    </StyledContainer>
  );
}
