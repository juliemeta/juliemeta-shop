"use client";

import ProductCard from "../productCard/ProductCard";
import { ProductGridContainer } from "./ProductGrid.styles";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { src: string }[];
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ProductGridContainer>
      {Array.isArray(products) &&
        products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
    </ProductGridContainer>
  );
}
