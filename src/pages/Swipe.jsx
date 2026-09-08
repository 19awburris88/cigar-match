import { useState } from "react";
import { Box, Typography, Button, Stack, IconButton, ButtonBase } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import cigars from "../data/cigars";
import { rankCigars } from "../utils/recommend";
import { getPairing } from "../utils/pairing";
import { matchReasons } from "../utils/reasons";
import Logo from "../components/Logo";
import { tokens } from "../theme";

function Meta({ children }) {
  return (
    <Typography sx={{ fontSize: 11.5, color: tokens.textMuted, letterSpacing: 0.2 }}>
      {children}
    </Typography>
  );
}

export default function Swipe({ user, liked, setLiked, humidor, setHumidor, setView }) {
  const [passed, setPassed] = useState([]);
  const [exitDir, setExitDir] = useState(0);

  const seen = [...liked, ...passed].map((c) => c.id);
  const deck = rankCigars(cigars, user, liked).filter((c) => !seen.includes(c.id));
  const cigar = deck[0];
  const next = deck[1];

  const pairing = cigar ? getPairing(cigar) : null;
  const inHumidor = cigar && humidor.some((c) => c.id === cigar.id);
  const reasons = cigar ? matchReasons(cigar, user, liked).slice(0, 3) : [];

  const handleSwipe = (direction) => {
    setExitDir(direction === "right" ? 420 : -420);
    if (direction === "right") setLiked((prev) => [...prev, cigar]);
    else setPassed((prev) => [...prev, cigar]);
  };

  const addToHumidor = () => {
    if (!inHumidor) setHumidor((prev) => [...prev, cigar]);
  };

  const header = (
    <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
      <Logo size={19} />
      <ButtonBase
        onClick={() => setView("checkin")}
        sx={{
          display: "flex",
          gap: 0.7,
          alignItems: "center",
          px: 1.5,
          py: 0.8,
          borderRadius: 2.5,
          border: `1px solid ${tokens.line}`,
          color: tokens.gold,
          fontSize: 12,
          fontWeight: 600,
          "&:hover": { borderColor: tokens.gold, bgcolor: "rgba(212,175,55,0.06)" },
        }}
      >
        <AddLocationAltOutlinedIcon sx={{ fontSize: 15 }} />
        Check In
      </ButtonBase>
    </Stack>
  );

  if (!cigar) {
    return (
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", px: 2.5, pt: 2.5, pb: 1.5 }}>
        {header}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 1.5,
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
          <LocalBarIcon sx={{ fontSize: 28, color: tokens.gold }} />
        </Box>
        <Typography variant="h5" sx={{ fontSize: 23 }}>
          That's the whole humidor
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 13.5, mt: 1, lineHeight: 1.7 }}>
          You've been through every cigar we have. Your profile has the full
          picture of your palate now.
        </Typography>
          <Button variant="contained" onClick={() => setView("profile")} sx={{ mt: 3.5, px: 4, py: 1.5, borderRadius: 3 }}>
            See my taste profile
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", px: 2.5, pt: 2.5, pb: 1.5 }}>
      {header}

      {/* card stack */}
      <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
        {/* peek of the next card, so the deck reads as a stack */}
        {next && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              top: 10,
              mx: 1.5,
              borderRadius: "22px",
              bgcolor: tokens.surface,
              border: `1px solid ${tokens.line}`,
              opacity: 0.55,
            }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={cigar.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.55}
            whileDrag={{ rotate: 3, cursor: "grabbing" }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 110) handleSwipe("right");
              else if (info.offset.x < -110) handleSwipe("left");
            }}
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: exitDir, rotate: exitDir > 0 ? 14 : -14 }}
            transition={{ duration: 0.28 }}
            style={{ position: "absolute", inset: 0, cursor: "grab" }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "22px",
                overflow: "hidden",
                bgcolor: tokens.surface,
                border: `1px solid ${tokens.line}`,
                boxShadow: "0 18px 48px rgba(0,0,0,0.6)",
              }}
            >
              {/* photo */}
              <Box sx={{ position: "relative", flex: 1, minHeight: 210, overflow: "hidden" }}>
                <Box
                  component="img"
                  src={cigar.image}
                  alt={cigar.name}
                  loading="eager"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* gradient so the title always sits on darkness */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0) 34%, rgba(20,18,16,0.35) 74%, rgba(20,18,16,1) 100%)",
                  }}
                />

                <Stack direction="row" sx={{ justifyContent: "space-between", position: "absolute", top: 12, left: 12, right: 12 }}
                >
                  <IconButton
                    onClick={addToHumidor}
                    aria-label={inHumidor ? "In your humidor" : "Add to humidor"}
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: inHumidor ? tokens.gold : "rgba(10,9,8,0.6)",
                      color: inHumidor ? "#0A0908" : "#fff",
                      backdropFilter: "blur(6px)",
                      border: `1px solid ${inHumidor ? tokens.gold : "rgba(255,255,255,0.14)"}`,
                      "&:hover": { bgcolor: inHumidor ? tokens.goldLight : "rgba(10,9,8,0.85)" },
                    }}
                  >
                    {inHumidor ? (
                      <Inventory2Icon sx={{ fontSize: 17 }} />
                    ) : (
                      <Inventory2OutlinedIcon sx={{ fontSize: 17 }} />
                    )}
                  </IconButton>

                  {cigar.rating && (
                    <Stack sx={{ alignItems: "center", justifyContent: "center", px: 1.4,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: "rgba(10,9,8,0.6)",
                        backdropFilter: "blur(6px)",
                        border: `1px solid ${tokens.line}` }}
                    >
                      <Typography sx={{ fontFamily: tokens.serif, fontSize: 17, fontWeight: 700, color: tokens.goldPale, lineHeight: 1 }}
                      >
                        {cigar.rating}
                      </Typography>
                      <Typography sx={{ fontSize: 7.5, letterSpacing: 1.1, color: tokens.textFaint, lineHeight: 1.4 }}>
                        RATED
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {/* title over the gradient */}
                <Box sx={{ position: "absolute", left: 20, right: 20, bottom: 14 }}>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: tokens.gold, mb: 0.5 }}
                  >
                    {cigar.brand.toUpperCase()}
                  </Typography>
                  <Typography variant="h5" sx={{ fontSize: 23, lineHeight: 1.18 }}>
                    {cigar.name}
                  </Typography>
                </Box>
              </Box>

              {/* details */}
              <Box sx={{ flexShrink: 0, maxHeight: "58%", overflowY: "auto", px: 2.5, pt: 1.8, pb: 2.2 }}>
                <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: "center", flexWrap: "wrap" }}>
                  <Meta>{cigar.wrapper}</Meta>
                  <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: tokens.textFaint }} />
                  <Meta>{cigar.strength}</Meta>
                  <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: tokens.textFaint }} />
                  <Meta>{cigar.origin}</Meta>
                  <Box sx={{ flex: 1 }} />
                  <Typography sx={{ fontFamily: tokens.serif, fontSize: 17, fontWeight: 600, color: tokens.goldPale }}>
                    {cigar.price}
                  </Typography>
                </Stack>

                {/* flavor notes */}
                <Stack direction="row" sx={{ mt: 1.6, gap: 0.8, flexWrap: "wrap" }}>
                  {cigar.flavorNotes.map((note) => (
                    <Box
                      key={note}
                      sx={{
                        px: 1.2,
                        py: 0.5,
                        borderRadius: 999,
                        bgcolor: "rgba(212,175,55,0.08)",
                        border: `1px solid ${tokens.line}`,
                        fontSize: 11.5,
                        color: tokens.goldPale,
                        textTransform: "capitalize",
                      }}
                    >
                      {note}
                    </Box>
                  ))}
                </Stack>

                {/* why it surfaced */}
                {reasons.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint, mb: 0.9 }}>
                      WHY THIS MATCHES
                    </Typography>
                    <Stack spacing={0.6}>
                      {reasons.map((r) => (
                        <Stack key={r} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: tokens.gold, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 12, color: tokens.textMuted }}>
                            {r}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* pairing */}
                {pairing && (
                  <Box
                    sx={{
                      mt: 2,
                      px: 1.8,
                      py: 1.4,
                      borderRadius: 2.5,
                      bgcolor: tokens.surfaceHi,
                      borderLeft: `2px solid ${tokens.gold}`,
                    }}
                  >
                    <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
                      <LocalBarIcon sx={{ fontSize: 14, color: tokens.gold }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: tokens.goldPale }}>
                        Pair with {pairing.drink}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 11.5, color: tokens.textMuted, mt: 0.4 }}>
                      {pairing.recommendation} · {pairing.vibe}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* actions */}
      <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: "center", justifyContent: "center" }}>
        <IconButton
          onClick={() => handleSwipe("left")}
          aria-label="Pass"
          sx={{
            width: 58,
            height: 58,
            border: `1px solid ${tokens.lineSoft}`,
            color: tokens.textMuted,
            "&:hover": { borderColor: "#6B635A", color: tokens.text },
          }}
        >
          <CloseIcon sx={{ fontSize: 25 }} />
        </IconButton>

        <IconButton
          onClick={() => handleSwipe("right")}
          aria-label="Like"
          sx={{
            width: 68,
            height: 68,
            bgcolor: tokens.gold,
            color: "#0A0908",
            boxShadow: "0 8px 26px rgba(212,175,55,0.32)",
            "&:hover": { bgcolor: tokens.goldLight },
          }}
        >
          <FavoriteIcon sx={{ fontSize: 27 }} />
        </IconButton>

        <IconButton
          onClick={addToHumidor}
          aria-label="Add to humidor"
          sx={{
            width: 58,
            height: 58,
            border: `1px solid ${inHumidor ? tokens.gold : tokens.lineSoft}`,
            color: inHumidor ? tokens.gold : tokens.textMuted,
            "&:hover": { borderColor: tokens.gold, color: tokens.gold },
          }}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Stack>

      <Typography sx={{ fontSize: 10.5, color: tokens.textFaint, mt: 1.2, letterSpacing: 0.4, textAlign: "center" }}>
        Swipe the card, or use the buttons
      </Typography>
    </Box>
  );
}
