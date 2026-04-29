import Navbar from "@/components/navbar/NavbarWrapper";
import { Playfair_Display, Inter } from "next/font/google";
import { Box } from "@mui/material";
import { getCategories } from "@/lib/woocommerce";
import ThemeRegistry from "./themeRegistry";
import Footer from "@/components/footer/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="da">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeRegistry>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar categories={categories} />

            <Box sx={{ flex: 1 }}>{children}</Box>

            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
