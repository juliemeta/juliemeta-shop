"use client";

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
            <Typography variant="h1">Festival & sommer</Typography>
            <Button variant="contained" href="/tag/festival">
              Shop nu
            </Button>
          </HeroContent>
        </HeroWrapper>
      </HeroContainer>
    </>
  );
}
