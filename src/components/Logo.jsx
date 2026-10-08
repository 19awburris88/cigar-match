import { Box } from "@mui/material";
import { tokens } from "../theme";
import { VIEWBOX, MARK_BOX, WORD_BOX, MARK, WORD } from "./logoPaths";

export const TAGLINE = "Discover cigars you’ll love, where you are.";

/**
 * The HC monogram on its own. Copper by default; pass `color` when it sits on
 * photography or a copper fill and needs to read as cream instead.
 */
export function LogoMark({ size = 40, color = tokens.copper, sx }) {
  const pad = MARK_BOX.h * 0.04;
  return (
    <Box
      component="svg"
      viewBox={`${MARK_BOX.x - pad} ${MARK_BOX.y - pad} ${MARK_BOX.w + pad * 2} ${MARK_BOX.h + pad * 2}`}
      sx={{ width: size * (MARK_BOX.w / MARK_BOX.h), height: size, display: "block", flexShrink: 0, ...sx }}
      role="img"
      aria-label="Humidor Connect"
    >
      <path d={MARK} fill={color} fillRule="evenodd" />
    </Box>
  );
}

/**
 * The full lockup — monogram plus wordmark, in their true relative positions.
 * `stacked` puts the mark above the wordmark for the splash screen; the default
 * is the horizontal lockup used in app bars.
 *
 * `onDark` flips the wordmark to cream for use over photography.
 */
export default function Logo({ size = 30, stacked = false, tagline = false, onDark = false }) {
  const inkColor = onDark ? tokens.cream : tokens.charcoal;
  const markColor = onDark ? tokens.onImageAccent : tokens.copper;

  if (!stacked) {
    // Horizontal: one SVG, so the artwork's own spacing and baseline are kept.
    return (
      <Box
        component="svg"
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        sx={{ height: size, width: size * (VIEWBOX.w / VIEWBOX.h), display: "block", flexShrink: 0 }}
        role="img"
        aria-label="Humidor Connect"
      >
        <path d={MARK} fill={markColor} fillRule="evenodd" />
        <path d={WORD} fill={inkColor} fillRule="evenodd" />
      </Box>
    );
  }

  // Stacked: the mark sits above the wordmark, so each is drawn on its own.
  const wordHeight = size * 0.62;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: `${size * 0.46}px`,
      }}
    >
      <LogoMark size={size * 1.55} color={markColor} />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          component="svg"
          viewBox={`${WORD_BOX.x} ${WORD_BOX.y} ${WORD_BOX.w} ${WORD_BOX.h}`}
          sx={{ height: wordHeight, width: wordHeight * (WORD_BOX.w / WORD_BOX.h), display: "block" }}
          role="img"
          aria-label="Humidor Connect"
        >
          <path d={WORD} fill={inkColor} fillRule="evenodd" />
        </Box>

        {tagline && (
          <Box
            sx={{
              mt: `${size * 0.42}px`,
              fontSize: `${Math.max(10, size * 0.33)}px`,
              lineHeight: 1.4,
              letterSpacing: 0.2,
              color: onDark ? tokens.onImageMuted : tokens.taupe,
              fontWeight: 500,
              textAlign: "center",
              maxWidth: `${size * 8.5}px`,
            }}
          >
            {TAGLINE}
          </Box>
        )}
      </Box>
    </Box>
  );
}
