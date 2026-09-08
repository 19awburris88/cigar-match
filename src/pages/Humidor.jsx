import { Box, Typography, Button } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CigarTile from "../components/CigarTile";
import { tokens } from "../theme";

export default function Humidor({ humidor, setHumidor, setView }) {
  const remove = (id) => setHumidor((h) => h.filter((c) => c.id !== id));

  if (humidor.length === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 4,
        }}
      >
        <Box
          sx={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            border: `1px solid ${tokens.line}`,
            display: "grid",
            placeItems: "center",
            mb: 2.5,
          }}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 28, color: tokens.gold }} />
        </Box>
        <Typography variant="h5" sx={{ fontSize: 23 }}>
          Your humidor is empty
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 13.5, mt: 1, lineHeight: 1.7 }}>
          Tap the box icon on any card while you're swiping and it lands here —
          your running list of what to buy and smoke next.
        </Typography>
        <Button variant="contained" onClick={() => setView("swipe")} sx={{ mt: 3.5, px: 4, py: 1.5, borderRadius: 3 }}>
          Start discovering
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", overflowY: "auto", px: 2.5, pt: 3, pb: 3 }}>
      <Typography variant="h5" sx={{ fontSize: 26 }}>
        My Humidor
      </Typography>
      <Typography sx={{ color: tokens.textMuted, fontSize: 13, mt: 0.4, mb: 2.5 }}>
        {humidor.length} cigar{humidor.length !== 1 ? "s" : ""} set aside
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        {humidor.map((cigar) => (
          <CigarTile key={cigar.id} cigar={cigar} action="Remove" onAction={() => remove(cigar.id)} />
        ))}
      </Box>
    </Box>
  );
}
