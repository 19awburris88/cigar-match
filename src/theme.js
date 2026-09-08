import { createTheme } from "@mui/material/styles";

/** Design tokens — imported directly where sx needs a raw value. */
export const tokens = {
  gold: "#D4AF37",
  goldLight: "#E8CE73",
  goldPale: "#F2E4BE",
  goldDim: "rgba(212,175,55,0.55)",
  ember: "#F2660D",

  bg: "#0A0908",
  surface: "#141210",
  surfaceHi: "#1C1917",
  field: "#12100E",

  line: "rgba(212,175,55,0.13)",
  lineSoft: "rgba(255,255,255,0.06)",

  text: "#F5F1E8",
  textMuted: "#9A9186",
  textFaint: "#6B635A",

  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: tokens.gold, light: tokens.goldLight, dark: "#8E6F1C", contrastText: "#0A0908" },
    secondary: { main: tokens.ember },
    background: { default: tokens.bg, paper: tokens.surface },
    text: { primary: tokens.text, secondary: tokens.textMuted },
    divider: tokens.line,
  },

  shape: { borderRadius: 14 },

  typography: {
    fontFamily: tokens.sans,
    h4: { fontFamily: tokens.serif, fontWeight: 600, letterSpacing: 0.4 },
    h5: { fontFamily: tokens.serif, fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.2 },
    h6: { fontFamily: tokens.serif, fontWeight: 600, letterSpacing: 0.2 },
    subtitle2: { fontWeight: 600, letterSpacing: 0.2 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.2 },
    overline: { fontSize: 10, fontWeight: 600, letterSpacing: 1.6, color: tokens.textFaint },
  },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12 },
        containedPrimary: {
          boxShadow: "0 6px 22px rgba(212,175,55,0.22)",
          "&:hover": { backgroundColor: tokens.goldLight, boxShadow: "0 8px 26px rgba(212,175,55,0.3)" },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: tokens.surface,
          border: `1px solid ${tokens.line}`,
          borderRadius: 18,
        },
      },
    },

    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.field,
          borderRadius: 12,
          "& fieldset": { borderColor: tokens.line },
          "&:hover fieldset": { borderColor: "rgba(212,175,55,0.4)" },
          "&.Mui-focused fieldset": { borderColor: tokens.gold, borderWidth: 1 },
        },
        input: { color: tokens.text },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { color: tokens.textFaint, "&.Mui-focused": { color: tokens.gold } },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surfaceHi,
          border: `1px solid ${tokens.line}`,
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
