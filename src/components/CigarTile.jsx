import { Box, Typography, ButtonBase } from "@mui/material";
import { tokens } from "../theme";

/** Shared grid tile used by the Humidor and the Profile's liked list. */
export default function CigarTile({ cigar, action, onAction }) {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${tokens.line}`,
        bgcolor: tokens.surface,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={cigar.image}
          alt={cigar.name}
          loading="lazy"
          sx={{ width: "100%", height: 106, objectFit: "cover", display: "block" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,9,8,0.1) 40%, rgba(20,18,16,0.9) 100%)",
          }}
        />
        {cigar.rating && (
          <Typography
            sx={{
              position: "absolute",
              top: 7,
              right: 8,
              px: 0.8,
              py: 0.1,
              borderRadius: 1,
              bgcolor: "rgba(10,9,8,0.7)",
              border: `1px solid ${tokens.line}`,
              fontSize: 10,
              fontWeight: 700,
              color: tokens.goldPale,
            }}
          >
            {cigar.rating}
          </Typography>
        )}
      </Box>

      <Box sx={{ px: 1.4, py: 1.2, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography noWrap sx={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: tokens.gold }}>
          {cigar.brand.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, mt: 0.3, lineHeight: 1.3, minHeight: 32 }}>
          {cigar.name}
        </Typography>
        <Typography sx={{ fontSize: 10.5, color: tokens.textFaint, mt: 0.4 }}>
          {cigar.wrapper} · {cigar.strength}
          {cigar.price ? ` · ${cigar.price}` : ""}
        </Typography>

        {action && (
          <>
            <Box sx={{ flex: 1 }} />
            <ButtonBase
              onClick={onAction}
              sx={{
                mt: 1,
                alignSelf: "flex-start",
                fontSize: 10.5,
                color: tokens.textFaint,
                "&:hover": { color: tokens.gold },
              }}
            >
              {action}
            </ButtonBase>
          </>
        )}
      </Box>
    </Box>
  );
}
