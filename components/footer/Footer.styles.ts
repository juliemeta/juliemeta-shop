import { Box, styled } from "@mui/material";

export const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.footer,
  padding: theme.spacing(3),
  marginTop: theme.spacing(8),
}));
