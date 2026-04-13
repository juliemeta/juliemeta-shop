export const formatPrice = (price: number, currency = "DKK") =>
  new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency,
  }).format(price);
