"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { CartCheckoutButton, CartSummaryWrapper } from "./CartSummary.styles";
import { formatPrice } from "@/lib/utils/format";
import { Typography } from "@mui/material";

export default function CartSummary() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <CartSummaryWrapper>
      <h3>
        Du har {itemCount} {itemCount === 1 ? "vare" : "varer"} i kurven
      </h3>
      <Typography>
        I alt (ekskl. levering) <strong>{formatPrice(total)}</strong>
      </Typography>
      {items.length > 0 && (
        <CartCheckoutButton
          onClick={handleCheckout}
          variant="contained"
          color="success"
        >
          BETALING
        </CartCheckoutButton>
      )}
    </CartSummaryWrapper>
  );
}
