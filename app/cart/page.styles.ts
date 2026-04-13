import { styled } from "@mui/material/styles";
import { Box, Button, Grid } from "@mui/material";

export const CartPageContainer = styled(Grid)({
  alignItems: "start",
});

export const CartWrapper = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(5),
}));

export const CartContent = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderBottom: "1px solid #eee",
  paddingBottom: theme.spacing(2),
}));

export const SelectQuantityWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const SelectQuantityButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: 4,
  border: "1px solid #ccc",
  background: theme.palette.background.elevated,
  cursor: "pointer",
}));
