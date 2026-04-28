import { Typography } from "@mui/material";
import { StyledContainer } from "@/styles/Container";
import FrontPageHero from "@/components/frontPageHero/FrontPageHero";
import CategoryGrid from "@/components/categoryGrid/CategoryGrid";
import { getCategories } from "@/lib/woocommerce";

export default async function HomePage() {
  const categories = await getCategories();

  const featuredCategories = categories
    .filter((cat: any) => cat.menu_order !== 0)
    .sort((a: any, b: any) => a.menu_order - b.menu_order);

  return (
    <>
      <FrontPageHero />

      <StyledContainer>
        <Typography variant="h1">Hello from Homepage</Typography>
        <CategoryGrid categories={featuredCategories} />
        <Typography variant="h2">Hello from Homepage</Typography>
        <Typography variant="h3">Hello from Homepage</Typography>
        <Typography variant="h4">Hello from Homepage</Typography>
        <Typography variant="h5">Hello from Homepage</Typography>
        <Typography variant="h6">Hello from Homepage</Typography>
        <Typography variant="body1">Discover our products</Typography>
        <Typography variant="body2">Discover our products</Typography>
      </StyledContainer>
    </>
  );
}
