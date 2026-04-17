"use client";

import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import UndoSnackbars from "@/components/cart/UndoSnackbars";
import {
  CartContent,
  CartPageContainer,
  CartWrapper,
  SelectQuantityButton,
  SelectQuantityWrapper,
} from "./page.styles";
import { Box, Grid, Typography } from "@mui/material";

export default function CartPage() {
  const { items, updateQty, removeFromCart } = useCartStore();

  return (
    <CartPageContainer container>
      {/* 🛒 LEFT: CART ITEMS */}
      <CartWrapper size={{ xs: 12, md: 8 }}>
        <Typography variant="h1">Min indkøbskurv</Typography>

        {items.length === 0 && <p>Din kurv er tom</p>}

        {items.map((item) => (
          <CartContent key={`${item.id}-${item.variation_id ?? "simple"}`}>
            {item.image && (
              <Link href={`/shop/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ borderRadius: 4 }}
                />
              </Link>
            )}

            <Box style={{ flex: 1 }}>
              <Link href={`/shop/${item.slug}`}>{item.name}</Link>

              <Typography>{item.price} kr.</Typography>

              {item.size && (
                <Typography style={{ fontSize: 14, opacity: 0.7 }}>
                  Størrelse: {item.size}
                </Typography>
              )}
              {/* Update quantity */}
              <SelectQuantityWrapper>
                <SelectQuantityButton
                  onClick={() => {
                    if (item.quantity === 1) {
                      removeFromCart(item.id, item.variation_id);
                    } else {
                      updateQty(item.id, item.quantity - 1, item.variation_id);
                    }
                  }}
                >
                  -
                </SelectQuantityButton>

                <Box>{item.quantity}</Box>

                <SelectQuantityButton
                  onClick={() =>
                    updateQty(item.id, item.quantity + 1, item.variation_id)
                  }
                >
                  +
                </SelectQuantityButton>
              </SelectQuantityWrapper>
            </Box>
          </CartContent>
        ))}
      </CartWrapper>

      {/* 💳 RIGHT: SUMMARY */}
      <Grid size={{ xs: 12, md: 4 }}>
        <CartSummary />
      </Grid>

      {/* 👇 SNACKBARS */}
      <UndoSnackbars />
    </CartPageContainer>
  );
}
