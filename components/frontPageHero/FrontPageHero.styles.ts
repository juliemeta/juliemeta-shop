import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/assets/images/baeltetaske-galaxy.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "#f2f0ec59",
    zIndex: 0,
  },
}));

export const HeroWrapper = styled(Box)({
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
});

export const HeroContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 5),
  maxWidth: 600,
  position: "relative",
  textAlign: "center",
}));
