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
import { useState } from "react";
import Image from "next/image";
import placeholderImage from "../../public/assets/images/placeholder.png";
import { useCartStore } from "@/lib/store/cartStore";

export function SingleProductView({ product }: any) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.src);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Grid container spacing={4}>
        {/* LEFT: Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            <Image
              src={selectedImage || placeholderImage}
              alt={product.name}
              fill
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

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {product.price} kr.
          </Typography>

          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            {product.short_description?.replace(/<[^>]+>/g, "")}
          </Typography>

          {/* Quantity */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <IconButton onClick={() => setQty(Math.max(1, qty - 1))}>
              -
            </IconButton>

            <TextField
              value={qty}
              size="small"
              sx={{ width: 60, mx: 1 }}
              inputProps={{ style: { textAlign: "center" } }}
            />

            <IconButton onClick={() => setQty(qty + 1)}>+</IconButton>
          </Box>

          {/* Add to cart */}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#c7a4d8",
              "&:hover": { backgroundColor: "#b38cc9" },
            }}
            fullWidth
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.src,
                quantity: qty,
                slug: product.slug,
              })
            }
          >
            Tilføj til kurv
          </Button>

          {/* Payment (placeholder) */}
          <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
            Pay with GPay
          </Button>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary">
            Kategori: {product.categories?.[0]?.name}
          </Typography>
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
    </Box>
  );
}
