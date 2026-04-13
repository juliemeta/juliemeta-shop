import { Button, Grid, styled } from "@mui/material";

export const CartSummaryWrapper = styled(Grid)(({ theme }) => ({
  position: "sticky",
  top: 100,
  padding: theme.spacing(2, 3),
  border: "1px solid #eee",
  borderRadius: 4,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}));

export const CartCheckoutButton = styled(Button)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(2, 0, 0),
  padding: theme.spacing(2),
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
}));
