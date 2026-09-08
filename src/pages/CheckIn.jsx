import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  MenuItem,
  ListSubheader,
  IconButton,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import lounges, { METROS } from "../data/lounges";
import cigars from "../data/cigars";
import { tokens } from "../theme";

const SEED_CHECKINS = [
  {
    id: "s1",
    user: "Marcus T.",
    lounge: "Cosmo Knights",
    cigar: "Padron 1964 Anniversary Maduro",
    note: "Perfect evening smoke",
    time: "2h ago",
  },
  {
    id: "s2",
    user: "Derek R.",
    lounge: "Highland Cigar Co.",
    cigar: "Liga Privada No. 9",
    note: "Incredible draw, smooth finish",
    time: "4h ago",
  },
  {
    id: "s3",
    user: "James W.",
    lounge: "Stogies Fine Cigars",
    cigar: "Cohiba Behike 54",
    note: "Special occasion — worth every penny",
    time: "6h ago",
  },
  {
    id: "s4",
    user: "Chris M.",
    lounge: "Nicky Blaine's Cocktail Lounge",
    cigar: "Oliva Serie V Melanio",
    note: "",
    time: "Yesterday",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function CheckIn({ user, checkins, setCheckins, setView }) {
  const [loungeId, setLoungeId] = useState("");
  const [cigarId, setCigarId] = useState("");
  const [note, setNote] = useState("");
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    const lounge = lounges.find((l) => l.id === loungeId);
    const cigar = cigars.find((c) => c.id === cigarId);
    setCheckins([
      {
        id: Date.now(),
        user: user.name || "You",
        lounge: lounge.name,
        cigar: cigar.name,
        note,
        time: "Just now",
      },
      ...checkins,
    ]);
    setPosted(true);
  };

  const reset = () => {
    setPosted(false);
    setLoungeId("");
    setCigarId("");
    setNote("");
  };

  const allActivity = [...checkins, ...SEED_CHECKINS];

  // Lounges grouped by metro so a 21-item list stays scannable.
  const loungeOptions = METROS.flatMap((metro) => [
    <ListSubheader
      key={metro}
      sx={{
        bgcolor: tokens.surfaceHi,
        color: tokens.gold,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1.4,
        lineHeight: "30px",
      }}
    >
      {metro.toUpperCase()}
    </ListSubheader>,
    ...lounges
      .filter((l) => l.metro === metro)
      .map((l) => (
        <MenuItem key={l.id} value={l.id} sx={{ fontSize: 13.5 }}>
          {l.name}
          <Typography component="span" sx={{ fontSize: 11.5, color: tokens.textFaint, ml: 1 }}>
            {l.city}
          </Typography>
        </MenuItem>
      )),
  ]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 2.5, pt: 3, pb: 2, borderBottom: `1px solid ${tokens.line}`, flexShrink: 0 }}
      >
        <IconButton
          onClick={() => setView("swipe")}
          aria-label="Back"
          sx={{
            width: 34,
            height: 34,
            border: `1px solid ${tokens.line}`,
            color: tokens.textMuted,
            "&:hover": { borderColor: tokens.gold, color: tokens.gold },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 17 }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: 19 }}>
          Check In
        </Typography>
      </Stack>

      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, pt: 2.5, pb: 4 }}>
        {!posted ? (
          <Box sx={{ p: 2.2, borderRadius: "18px", bgcolor: tokens.surface, border: `1px solid ${tokens.line}`, mb: 3 }}>
            <Typography variant="h6" sx={{ fontSize: 16, color: tokens.goldPale, mb: 0.4 }}>
              Where are you smoking?
            </Typography>
            <Typography sx={{ fontSize: 12, color: tokens.textFaint, mb: 2 }}>
              Share the session with everyone else on the app
            </Typography>

            <Stack spacing={2}>
              <TextField
                select
                label="Lounge"
                value={loungeId}
                onChange={(e) => setLoungeId(e.target.value)}
                fullWidth
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { maxHeight: 320 } } } } } }}
              >
                {loungeOptions}
              </TextField>

              <TextField
                select
                label="What's lit"
                value={cigarId}
                onChange={(e) => setCigarId(e.target.value)}
                fullWidth
                slotProps={{ select: { MenuProps: { slotProps: { paper: { sx: { maxHeight: 320 } } } } } }}
              >
                {cigars.map((c) => (
                  <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13.5 }}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                placeholder="Add a note… (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
                multiline
                rows={2}
              />

              <Button
                fullWidth
                variant="contained"
                disabled={!loungeId || !cigarId}
                onClick={handlePost}
                sx={{
                  py: 1.7,
                  borderRadius: 3,
                  fontSize: 15,
                  "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.06)", color: tokens.textFaint },
                }}
              >
                Post check-in
              </Button>
            </Stack>
          </Box>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <Box
              sx={{
                p: 3,
                mb: 3,
                textAlign: "center",
                borderRadius: "18px",
                bgcolor: tokens.surface,
                border: `1px solid ${tokens.line}`,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 44, color: tokens.gold, mb: 1.2 }} />
              <Typography variant="h6" sx={{ fontSize: 19 }}>
                You're checked in
              </Typography>
              <Typography sx={{ color: tokens.textMuted, fontSize: 13, mt: 0.6 }}>
                Your session is on the feed
              </Typography>
              <Button onClick={reset} sx={{ mt: 2, color: tokens.gold, fontSize: 13 }}>
                Check in again
              </Button>
            </Box>
          </motion.div>
        )}

        <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint, mb: 1.5 }}>
          RECENT ACTIVITY
        </Typography>

        <Stack spacing={1.2}>
          {allActivity.map((ci) => (
            <Stack
              key={ci.id}
              direction="row"
              spacing={1.5}
              sx={{ p: 1.6, borderRadius: "16px", bgcolor: tokens.surface, border: `1px solid ${tokens.line}` }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: 12,
                  fontWeight: 700,
                  bgcolor: "rgba(212,175,55,0.12)",
                  color: tokens.gold,
                  border: `1px solid ${tokens.line}`,
                }}
              >
                {initials(ci.user)}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography noWrap sx={{ fontSize: 13, fontWeight: 600 }}>
                    {ci.user}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: tokens.textFaint, ml: 1, flexShrink: 0 }}>
                    {ci.time}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: tokens.goldPale, mt: 0.3 }}>
                  {ci.cigar}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: tokens.textFaint }}>
                  at {ci.lounge}
                </Typography>
                {ci.note && (
                  <Typography sx={{ fontSize: 12, color: tokens.textMuted, mt: 0.6, fontStyle: "italic" }}>
                    “{ci.note}”
                  </Typography>
                )}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
