import { Box, List, ListItem, Typography } from "@mui/material";
import { StyledContainer } from "@/styles/StyledContainer";
import { StyledTextWrapper } from "@/styles/StyledTextWrapper";
import Link from "next/link";
import { DynamicBreadcrumbs } from "@/components/breadcrumbs/dynamicBreadcrumbs";
import { Metadata } from "next";

// 🎯 SEO
const pageTitle = "Cookies og persondata";

const pageDescription =
  "Læs hvordan Eudaimeta behandler cookies og personoplysninger.";

export const metadata: Metadata = {
  title: `${pageTitle} | Eudaimeta`,
  description: pageDescription,
};

export default function CookiesOgPersondata() {
  return (
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
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Sidst opdateret maj 2026
        </Typography>

        <Typography sx={{ mb: 4 }}>
          Nedenfor kan du læse om, hvordan vi behandler cookies og
          personoplysninger på eudaimeta.dk.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {/* Cookies */}
          <Box>
            <Typography variant="h2">Cookies</Typography>

            <Typography>
              Vi anvender cookies på vores hjemmeside for at forbedre
              brugeroplevelsen, huske indstillinger og analysere trafik.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Nogle cookies anvendes først efter samtykke via vores
              cookiebanner. Du kan til enhver tid slette eller blokere cookies i
              din browser. Bemærk dog, at dele af hjemmesiden muligvis ikke vil
              fungere optimalt uden cookies.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Vi anvender blandt andet cookies fra følgende tjenester:
            </Typography>

            <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>Facebook Pixel</ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Google Analytics
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                Google Tag Manager
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>Google Ads</ListItem>

              <ListItem sx={{ display: "list-item" }}>Hotjar</ListItem>
            </List>
          </Box>

          {/* Persondata */}
          <Box>
            <Typography variant="h2">Personoplysninger</Typography>

            <Typography>
              Når du besøger vores hjemmeside, kan der indsamles oplysninger om
              dig og din brug af siden. Dette kan eksempelvis være IP-adresse,
              browsertype, geografisk placering samt navigation på hjemmesiden.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Hvis du foretager et køb eller kontakter os, kan vi desuden
              behandle oplysninger som navn, adresse, e-mail, telefonnummer og
              betalingsoplysninger.
            </Typography>
          </Box>

          {/* Formål */}
          <Box>
            <Typography variant="h2">
              Formål med behandling af oplysninger
            </Typography>

            <Typography>Oplysningerne anvendes blandt andet til at:</Typography>

            <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                forbedre brugeroplevelsen
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                gennemføre køb og betalinger
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                levere kundeservice
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                sende relevante beskeder og nyhedsbreve
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                analysere trafik og markedsføre til relevante målgrupper
              </ListItem>
            </List>
          </Box>

          {/* Sikkerhed */}
          <Box>
            <Typography variant="h2">Sikkerhed</Typography>

            <Typography>
              Vi passer godt på dine oplysninger og behandler dem fortroligt med
              passende sikkerhedsforanstaltninger.
            </Typography>
          </Box>

          {/* Opbevaring */}
          <Box>
            <Typography variant="h2">Opbevaring af oplysninger</Typography>

            <Typography>
              Personoplysninger opbevares kun så længe det er nødvendigt i
              henhold til gældende lovgivning og formålet med behandlingen.
            </Typography>
          </Box>

          {/* Tredjeparter */}
          <Box>
            <Typography variant="h2">Videregivelse af oplysninger</Typography>

            <Typography>
              Vi deler kun oplysninger med samarbejdspartnere og databehandlere,
              når det er nødvendigt for at drive webshoppen og levere vores
              services. Ved køb kan oplysninger desuden behandles af betalings-
              og fragtleverandører med henblik på at gennemføre din ordre.
            </Typography>
          </Box>

          {/* Rettigheder */}
          <Box>
            <Typography variant="h2">Dine rettigheder</Typography>

            <Typography>
              Du har ret til at få indsigt i de oplysninger, vi behandler om
              dig, samt få oplysninger rettet eller slettet.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Hvis du ønsker at kontakte os vedrørende persondata, kan du skrive
              til:
            </Typography>

            <Typography sx={{ mt: 1 }}>kontakt@eudaimeta.dk</Typography>
          </Box>

          {/* Udgiver */}
          <Box>
            <Typography variant="h3">Udgiver</Typography>

            <Typography>
              Eudaimeta
              <br />
              [Juridisk adresse / Flexum]
              <br />
              CVR: [CVR-nummer]
              <br /> <br />
              Hvis du ønsker indsigt i eller sletning af dine oplysninger, er du
              velkommen til at kontakte os via vores{" "}
              <Link href="/kontakt">kontaktformular</Link>.
            </Typography>
          </Box>
        </Box>
      </StyledTextWrapper>
    </StyledContainer>
  );
}
