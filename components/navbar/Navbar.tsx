"use client";

import Link from "next/link";
import Logo from "../../public/assets/images/eudaimeta-logo.png";
import {
  StyledAppBar,
  StyledToolbar,
  NavLinks,
  StyledLink,
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
import Fuse from "fuse.js";
import { useCartStore } from "@/lib/store/cartStore";

// highlight helper
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

export default function Navbar({ categories }: any) {
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openResults, setOpenResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cache, setCache] = useState<Record<string, any[]>>({});
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const handleSelect = () => {
    setOpenResults(false);
    setSearch("");
    setActiveIndex(-1);
  };

  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/search?q=all");
      const data = await res.json();

      setAllProducts(data.products || []);
    }

    loadProducts();
  }, []);

  // AJAX search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        setResults([]);
        setOpenResults(false);
        return;
      }

      if (!allProducts.length) return;

      const query = search.toLowerCase();

      // 1. exact matches
      const exactMatches = allProducts.filter((p: any) =>
        p.name.toLowerCase().includes(query),
      );

      // 2. fuzzy matches
      const fuse = new Fuse(allProducts, {
        keys: ["name"],
        threshold: 0.4,
      });

      const fuzzyMatches = fuse.search(search).map((r) => r.item);

      let combinedProducts = exactMatches;

      // ONLY use fuzzy if no exact match
      if (combinedProducts.length === 0) {
        combinedProducts = fuzzyMatches;
      }

      const formattedProducts = combinedProducts.map((p) => ({
        ...p,
        type: "product",
      }));

      // categories
      const filteredCategories = categories
        .filter((cat: any) => cat.name.toLowerCase().includes(query))
        .map((c: any) => ({
          ...c,
          type: "category",
        }));

      const topProducts = formattedProducts.slice(0, 5);
      const topCategories = filteredCategories.slice(0, 2);

      const combined = [...topProducts, ...topCategories];

      setResults(combined);
      setActiveIndex(-1);
      setOpenResults(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [search, allProducts, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/products?search=${search}`);
    handleSelect();
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* LEFT */}
        <LeftSection>
          <StyledLink href="/">
            <Image src={Logo} alt="logo" height={40} />
          </StyledLink>
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
                onKeyDown={(e) => {
                  if (!openResults) return;

                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((prev) =>
                      prev < results.length - 1 ? prev + 1 : prev,
                    );
                  }

                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
                  }

                  if (e.key === "Enter") {
                    if (activeIndex >= 0) {
                      const item = results[activeIndex];

                      const url =
                        item.type === "product"
                          ? `/shop/${item.slug}`
                          : `/shop/category/${item.slug}`;

                      router.push(url);
                      handleSelect();
                    }
                  }
                }}
                onBlur={() => setTimeout(() => setOpenResults(false), 200)}
                onFocus={() => setOpenResults(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                  width: "100%",
                  maxWidth: "250px",
                }}
              />
            </form>

            {/* SEARCH DROPDOWN */}
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

                {results.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={handleSelect}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderBottom: "1px solid #eee",
                      background: index === activeIndex ? "#f5f5f5" : "white",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {item.type === "product" ? (
                      <StyledLink
                        href={`/shop/${item.slug}`}
                        onClick={handleSelect}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                        }}
                      >
                        {item.images?.[0]?.src && (
                          <img
                            src={item.images[0].src}
                            alt={item.name}
                            width={40}
                            height={40}
                            style={{
                              borderRadius: "6px",
                              objectFit: "cover",
                            }}
                          />
                        )}

                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem" }}>
                            {highlight(item.name, search)}
                          </div>

                          <div style={{ fontSize: "0.8rem", color: "#666" }}>
                            {item.price} kr.
                          </div>
                        </div>
                      </StyledLink>
                    ) : (
                      <StyledLink
                        href={`/shop/category/${item.slug}`}
                        onClick={handleSelect}
                      >
                        Vis kategori: "{highlight(item.name, search)}"
                      </StyledLink>
                    )}
                  </div>
                ))}

                {results.length > 0 && (
                  <div
                    style={{
                      padding: "10px 12px",
                      borderTop: "1px solid #eee",
                      fontWeight: 500,
                    }}
                  >
                    <StyledLink
                      href={`/products?search=${search}`}
                      onClick={handleSelect}
                    >
                      Se alle søgeresultater →
                    </StyledLink>
                  </div>
                )}
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
          <NavLinks>
            <MegaMenu categories={categories} />
          </NavLinks>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}
