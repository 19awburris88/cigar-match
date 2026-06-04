import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D4AF37",
    },
    background: {
      default: "#0b0b0b",
      paper: "#121212",
    },
  },

  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto",
    h5: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h6: {
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backdropFilter: "blur(12px)",
        },
      },
    },
  },
});

export default theme;