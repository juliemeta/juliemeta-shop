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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ categories }: any) {
  const cartCount = 2;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openResults, setOpenResults] = useState(false);

  const router = useRouter();

  // AJAX search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!search.trim()) {
        setResults([]);
        setOpenResults(false);
        return;
      }

      try {
        const res = await fetch(`/api/search?q=${search}`);
        const data = await res.json();

        console.log("DATA:", data);

        const combined = [
          ...(data.products || []).map((p: any) => ({
            ...p,
            type: "product",
          })),
          ...(data.categories || []).map((c: any) => ({
            ...c,
            type: "category",
          })),
        ];

        setResults(combined);
        setOpenResults(true);
      } catch (err) {
        console.error("SEARCH ERROR:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/products?search=${search}`);
    setOpenResults(false);
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* LEFT */}
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

        {/* CENTER */}
        <CenterSection>
          <div style={{ position: "relative" }}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Søg produkter..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenResults(true);
                }}
                onBlur={() => setTimeout(() => setOpenResults(false), 200)}
                onFocus={() => setOpenResults(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                  width: "250px",
                }}
              />
            </form>

            {/* DROPDOWN */}
            {openResults && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  zIndex: 1000,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {results.length === 0 && (
                  <div style={{ padding: "8px 12px", color: "#999" }}>
                    Søger...
                  </div>
                )}

                {results.map((item: any) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.type === "product" ? (
                      <StyledLink href={`/product/${item.slug}`}>
                        {item.name}
                      </StyledLink>
                    ) : (
                      <StyledLink href={`/products/${item.slug}`}>
                        {item.name}
                      </StyledLink>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
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
