import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import lounges from "../data/lounges";
import cigars from "../data/cigars";

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
    lounge: "The Cigar Box",
    cigar: "Liga Privada No. 9",
    note: "Incredible draw, smooth finish 🔥",
    time: "4h ago",
  },
  {
    id: "s3",
    user: "James W.",
    lounge: "Casa de Montecristo",
    cigar: "Cohiba Behike 54",
    note: "Special occasion — worth every penny",
    time: "6h ago",
  },
  {
    id: "s4",
    user: "Chris M.",
    lounge: "LG's Cigar Lounge",
    cigar: "Oliva Serie V Melanio",
    note: "",
    time: "Yesterday",
  },
];

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

  const allActivity = [...checkins, ...SEED_CHECKINS];

  return (
    <Box sx={{ height: "100%", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ px: 2, pt: 3, pb: 2, borderBottom: "1px solid #1e1e1e" }}
      >
        <IconButton
          onClick={() => setView("swipe")}
          sx={{ color: "#D4AF37", p: 0.5 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Check In
        </Typography>
      </Stack>

      <Box sx={{ flex: 1, overflowY: "auto", px: 2, pt: 2.5, pb: 4 }}>
        {/* FORM */}
        {!posted ? (
          <Box
            sx={{
              bgcolor: "#111",
              p: 2.5,
              borderRadius: 4,
              mb: 3,
              border: "1px solid #1e1e1e",
            }}
          >
            <Typography fontWeight="bold" color="#D4AF37" mb={2}>
              Where are you smoking?
            </Typography>

            <Stack spacing={2}>
              <TextField
                select
                label="Select Lounge"
                value={loungeId}
                onChange={(e) => setLoungeId(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#2a2a2a" },
                    "&:hover fieldset": { borderColor: "#D4AF37" },
                    "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#D4AF37" },
                  "& .MuiSelect-icon": { color: "#666" },
                }}
              >
                {lounges.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    {l.name} — {l.city}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="What are you smoking?"
                value={cigarId}
                onChange={(e) => setCigarId(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#2a2a2a" },
                    "&:hover fieldset": { borderColor: "#D4AF37" },
                    "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
                  },
                  "& .MuiInputLabel-root": { color: "#666" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#D4AF37" },
                  "& .MuiSelect-icon": { color: "#666" },
                }}
              >
                {cigars.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                placeholder="Add a note... (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                fullWidth
                multiline
                rows={2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#2a2a2a" },
                    "&:hover fieldset": { borderColor: "#D4AF37" },
                    "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
                  },
                }}
                InputProps={{ style: { color: "#fff" } }}
              />

              <Button
                fullWidth
                variant="contained"
                disabled={!loungeId || !cigarId}
                onClick={handlePost}
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#000",
                  fontWeight: "bold",
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: 15,
                  "&:hover": { bgcolor: "#c5a030" },
                  "&.Mui-disabled": { bgcolor: "#222", color: "#444" },
                }}
              >
                Post Check-In
              </Button>
            </Stack>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                bgcolor: "#111",
                p: 3,
                borderRadius: 4,
                mb: 3,
                textAlign: "center",
                border: "1px solid #1e1e1e",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 48, color: "#D4AF37", mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" mb={0.5}>
                Checked In!
              </Typography>
              <Typography color="gray" fontSize={13}>
                Your smoke session has been posted
              </Typography>
              <Button
                onClick={() => {
                  setPosted(false);
                  setLoungeId("");
                  setCigarId("");
                  setNote("");
                }}
                sx={{ mt: 2, color: "#D4AF37", fontSize: 13, textTransform: "none" }}
              >
                Check in again
              </Button>
            </Box>
          </motion.div>
        )}

        {/* ACTIVITY FEED */}
        <Typography fontWeight="bold" fontSize={15} mb={2}>
          Recent Activity
        </Typography>
        <Stack spacing={1.5}>
          {allActivity.map((ci) => (
            <Card
              key={ci.id}
              sx={{
                bgcolor: "#111",
                borderRadius: 3,
                border: "1px solid #1e1e1e",
              }}
            >
              <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
                <Stack direction="row" justifyContent="space-between" mb={0.3}>
                  <Typography fontWeight="bold" fontSize={13}>
                    {ci.user}
                  </Typography>
                  <Typography fontSize={11} color="#555">
                    {ci.time}
                  </Typography>
                </Stack>
                <Typography fontSize={13} sx={{ color: "#D4AF37" }}>
                  {ci.cigar}
                </Typography>
                <Typography fontSize={12} color="#666">
                  @ {ci.lounge}
                </Typography>
                {ci.note && (
                  <Typography fontSize={12} color="#888" mt={0.5} fontStyle="italic">
                    "{ci.note}"
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
