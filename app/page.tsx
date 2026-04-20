"use client";

import { Button, Typography } from "@mui/material";
import { HeroContainer, HeroContent, HeroWrapper } from "./page.styles";
import { StyledContainer } from "@/styles/Container";

export default function HomePage() {
  return (
    <>
      <HeroContainer>
        <HeroWrapper>
          <HeroContent>
            <Typography variant="h1">Hello from hero</Typography>
            <Button>Learn more</Button>
          </HeroContent>
        </HeroWrapper>
      </HeroContainer>

      <StyledContainer>
        <Typography variant="h1">Hello from Homepage</Typography>
        <Typography variant="h2">Hello from Homepage</Typography>
        <Typography variant="h3">Hello from Homepage</Typography>
        <Typography variant="h4">Hello from Homepage</Typography>
        <Typography variant="h5">Hello from Homepage</Typography>
        <Typography variant="h6">Hello from Homepage</Typography>
        <Typography variant="body1">Discover our products</Typography>
        <Typography variant="body2">Discover our products</Typography>
      </StyledContainer>
    </>
  );
}
