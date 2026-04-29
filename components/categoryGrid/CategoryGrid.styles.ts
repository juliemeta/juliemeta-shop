import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const CategoryGridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: theme.spacing(3),
}));
