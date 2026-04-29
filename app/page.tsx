import { Box, Typography } from "@mui/material";
import { StyledContainer } from "@/styles/Container";
import FrontPageHero from "@/components/frontPageHero/FrontPageHero";
import CategoryGrid from "@/components/categoryGrid/CategoryGrid";
import { getCategories, getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/productGrid/ProductGrid";
import Logo from "@/components/logo/Logo";

export default async function HomePage() {
  const categories = await getCategories();
  const frontpageCategorySlugs = [
    "hatte",
    "baeltetasker",
    "baby-barn",
    "home-living",
  ];

  const featuredCategories = categories
    .filter((cat: any) => frontpageCategorySlugs.includes(cat.slug))
    .sort(
      (a: any, b: any) =>
        frontpageCategorySlugs.indexOf(a.slug) -
        frontpageCategorySlugs.indexOf(b.slug),
    );

  const featuredProducts = await getProducts(
    undefined,
    undefined,
    undefined,
    undefined,
    1,
    true,
  );

  const newProducts = await getProducts(
    undefined,
    undefined,
    undefined,
    "newest",
    1,
    false,
    4,
  );

  return (
    <>
      <FrontPageHero />

      <StyledContainer>
        <CategoryGrid categories={featuredCategories} />

        <Box>
          <Typography variant="h2">Udvalgte produkter</Typography>
          <ProductGrid products={featuredProducts} />
        </Box>

        <Typography variant="h3">Nyheder</Typography>
        <ProductGrid products={newProducts} />

        <Typography variant="h4">Hello from Homepage</Typography>

        <Typography variant="h5">Hello from Homepage</Typography>

        <Typography variant="h6">Hello from Homepage</Typography>

        <Typography variant="body1">Discover our products</Typography>
        <Typography variant="body2">Discover our products</Typography>

        <Box textAlign="center" sx={{ bgcolor: "background.section" }}>
          <Logo />
          <Typography variant="h1">Design med mening</Typography>
        </Box>
      </StyledContainer>
    </>
  );
}
