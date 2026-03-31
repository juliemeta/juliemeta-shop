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

function highlight(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} style={{ fontWeight: 600 }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  const parentCategories = categories.filter((cat) => cat.parent === 0);

  const getChildren = (parentId: number) =>
    categories.filter((cat) => cat.parent === parentId);

  return (
    <MegaMenuWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLinkTypography>Shop</NavLinkTypography>

      {open && (
        <MegaMenuDropdown>
          {parentCategories.map((parent) => (
            <MegaMenuColumn key={parent.id}>
              {/* PARENT CATEGORY */}
              <StyledLink href={`/shop/category/${parent.slug}`}>
                <NavLinkTypography variant="subtitle2">
                  {parent.name}
                </NavLinkTypography>
              </StyledLink>

              {/* CHILD CATEGORIES */}
              {getChildren(parent.id).map((child) => (
                <StyledLink
                  key={child.id}
                  href={`/shop/category/${child.slug}`}
                >
                  {child.name}
                </StyledLink>
              ))}
            </MegaMenuColumn>
          ))}

          <MegaMenuRow>
            <StyledLink href="/shop">Se alt! 💥</StyledLink>
          </MegaMenuRow>
        </MegaMenuDropdown>
      )}
    </MegaMenuWrapper>
  );
}
