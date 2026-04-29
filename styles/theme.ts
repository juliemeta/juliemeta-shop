import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },

  palette: {
    background: {
      default: "#fffefb",
      paper: "#fbfdfd",
      subtle: "#f2edec",
      section: "#fcf5eb",
      elevated: "#ffffff",
      navbar: "#ffffffe5",
      footer: "#ece9e4",
    },
    primary: {
      main: "#000000",
      dark: "#000",
      light: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D4A373",
      dark: "#000",
      light: "#fff",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
      dark: "#000",
      light: "#fff",
    },
    warning: {
      main: "#ed6c02",
      dark: "#000",
      light: "#fff",
    },
    info: {
      main: "#0288d1",
      dark: "#000",
      light: "#fff",
    },
    success: {
      main: "#2e7d32",
      dark: "#28702c",
      light: "#fff",
    },
  },

  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      color: "#4800a7",
      textAlign: "center",
      marginBottom: "25px",
    },

    h2: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.25,
      color: "#d18bff",
      textAlign: "center",
    },

    h3: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#6500a8",
      textAlign: "center",
    },

    h4: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.35,
      color: "#004b16",
      textAlign: "center",
    },

    h5: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#2370ff",
      textAlign: "center",
    },

    h6: {
      fontFamily: "var(--font-playfair), serif",
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#020202",
      textAlign: "center",
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },

  spacing: 8, // default MUI grid
});
