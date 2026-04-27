"use client";

import Typography from "@mui/material/Typography";
import { StyledContainer } from "@/styles/Container";
import InfiniteProductGrid from "../productGrid/InfiniteProductGrid";

export default function ProductsView({ products }: any) {
  return (
    <StyledContainer>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shop
      </Typography>

      <InfiniteProductGrid initialProducts={products} />
    </StyledContainer>
  );
}
