export const dynamic = "force-dynamic";

import ProductGrid from "@/components/productGrid/ProductGrid";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { StyledContainer } from "@/styles/Container";
import { Typography } from "@mui/material";

export default async function CategoryPage(props: any) {
  const params = await props.params;
  const { slug } = params;

  console.log("PARAM SLUG:", slug);

  const categories = await getCategories();

  const currentCategory = categories.find((c: any) => c.slug === slug);

  console.log("FOUND CATEGORY:", currentCategory);

  const products = await getProducts(currentCategory?.id);

  return (
    <StyledContainer>
      <Typography variant="h1">{currentCategory?.name || slug}</Typography>

      <ProductGrid products={products} />
    </StyledContainer>
  );
}
