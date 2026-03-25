import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const MegaMenuWrapper = styled(Box)({
  position: "relative",
});

export const MegaMenuDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "600px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(4),
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(3),
  zIndex: 10,
}));

export const MegaMenuRow = styled(Box)(({ theme }) => ({
  gridColumn: "1 / -1", // spans through all colums
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

export const MegaMenuColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
