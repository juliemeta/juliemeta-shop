import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";

export const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.subtle,
}));

export const HeroWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 5),
}));
