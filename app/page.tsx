"use client";

import { Typography } from "@mui/material";
import { StyledContainer } from "@/styles/Container";
import FrontPageHero from "@/components/frontPageHero/FrontPageHero";

export default function HomePage() {
  return (
    <>
      <FrontPageHero />

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
