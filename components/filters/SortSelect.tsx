"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select, MenuItem } from "@mui/material";

export default function SortSelect() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const validSorts = new Set(["newest", "price-asc", "price-desc"]);

  const lastSegment = segments[segments.length - 1];

  const currentSort = validSorts.has(lastSegment) ? lastSegment : "";

  const basePath = currentSort
    ? "/" + segments.slice(0, -1).join("/")
    : "/" + segments.join("/");

  const labels: Record<string, string> = {
    newest: "Nyeste",
    "price-asc": "Pris: Lav → Høj",
    "price-desc": "Pris: Høj → Lav",
  };

  const router = useRouter();

  const handleChange = (value: string) => {
    // 🔥 SPECIAL CASE: /shop
    if (basePath === "/shop") {
      if (value) {
        router.push(`/shop?sort=${value}`);
      } else {
        router.push("/shop");
      }
      return;
    }
    if (value) {
      window.location.assign(`${basePath}/${value}`);
    } else {
      window.location.assign(basePath);
    }
  };

  return (
    <Select
      value={currentSort}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) return "Sortér";
        return labels[selected] || selected;
      }}
      onChange={(e) => handleChange(e.target.value)}
      size="small"
      sx={{ mb: 2 }}
    >
      <MenuItem value="">Standard</MenuItem>
      <MenuItem value="newest">Nyeste</MenuItem>
      <MenuItem value="price-asc">Pris: Lav → Høj</MenuItem>
      <MenuItem value="price-desc">Pris: Høj → Lav</MenuItem>
    </Select>
  );
}
