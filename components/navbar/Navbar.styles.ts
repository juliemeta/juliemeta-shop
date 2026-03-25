import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Typography } from "@mui/material";
import Link from "next/link";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.navbar,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& Link": {
    textDecoration: "none",
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  padding: theme.spacing(1, 2),
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export const CenterSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const RightSection = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "inline-block",
});

export const NavLinkTypography = styled(Typography)({
  transition: "opacity 0.1s ease",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.7,
    textDecoration: "none",
  },
});

export const CartButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const CartBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: "0.7rem",
  },
}));
