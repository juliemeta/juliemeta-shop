import { Box } from "@mui/material";

export const StyledContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 4, lg: 5 },
        py: 5,
      }}
    >
      {children}
    </Box>
  );
};
