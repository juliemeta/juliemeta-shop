import { Box } from "@mui/material";

export const FullWidthSection = ({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: object;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
