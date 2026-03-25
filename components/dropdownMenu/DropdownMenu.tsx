"use client";

import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLinkTypography } from "../navbar/Navbar.styles";
import Link from "next/link";

export default function DropdownMenu({ label, items }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* Trigger */}
      <NavLinkTypography onMouseEnter={handleOpen}>{label}</NavLinkTypography>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
      >
        {items.map((item: any) => (
          <MenuItem
            key={item.href}
            component={Link as any}
            href={item.href}
            onClick={handleClose}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
