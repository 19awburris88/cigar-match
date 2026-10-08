import { createTheme } from "@mui/material/styles";

/**
 * Humidor Connect brand palette.
 *
 * Cream is the ground, charcoal gives structure, copper carries every piece of
 * emphasis. The only place the app still goes dark is type sitting on
 * photography — the `onImage*` and `scrim` tokens cover that case.
 *
 * Design tokens are imported directly wherever `sx` needs a raw value.
 */
export const tokens = {
  /* brand */
  copper: "#904818",      // primary: buttons, links, icons, selected states
  copperDeep: "#73370F",  // hover and pressed states
  copperSoft: "#B56A35",  // lighter copper for rules and quiet accents
  copperWash: "rgba(144,72,24,0.07)",  // tint behind a selected row
  copperEdge: "rgba(144,72,24,0.32)",  // hovered border

  charcoal: "#131210",
  cream: "#FAF6EF",
  graphite: "#38332D",
  taupe: "#6A5E51",

  /* surfaces */
  bg: "#FAF6EF",
  surface: "#FFFFFF",
  surfaceHi: "#F4EDE3",
  field: "#FFFFFF",

  line: "rgba(19,18,16,0.11)",
  lineSoft: "rgba(19,18,16,0.07)",

  /* type — charcoal headings, graphite body, taupe captions */
  text: "#131210",
  textMuted: "#38332D",
  textFaint: "#6A5E51",

  /* over photography */
  onImage: "#FAF6EF",
  onImageMuted: "rgba(250,246,239,0.78)",
  onImageAccent: "#E0A06A",
  scrim: "rgba(19,18,16,0.62)",

  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: tokens.copper,
      light: tokens.copperSoft,
      dark: tokens.copperDeep,
      contrastText: tokens.cream,
    },
    secondary: { main: tokens.charcoal },
    background: { default: tokens.bg, paper: tokens.surface },
    text: { primary: tokens.text, secondary: tokens.textMuted },
    divider: tokens.line,
  },

  shape: { borderRadius: 14 },

  typography: {
    fontFamily: tokens.sans,
    h4: { fontFamily: tokens.serif, fontWeight: 700, letterSpacing: 0.4 },
    h5: { fontFamily: tokens.serif, fontWeight: 700, letterSpacing: 0.3, lineHeight: 1.2 },
    h6: { fontFamily: tokens.serif, fontWeight: 700, letterSpacing: 0.2 },
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
          color: tokens.cream,
          boxShadow: "0 6px 18px rgba(144,72,24,0.22)",
          "&:hover": {
            backgroundColor: tokens.copperDeep,
            boxShadow: "0 8px 22px rgba(144,72,24,0.28)",
          },
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
          "&:hover fieldset": { borderColor: tokens.copperEdge },
          "&.Mui-focused fieldset": { borderColor: tokens.copper, borderWidth: 1 },
        },
        input: { color: tokens.text },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { color: tokens.textFaint, "&.Mui-focused": { color: tokens.copper } },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surface,
          border: `1px solid ${tokens.line}`,
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
