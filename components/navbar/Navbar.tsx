"use client";

import Link from "next/link";
import Logo from "../../public/assets/images/juliemeta-round-logo.png";
import {
  StyledAppBar,
  StyledToolbar,
  NavLinks,
  StyledLink,
  NavLinkTypography,
  CenterSection,
  LeftSection,
  RightSection,
  CartButton,
  CartBadge,
} from "./Navbar.styles";
import Image from "next/image";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MegaMenu from "../megaMenu/MegaMenu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ categories }: any) {
  const cartCount = 2; // placeholder (state coming soon)

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/products?search=${search}`);
  };
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* LEFT (brand + nav) */}
        <LeftSection>
          <StyledLink href="/">
            <Image src={Logo} alt="logo" width={40} height={40} />
          </StyledLink>

          <NavLinks>
            <MegaMenu categories={categories} />

            <StyledLink href="/about">
              <NavLinkTypography>Om os</NavLinkTypography>
            </StyledLink>
          </NavLinks>
        </LeftSection>

        {/* CENTER (search) */}
        <CenterSection>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Søg produkter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </form>
        </CenterSection>

        {/* RIGHT */}
        <RightSection>
          <Link href="/cart">
            <CartButton>
              <CartBadge badgeContent={cartCount} showZero={false}>
                <ShoppingBagIcon />
              </CartBadge>
            </CartButton>
          </Link>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}
