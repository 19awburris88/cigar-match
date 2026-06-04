import { useState } from "react";
import cigars from "../data/cigars";
import { rankCigars } from "../utils/recommend";
import { getPairing } from "../utils/pairing";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import logo from "../assets/cigar-match-logo.png";

export default function Swipe({ user, liked, setLiked, humidor, setHumidor, setView }) {
  const [passed, setPassed] = useState([]);
  const [exitDir, setExitDir] = useState(0);

  const seen = [...liked, ...passed].map((c) => c.id);
  const deck = rankCigars(cigars, user, liked).filter((c) => !seen.includes(c.id));
  const cigar = deck[0];
  const pairing = cigar ? getPairing(cigar) : null;
  const inHumidor = cigar && humidor.some((c) => c.id === cigar.id);

  const handleSwipe = (direction) => {
    setExitDir(direction === "right" ? 400 : -400);
    if (direction === "right") {
      setLiked((prev) => [...prev, cigar]);
    } else {
      setPassed((prev) => [...prev, cigar]);
    }
  };

  const addToHumidor = () => {
    if (!inHumidor) setHumidor((prev) => [...prev, cigar]);
  };

  if (!cigar) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography fontSize={52} mb={2}>🔥</Typography>
        <Typography variant="h6" fontWeight="bold">You've seen them all</Typography>
        <Typography color="gray" fontSize={13} mt={1}>
          Head to your Profile to review your picks
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        pt: 3,
        pb: 2,
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", maxWidth: 360, mb: 2 }}
      >
        <Box
          component="img"
          src={logo}
          alt="Cigar Match"
          sx={{ height: 32, objectFit: "contain" }}
        />
        <Button
          size="small"
          onClick={() => setView("checkin")}
          startIcon={<AddCircleOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            color: "#D4AF37",
            fontSize: 12,
            textTransform: "none",
            border: "1px solid #333",
            borderRadius: 2,
            px: 1.5,
            py: 0.6,
          }}
        >
          Check In
        </Button>
      </Stack>

      {/* SWIPE CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cigar.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          whileTap={{ scale: 0.97 }}
          whileDrag={{ rotate: 4 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 120) handleSwipe("right");
            else if (info.offset.x < -120) handleSwipe("left");
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: exitDir, rotate: exitDir > 0 ? 12 : -12 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%", maxWidth: 360 }}
        >
          <Card
            sx={{
              bgcolor: "#111",
              borderRadius: 5,
              overflow: "hidden",
              border: "1px solid #222",
            }}
          >
            {/* IMAGE */}
            <Box sx={{ position: "relative" }}>
              <img
                src={cigar.image}
                alt={cigar.name}
                style={{
                  width: "100%",
                  height: 210,
                  objectFit: "cover",
                  filter: "brightness(0.82)",
                  display: "block",
                }}
              />

              {/* Rating badge */}
              {cigar.rating && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "#D4AF37",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 2,
                  }}
                >
                  <Typography fontSize={12} fontWeight="bold" color="#000">
                    {cigar.rating} pts
                  </Typography>
                </Box>
              )}

              {/* Humidor icon */}
              <IconButton
                onClick={addToHumidor}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 10,
                  bgcolor: inHumidor ? "#D4AF37" : "rgba(0,0,0,0.55)",
                  color: inHumidor ? "#000" : "#fff",
                  width: 34,
                  height: 34,
                  "&:hover": {
                    bgcolor: inHumidor ? "#c5a030" : "rgba(0,0,0,0.75)",
                  },
                }}
              >
                <Inventory2Icon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>

            {/* DETAILS */}
            <CardContent sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h6" fontWeight="700" lineHeight={1.2}>
                {cigar.name}
              </Typography>
              <Typography sx={{ color: "#D4AF37", fontWeight: 600, fontSize: 14, mt: 0.3 }}>
                {cigar.brand}
              </Typography>

              <Stack direction="row" spacing={0.8} mt={1} alignItems="center">
                <Typography fontSize={12} color="#777">{cigar.wrapper}</Typography>
                <Typography fontSize={12} color="#444">•</Typography>
                <Typography fontSize={12} color="#777">{cigar.strength}</Typography>
                {cigar.origin && (
                  <>
                    <Typography fontSize={12} color="#444">•</Typography>
                    <Typography fontSize={12} color="#777">{cigar.origin}</Typography>
                  </>
                )}
                {cigar.price && (
                  <>
                    <Typography fontSize={12} color="#444">•</Typography>
                    <Typography fontSize={12} color="#777">{cigar.price}</Typography>
                  </>
                )}
              </Stack>

              <Typography mt={1} fontSize={13} color="#bbb">
                {cigar.flavorNotes.join("  ·  ")}
              </Typography>

              {/* WHY THIS MATCHES */}
              <Box mt={1.5}>
                {cigar.strength === user.strength && (
                  <Typography fontSize={11} color="#888">✔ Matches your strength preference</Typography>
                )}
                {cigar.wrapper === user.wrapper && (
                  <Typography fontSize={11} color="#888">✔ Matches your wrapper preference</Typography>
                )}
                {user.brands?.includes(cigar.brand) && (
                  <Typography fontSize={11} color="#888">✔ One of your favorite brands</Typography>
                )}
                {liked.some((c) => c.strength === cigar.strength) && (
                  <Typography fontSize={11} color="#888">✔ Similar to cigars you liked</Typography>
                )}
                {liked.some((c) =>
                  c.flavorNotes.some((note) => cigar.flavorNotes.includes(note))
                ) && (
                  <Typography fontSize={11} color="#888">✔ Shares flavor notes you enjoy</Typography>
                )}
              </Box>

              {/* PAIRING */}
              {pairing && (
                <Box
                  sx={{
                    bgcolor: "#1a1a1a",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    mt: 1.5,
                    borderLeft: "3px solid #D4AF37",
                  }}
                >
                  <Typography fontSize={11} color="#D4AF37" fontWeight="bold">
                    Pairs with: {pairing.drink}
                  </Typography>
                  <Typography fontSize={11} color="#777">
                    {pairing.recommendation}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* ACTION BUTTONS */}
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        sx={{ width: "100%", maxWidth: 360 }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleSwipe("left")}
          sx={{
            borderColor: "#333",
            color: "#fff",
            borderRadius: 3,
            py: 1.5,
            fontWeight: "bold",
            letterSpacing: 1,
            "&:hover": { borderColor: "#888" },
          }}
        >
          PASS
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleSwipe("right")}
          sx={{
            bgcolor: "#D4AF37",
            color: "#000",
            borderRadius: 3,
            fontWeight: "bold",
            py: 1.5,
            letterSpacing: 1,
            boxShadow: "0 4px 18px rgba(212,175,55,0.28)",
            "&:hover": { bgcolor: "#c5a030" },
          }}
        >
          LIKE
        </Button>
      </Stack>
    </Box>
  );
}
