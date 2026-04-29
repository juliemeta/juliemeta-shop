"use client";

import CategoryCard from "../categoryCard/CategoryCard";
import { CategoryGridContainer } from "./CategoryGrid.styles";

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
};

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <CategoryGridContainer>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </CategoryGridContainer>
  );
}
