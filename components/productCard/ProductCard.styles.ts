import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "none",

  "&:hover .hoverImage": {
    opacity: 1,
  },
}));

export const ImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  overflow: "hidden",
});

export const BaseImage = styled("img")({
  maxWidth: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const HoverImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0,
  transition: "opacity 0.1s ease",
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));
