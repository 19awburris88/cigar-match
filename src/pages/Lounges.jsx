import { useState, useMemo } from "react";
import { Box, Typography, Stack, Button, IconButton, ButtonBase } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import lounges, { METROS } from "../data/lounges";
import cigars from "../data/cigars";
import { tokens } from "../theme";

function Rating({ value, size = "sm" }) {
  const big = size === "lg";
  return (
    <Stack direction="row" spacing={0.4} sx={{ alignItems: "center", px: big ? 1.3 : 1,
        py: big ? 0.6 : 0.4,
        borderRadius: 1.8,
        bgcolor: "rgba(10,9,8,0.68)",
        backdropFilter: "blur(6px)",
        border: `1px solid ${tokens.line}` }}
    >
      <StarIcon sx={{ fontSize: big ? 15 : 12.5, color: tokens.gold }} />
      <Typography sx={{ fontSize: big ? 13 : 11.5, fontWeight: 700, color: tokens.goldPale }}>
        {value}
      </Typography>
    </Stack>
  );
}

function Tag({ label, strong }) {
  return (
    <Box
      sx={{
        px: 1.2,
        py: 0.5,
        borderRadius: 999,
        border: `1px solid ${tokens.line}`,
        bgcolor: strong ? "rgba(212,175,55,0.08)" : "transparent",
        fontSize: 11,
        color: strong ? tokens.goldPale : tokens.textMuted,
      }}
    >
      {label}
    </Box>
  );
}

export default function Lounges({ setView }) {
  const [metro, setMetro] = useState(METROS[0]);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => lounges.filter((l) => l.metro === metro), [metro]);

  if (selected) {
    return <LoungeDetail lounge={selected} onBack={() => setSelected(null)} setView={setView} />;
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <Box sx={{ px: 2.5, pt: 3, pb: 1.5 }}>
        <Typography variant="h5" sx={{ fontSize: 26 }}>
          Lounges
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 13, mt: 0.4 }}>
          {visible.length} spot{visible.length !== 1 ? "s" : ""} in {metro}
        </Typography>
      </Box>

      {/* metro selector */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          px: 2.5,
          pb: 2,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {METROS.map((m) => {
          const active = m === metro;
          return (
            <ButtonBase
              key={m}
              onClick={() => setMetro(m)}
              sx={{
                flexShrink: 0,
                px: 1.9,
                py: 0.9,
                borderRadius: 999,
                fontSize: 12.5,
                fontWeight: active ? 700 : 500,
                border: "1px solid",
                borderColor: active ? tokens.gold : tokens.line,
                bgcolor: active ? tokens.gold : "transparent",
                color: active ? "#0A0908" : tokens.textMuted,
                transition: "all .18s",
                "&:hover": { borderColor: "rgba(212,175,55,0.5)" },
              }}
            >
              {m}
            </ButtonBase>
          );
        })}
      </Box>

      {/* list */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, pb: 3 }}>
        <Stack spacing={2}>
          {visible.map((lounge, i) => (
            <motion.div
              key={lounge.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.045 }}
            >
              <ButtonBase
                onClick={() => setSelected(lounge)}
                sx={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: `1px solid ${tokens.line}`,
                  bgcolor: tokens.surface,
                  transition: "border-color .2s, transform .2s",
                  "&:hover": { borderColor: "rgba(212,175,55,0.35)", transform: "translateY(-2px)" },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={lounge.image}
                    alt={lounge.name}
                    loading="lazy"
                    sx={{ width: "100%", height: 148, objectFit: "cover", display: "block" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.05) 30%, rgba(12,11,10,0.78) 68%, rgba(12,11,10,0.97) 100%)",
                    }}
                  />
                  <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                    <Rating value={lounge.rating} />
                  </Box>
                  <Box sx={{ position: "absolute", left: 16, right: 16, bottom: 10 }}>
                    <Typography variant="h6" sx={{ fontSize: 18, lineHeight: 1.2 }}>
                      {lounge.name}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: tokens.textMuted, mt: 0.3 }}>
                      {lounge.city}, {lounge.state} · {lounge.reviews} reviews
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" sx={{ gap: 0.8, flexWrap: "wrap", px: 2, py: 1.5 }}>
                  {lounge.amenities.slice(0, 3).map((a) => (
                    <Tag key={a} label={a} />
                  ))}
                  {lounge.amenities.length > 3 && (
                    <Tag label={`+${lounge.amenities.length - 3}`} />
                  )}
                </Stack>
              </ButtonBase>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function LoungeDetail({ lounge, onBack, setView }) {
  const stock = cigars.filter((c) => lounge.inventory.includes(c.id));

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* hero */}
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <Box
          component="img"
          src={lounge.image}
          alt={lounge.name}
          sx={{ width: "100%", height: 216, objectFit: "cover", display: "block" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,9,8,0.6) 0%, rgba(10,9,8,0.12) 32%, rgba(10,9,8,0.8) 70%, rgba(10,9,8,0.99) 100%)",
          }}
        />
        <IconButton
          onClick={onBack}
          aria-label="Back to lounges"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 36,
            height: 36,
            bgcolor: "rgba(10,9,8,0.62)",
            backdropFilter: "blur(6px)",
            border: `1px solid ${tokens.line}`,
            color: "#fff",
            "&:hover": { bgcolor: "rgba(10,9,8,0.85)" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Box sx={{ position: "absolute", top: 14, right: 14 }}>
          <Rating value={lounge.rating} size="lg" />
        </Box>

        <Box sx={{ position: "absolute", left: 20, right: 20, bottom: 14 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: tokens.gold, mb: 0.5 }}>
            {lounge.city.toUpperCase()}, {lounge.state}
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 24, lineHeight: 1.18 }}>
            {lounge.name}
          </Typography>
        </Box>
      </Box>

      {/* body */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, pt: 2.5, pb: 3 }}>
        <Stack spacing={1.4} sx={{ mb: 3 }}>
          {[
            [LocationOnOutlinedIcon, lounge.address],
            [AccessTimeIcon, lounge.hours],
            [PhoneIcon, lounge.phone],
          ].map(([Icon, text]) => (
            <Stack key={text} direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
              <Icon sx={{ fontSize: 16, color: tokens.gold, mt: "1px", flexShrink: 0 }} />
              <Typography sx={{ fontSize: 12.5, color: tokens.textMuted, lineHeight: 1.55 }}>
                {text}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint, mb: 1.2 }}>
          AMENITIES
        </Typography>
        <Stack direction="row" sx={{ mb: 3, gap: 0.9, flexWrap: "wrap" }}>
          {lounge.amenities.map((a) => (
            <Tag key={a} label={a} strong />
          ))}
        </Stack>

        {lounge.events.length > 0 && (
          <>
            <Stack direction="row" spacing={0.9} sx={{ mb: 1.2, alignItems: "center" }}>
              <EventIcon sx={{ fontSize: 14, color: tokens.gold }} />
              <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint }}>
                WHAT'S ON
              </Typography>
            </Stack>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {lounge.events.map((event) => (
                <Box
                  key={event}
                  sx={{
                    px: 1.8,
                    py: 1.2,
                    borderRadius: 2.5,
                    bgcolor: tokens.surfaceHi,
                    borderLeft: `2px solid ${tokens.gold}`,
                  }}
                >
                  <Typography sx={{ fontSize: 12.5, color: tokens.text }}>
                    {event}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}

        {/* what they carry */}
        <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint, mb: 1.2 }}>
          IN THE HUMIDOR · {stock.length}
        </Typography>
        <Stack spacing={0.8} sx={{ mb: 1.5 }}>
          {stock.map((c) => (
            <Stack key={c.id} direction="row" spacing={1.4} sx={{ alignItems: "center", px: 1.4, py: 1, borderRadius: 2.5, bgcolor: tokens.surface, border: `1px solid ${tokens.line}` }}
            >
              <Box
                component="img"
                src={c.image}
                alt=""
                loading="lazy"
                sx={{ width: 38, height: 38, borderRadius: 1.5, objectFit: "cover", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography noWrap sx={{ fontSize: 12.5, fontWeight: 600 }}>
                  {c.name}
                </Typography>
                <Typography sx={{ fontSize: 11, color: tokens.textFaint }}>
                  {c.wrapper} · {c.strength}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: tokens.serif, fontSize: 14, color: tokens.goldPale }}>
                {c.price}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Typography sx={{ fontSize: 11, color: tokens.textFaint, mb: 3 }}>
          Ask staff for current availability.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => setView("checkin")}
          sx={{ py: 1.8, borderRadius: 3, fontSize: 15 }}
        >
          Check in here
        </Button>
      </Box>
    </Box>
  );
}
