"use client";

import { useState } from "react";
import {
  MegaMenuWrapper,
  MegaMenuDropdown,
  MegaMenuRow,
  MegaMenuColumn,
} from "./MegaMenu.styles";
import { NavLinkTypography } from "../navbar/Navbar.styles";
import { StyledLink } from "../navbar/Navbar.styles";

type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};

export default function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  const topCategories = categories.filter((cat) => cat.parent === 0);

  return (
    <MegaMenuWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLinkTypography>Shop</NavLinkTypography>

      {open && (
        <MegaMenuDropdown>
          <MegaMenuColumn>
            <NavLinkTypography variant="subtitle2">
              Categories
            </NavLinkTypography>

            {topCategories.map((cat) => (
              <StyledLink key={cat.id} href={`/products?category=${cat.id}`}>
                {cat.name}
              </StyledLink>
            ))}
          </MegaMenuColumn>

          <MegaMenuRow>
            <StyledLink href="/products">Se alt! 💥</StyledLink>
          </MegaMenuRow>
        </MegaMenuDropdown>
      )}
    </MegaMenuWrapper>
  );
}
