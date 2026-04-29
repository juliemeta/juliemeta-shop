"use client";

import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  TextField,
  Divider,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import placeholderImage from "../../public/assets/images/placeholder.png";
import { useCartStore } from "@/lib/store/cartStore";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { StyledContainer } from "@/styles/Container";
import { StyledLink } from "../navbar/Navbar.styles";

export function SingleProductView({ product }: any) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.src);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);

  const [variations, setVariations] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [sizeError, setSizeError] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const category = product.categories?.[0];

  // 📦 Sizes from variations
  const sizes = useMemo(
    () =>
      Array.from(
        new Set(
          variations.flatMap((v) =>
            v.attributes.map((attr: any) => attr.option),
          ),
        ),
      ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    [variations],
  );

  const allOutOfStock =
    product.type === "variable" &&
    variations.length > 0 &&
    variations.every((v) => v.stock_status !== "instock");

  // 🌐 Fetch variations
  useEffect(() => {
    if (product.type !== "variable") return;

    fetch(`/api/variations?productId=${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("VARIATIONS:", data);
        setVariations(data);
      })
      .catch(console.error);
  }, [product.id, product.type]);

  // 🎯 Match selected size → variation
  useEffect(() => {
    if (!selectedSize || variations.length === 0) return;

    const normalize = (str: string) =>
      str.toLowerCase().replace(/\s/g, "").replace("×", "x");

    const match = variations.find((v) =>
      v.attributes.some(
        (attr: any) => normalize(attr.option) === normalize(selectedSize),
      ),
    );

    setSelectedVariation(match || null);
  }, [selectedSize, variations]);

  // 🖼️ Change photo when choosing variation
  useEffect(() => {
    if (selectedVariation?.image?.src) {
      setSelectedImage(selectedVariation.image.src);
    } else {
      setSelectedImage(product.images?.[0]?.src);
    }
  }, [selectedVariation, product.images]);

  // ✅ 🔥 Stock logic
  const isInStock =
    product.type === "variable"
      ? selectedVariation
        ? selectedVariation.stock_status === "instock"
        : true //
      : product.stock_status === "instock";

  return (
    <StyledContainer>
      <Grid container spacing={4}>
        {/* LEFT: Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            <Image
              src={selectedImage || placeholderImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Thumbnails */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {product.images?.map((img: any) => (
              <Box
                key={img.id}
                onClick={() => setSelectedImage(img.src)}
                sx={{
                  width: 70,
                  height: 70,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="70px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* RIGHT: Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          {/* 💲 Price */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {selectedVariation?.price || product.price} kr.
          </Typography>
          {/* 🚫 Out of stock */}
          {product.type === "simple" && !isInStock && (
            <Typography color="error" sx={{ mt: 1 }}>
              Ikke på lager
            </Typography>
          )}
          {product.type === "variable" && allOutOfStock && (
            <Typography color="error" sx={{ mt: 1 }}>
              Produktet er udsolgt
            </Typography>
          )}
          {product.type === "variable" &&
            !allOutOfStock &&
            selectedVariation &&
            selectedVariation.stock_status !== "instock" && (
              <Typography color="error" sx={{ mt: 1 }}>
                Ikke på lager
              </Typography>
            )}
          {/* Product short description */}
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            {product.short_description?.replace(/<[^>]+>/g, "")}
          </Typography>
          {/* 📏 Size selector */}
          {sizes.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mt: 1 }} error={sizeError}>
                <InputLabel id="size-select-label">Størrelse</InputLabel>

                <Select
                  labelId="size-select-label"
                  value={selectedSize}
                  label="Størrelse"
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    setSizeError(false);
                  }}
                >
                  {sizes.map((size: string) => {
                    const isAvailable = variations.some(
                      (v) =>
                        v.attributes.some(
                          (attr: any) => attr.option === size,
                        ) && v.stock_status === "instock",
                    );

                    return (
                      <MenuItem
                        key={size}
                        value={size}
                        disabled={
                          product.type === "simple"
                            ? !isAvailable
                            : selectedVariation
                              ? !isAvailable
                              : false
                        }
                        sx={{ opacity: isAvailable ? 1 : 0.5 }}
                      >
                        {size} {!isAvailable ? "(Udsolgt)" : ""}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Error message */}
              {sizeError && (
                <Typography
                  sx={{
                    mt: 1,
                    p: 1.5,
                    backgroundColor: "#f8e7ea",
                    color: "#8a1c2c",
                    fontSize: 14,
                    borderRadius: 1,
                  }}
                >
                  Vælg mellem de tilgængelige størrelsesmuligheder
                </Typography>
              )}
            </Box>
          )}
          {/* Quantity */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <IconButton
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={!isInStock}
            >
              -
            </IconButton>

            <TextField
              value={qty}
              size="small"
              sx={{ width: 60, mx: 1 }}
              inputProps={{ style: { textAlign: "center" } }}
              disabled={!isInStock}
            />

            <IconButton onClick={() => setQty(qty + 1)} disabled={!isInStock}>
              +
            </IconButton>
          </Box>
          {/* 🛒 Add to cart */}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#c7a4d8",
              "&:hover": { backgroundColor: "#b38cc9" },
            }}
            fullWidth
            disabled={product.type === "simple" && !isInStock}
            onClick={() => {
              // ❌ Variant missing
              if (product.type === "variable" && !selectedVariation) {
                setSizeError(true);
                return;
              }

              // ❌ Chosen variant out of stock
              if (
                product.type === "variable" &&
                selectedVariation?.stock_status !== "instock"
              ) {
                return;
              }

              // ❌ Simple product out of stock
              if (product.type === "simple" && !isInStock) {
                return;
              }

              // ✅ Reset error
              setSizeError(false);

              addToCart({
                id: product.id,
                variation_id: selectedVariation?.id,
                name: product.name,
                price: selectedVariation?.price || product.price,
                image: product.images?.[0]?.src,
                quantity: qty,
                slug: product.slug,
                size: selectedSize,
              });
            }}
          >
            Tilføj til kurv
          </Button>
          {/* Category display */}
          <Divider sx={{ my: 3 }} />
          {product.categories?.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              Kategorier:{" "}
              {product.categories.map((cat: any, index: number) => (
                <span key={cat.id}>
                  <StyledLink href={`/shop/category/${cat.slug}`}>
                    {cat.name}
                  </StyledLink>
                  {index < product.categories.length - 1 && ", "}
                </span>
              ))}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mt: 5 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Beskrivelse" />
          <Tab label="Yderligere information" />
          <Tab label="Anmeldelser" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tab === 0 && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          )}

          {tab === 1 && (
            <Typography>
              (Insert here: Mapping of WooCommerce attributes)
            </Typography>
          )}

          {tab === 2 && <Typography>Ingen anmeldelser endnu</Typography>}
        </Box>
      </Box>
    </StyledContainer>
  );
}
