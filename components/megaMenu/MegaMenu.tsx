"use client";

import { useState } from "react";
import {
  MegaMenuWrapper,
  MegaMenuDropdown,
  MegaMenuRow,
  MegaMenuColumn,
  MobileMenuContainer,
  MobileMenuAccordionDetails,
  MobileMenuAccordion,
} from "./MegaMenu.styles";

import { NavLinkTypography, StyledLink } from "../navbar/Navbar.styles";

import {
  Drawer,
  IconButton,
  AccordionSummary,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};

export default function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const parentCategories = categories.filter((cat) => cat.parent === 0);

  const getChildren = (parentId: number) =>
    categories.filter((cat) => cat.parent === parentId);

  /* ---------------- MOBILE ---------------- */

  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          <MobileMenuContainer>
            {parentCategories.map((parent) => (
              <MobileMenuAccordion key={parent.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{parent.name}</Typography>
                </AccordionSummary>

                <MobileMenuAccordionDetails>
                  {getChildren(parent.id).map((child) => (
                    <StyledLink
                      key={child.id}
                      href={`/shop/category/${child.slug}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Typography sx={{ py: 0.5 }}>{child.name}</Typography>
                    </StyledLink>
                  ))}
                  <StyledLink
                    href={`/shop/category/${parent.slug}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Typography fontWeight={600}>
                      Se alt i {parent.name}
                    </Typography>
                  </StyledLink>
                </MobileMenuAccordionDetails>
              </MobileMenuAccordion>
            ))}

            <Box sx={{ mt: 2 }}>
              <StyledLink href="/shop" onClick={() => setMobileOpen(false)}>
                <Typography fontWeight={600}>👉 Se de nyeste varer</Typography>
              </StyledLink>
            </Box>
          </MobileMenuContainer>
        </Drawer>
      </>
    );
  }

  /* ---------------- DESKTOP ---------------- */

  return (
    <MegaMenuWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLinkTypography>
        <MenuIcon />
      </NavLinkTypography>

      {open && (
        <MegaMenuDropdown>
          {parentCategories.map((parent) => (
            <MegaMenuColumn key={parent.id}>
              <StyledLink href={`/shop/category/${parent.slug}`}>
                <NavLinkTypography variant="subtitle2">
                  <strong>{parent.name}</strong>
                </NavLinkTypography>
              </StyledLink>

              {getChildren(parent.id).map((child) => (
                <StyledLink
                  key={child.id}
                  href={`/shop/category/${child.slug}`}
                >
                  {child.name}
                </StyledLink>
              ))}
            </MegaMenuColumn>
          ))}

          <MegaMenuRow>
            <StyledLink href="/shop">👉 Se de nyeste varer</StyledLink>
          </MegaMenuRow>
        </MegaMenuDropdown>
      )}
    </MegaMenuWrapper>
  );
}
