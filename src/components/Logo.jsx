import { Box } from "@mui/material";

let uid = 0;

/**
 * The mark: a cigar at rest inside a double gold seal, band picked out in
 * dark tobacco, lit foot glowing. Legible from 24px to full screen.
 */
export function LogoMark({ size = 40, sx }) {
  const id = `cm${uid++}`;

  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      sx={{ width: size, height: size, display: "block", flexShrink: 0, ...sx }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-barrel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7EBC4" />
          <stop offset="42%" stopColor="#D8B441" />
          <stop offset="100%" stopColor="#7A5E17" />
        </linearGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E2B0" />
          <stop offset="50%" stopColor="#C9A431" />
          <stop offset="100%" stopColor="#6E5415" />
        </linearGradient>
        <radialGradient id={`${id}-ember`}>
          <stop offset="0%" stopColor="#FFF8E2" />
          <stop offset="26%" stopColor="#FFC14D" />
          <stop offset="65%" stopColor="#F2660D" />
          <stop offset="100%" stopColor="#8A2A05" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="#FF9A2E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF9A2E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* seal */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="1.5" opacity="0.6" />
      <circle cx="50" cy="50" r="40.5" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="3.6" />

      <g transform="rotate(-34 50 50)">
        <circle cx="76" cy="50" r="16" fill={`url(#${id}-glow)`} />

        {/* barrel */}
        <path d="M12 46.2 q0-4 5.4-4 H73 v15.6 H17.4 q-5.4 0-5.4-4 z" fill={`url(#${id}-barrel)`} />
        <path d="M12 46.2 q0-4 5.4-4 H73 v2.8 H12 z" fill="#FFF6DC" opacity="0.32" />
        <path d="M12 55 H73 v2.8 H17.4 q-5.4 0-5.4-2.8 z" fill="#3D2E08" opacity="0.42" />

        {/* band */}
        <rect x="23" y="42.2" width="11.4" height="15.6" fill="#1A1206" />
        <rect x="23" y="42.2" width="1.5" height="15.6" fill="#E8CE73" />
        <rect x="32.9" y="42.2" width="1.5" height="15.6" fill="#E8CE73" />
        <circle cx="28.7" cy="50" r="2.4" fill="none" stroke="#E8CE73" strokeWidth="1.1" />

        {/* lit foot */}
        <path d="M73 42.2 h1.4 q8.2 0 8.2 7.8 t-8.2 7.8 H73 z" fill={`url(#${id}-ember)`} />
        <path
          d="M73 42.2 h1.4 q8.2 0 8.2 7.8 t-8.2 7.8 H73 z"
          fill="none"
          stroke="#5A4E42"
          strokeWidth="1"
          opacity="0.85"
        />
      </g>
    </Box>
  );
}

/**
 * Mark plus wordmark. `stacked` centers it for the splash and onboarding
 * header; the default sits on one line for app bars.
 */
export default function Logo({ size = 30, stacked = false, tagline = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: stacked ? `${size * 0.42}px` : `${size * 0.34}px`,
      }}
    >
      <LogoMark size={stacked ? size * 1.9 : size} />

      <Box sx={{ textAlign: stacked ? "center" : "left" }}>
        <Box
          sx={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: `${size * 0.78}px`,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: `${size * 0.12}px`,
            textIndent: `${size * 0.12}px`,
            color: "#F2E4BE",
            whiteSpace: "nowrap",
          }}
        >
          CIGAR MATCH
        </Box>
        {tagline && (
          <Box
            sx={{
              mt: `${size * 0.26}px`,
              fontSize: `${Math.max(8.5, size * 0.235)}px`,
              lineHeight: 1,
              letterSpacing: `${size * 0.16}px`,
              textIndent: `${size * 0.16}px`,
              color: "rgba(212,175,55,0.6)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            SWIPE · DISCOVER · CONNECT
          </Box>
        )}
      </Box>
    </Box>
  );
}
