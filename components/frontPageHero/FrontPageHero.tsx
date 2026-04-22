import { Typography, Button } from "@mui/material";
import {
  HeroContainer,
  HeroContent,
  HeroWrapper,
} from "./FrontPageHero.styles";

export default function FrontPageHero() {
  return (
    <>
      <HeroContainer>
        <HeroWrapper>
          <HeroContent>
            <Typography variant="h1">Festivalsæson</Typography>
            <Button variant="contained">Se mere</Button>
          </HeroContent>
        </HeroWrapper>
      </HeroContainer>
    </>
  );
}
