"use client";

import Typography from "@mui/material/Typography";
import ProductGrid from "../productGrid/ProductGrid";
import { StyledContainer } from "@/styles/Container";

export default function ProductsView({ products }: any) {
  return (
    <StyledContainer>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>

      <ProductGrid products={products} />
    </StyledContainer>
  );
}
