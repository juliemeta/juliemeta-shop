import BannerSection from "@/components/banner/BannerSection";
import { StyledContainer } from "@/styles/StyledContainer";
import { StyledTextWrapper } from "@/styles/StyledTextWrapper";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Metadata } from "next";
import { DynamicBreadcrumbs } from "@/components/breadcrumbs/dynamicBreadcrumbs";

// 🎯 SEO
const pageTitle = "Om os";

const pageDescription =
  "Vi producerer ikke varer på forhånd. Det betyder, at vi undgår overproduktion og unødvendigt spild. På den måde er hvert produkt skabt specifikt til dig - mindre forbrug, mere omtanke. 💚";

export const metadata: Metadata = {
  title: `${pageTitle} | Eudaimeta`,
  description: pageDescription,
};

export default function about() {
  return (
    <>
      <BannerSection
        title="Mindre forbrug, mere omtanke"
        image="/assets/images/eudaimeta-logo.png"
        overlay="#f2f0ecf5"
      />
      <StyledContainer>
        <StyledTextWrapper>
          <DynamicBreadcrumbs
            items={[
              { label: "Forside", href: "/" },
              {
                label: pageTitle,
              },
            ]}
          />
          <Typography variant="h1">{pageTitle}</Typography>
          <Typography>
            Eudaimeta er skabt ud fra et ønske om at gøre op med overforbrug
            uden at gå på kompromis med æstetik og kreativitet. Inspirationen
            kommer fra zero waste-tankegangen, hvor målet er at minimere affald
            og unødvendigt forbrug i hverdagen. Især plastic og engangsprodukter
            fylder alt for meget i vores liv, og det ønsker vi at udfordre. Der
            findes allerede mange gode bæredygtige alternativer og
            genanvendelige hverdagsprodukter, som for eksempel shampoo-bars. Med
            denne webshop går vi i en lidt anden retning, for vores mål er ikke
            at erstatte produkter - vi gentænker måden de bliver produceret på.
          </Typography>
          <br />
          <Typography variant="h2">Kreativitet møder bæredygtighed</Typography>
          <Typography>
            Kernen i Eudaimeta er kærligheden til design og skabelsesprocessen.
            Da vi opdagede konceptet Print On Demand (POD), faldt brikkerne på
            plads. Her blev det muligt at kombinere kreativ frihed med en mere
            ansvarlig produktionsform. I stedet for masseproduktion skaber vi
            produkter med omtanke - designet med passion og produceret med
            formål.
          </Typography>
          <br />
          <Typography variant="h3">Produktion efter behov</Typography>
          <Typography>
            Vi producerer ikke varer på forhånd. Det betyder, at vi undgår
            overproduktion og unødvendigt spild. Når du køber en t-shirt hos os,
            ligger selve t-shirten klar, men designet bliver først trykt, når
            din ordre er lagt. Det samme gælder for alle vores produkter fra
            krus og tasker til babytøj og bikinier. På den måde er hvert produkt
            skabt specifikt til dig. Vi er ikke perfekte, og vi er ikke en zero
            waste-virksomhed. Men vi arbejder hver dag på at tage bedre valg og
            skabe en mere ansvarlig måde at producere og forbruge på.
          </Typography>
          <br />
          <Typography variant="h4">
            Vil du vide mere om vores print on demand-koncept?
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/print-on-demand" style={{ textDecoration: "none" }}>
              👉 Læs mere her.
            </Link>
          </Box>
        </StyledTextWrapper>
      </StyledContainer>
    </>
  );
}
