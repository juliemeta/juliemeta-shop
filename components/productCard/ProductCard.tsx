"use client";

import Typography from "@mui/material/Typography";
import Link from "next/link";
import Placeholder from "../../public/assets/images/placeholder.png";
import {
  BaseImage,
  HoverImage,
  ImageWrapper,
  StyledCard,
  StyledCardContent,
} from "./ProductCard.styles";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { src: string }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images[0]?.src || Placeholder.src;
  const secondImage = product.images[1]?.src;

  return (
    <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
      <StyledCard>
        <ImageWrapper>
          <BaseImage src={firstImage} alt={product.name} />

          {secondImage && (
            <HoverImage
              src={secondImage}
              alt={product.name}
              className="hoverImage"
            />
          )}
        </ImageWrapper>

        <StyledCardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography color="text.secondary">
            {Number(product.price).toLocaleString("da-DK")} kr.
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
}
