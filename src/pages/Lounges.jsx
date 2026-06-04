import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import lounges from "../data/lounges";

export default function Lounges({ setView }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <LoungeDetail
        lounge={selected}
        onBack={() => setSelected(null)}
        setView={setView}
      />
    );
  }

  return (
    <Box sx={{ height: "100%", color: "#fff", px: 2, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={0.5}>
        Cigar Lounges
      </Typography>
      <Typography color="gray" fontSize={13} mb={3}>
        Dallas–Fort Worth Area
      </Typography>

      <Stack spacing={2}>
        {lounges.map((lounge) => (
          <Card
            key={lounge.id}
            sx={{
              bgcolor: "#111",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #1e1e1e",
              cursor: "pointer",
            }}
            onClick={() => setSelected(lounge)}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={lounge.image}
                alt={lounge.name}
                style={{
                  width: "100%",
                  height: 130,
                  objectFit: "cover",
                  filter: "brightness(0.65)",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: "#D4AF37",
                  px: 1.2,
                  py: 0.3,
                  borderRadius: 1.5,
                }}
              >
                <Typography fontSize={12} fontWeight="bold" color="#000">
                  ★ {lounge.rating}
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography fontWeight="bold" fontSize={15}>
                    {lounge.name}
                  </Typography>
                  <Typography fontSize={12} color="gray" mt={0.2}>
                    {lounge.city}, {lounge.state}  •  {lounge.reviews} reviews
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap={0.8} mt={1.5}>
                {lounge.amenities.slice(0, 3).map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    size="small"
                    sx={{ bgcolor: "#1a1a1a", color: "#888", fontSize: 10, height: 22 }}
                  />
                ))}
                {lounge.amenities.length > 3 && (
                  <Chip
                    label={`+${lounge.amenities.length - 3}`}
                    size="small"
                    sx={{ bgcolor: "#1a1a1a", color: "#555", fontSize: 10, height: 22 }}
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

function LoungeDetail({ lounge, onBack, setView }) {
  return (
    <Box sx={{ height: "100%", color: "#fff" }}>
      {/* HERO */}
      <Box sx={{ position: "relative" }}>
        <img
          src={lounge.image}
          alt={lounge.name}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            filter: "brightness(0.55)",
            display: "block",
          }}
        />
        <IconButton
          onClick={onBack}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(0,0,0,0.55)",
            color: "#fff",
            width: 36,
            height: 36,
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
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
          <Typography fontSize={13} fontWeight="bold" color="#000">
            ★ {lounge.rating}
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 12, overflowY: "auto", height: "calc(100% - 200px)" }}>
        <Typography variant="h5" fontWeight="bold">
          {lounge.name}
        </Typography>
        <Typography fontSize={13} color="gray" mt={0.3} mb={2}>
          {lounge.reviews} reviews
        </Typography>

        {/* INFO ROWS */}
        <Stack spacing={1.2} mb={3}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <LocationOnIcon sx={{ fontSize: 16, color: "#D4AF37" }} />
            <Typography fontSize={13} color="#ccc">{lounge.address}</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 16, color: "#D4AF37" }} />
            <Typography fontSize={13} color="#ccc">{lounge.hours}</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <PhoneIcon sx={{ fontSize: 16, color: "#D4AF37" }} />
            <Typography fontSize={13} color="#ccc">{lounge.phone}</Typography>
          </Stack>
        </Stack>

        {/* AMENITIES */}
        <Typography fontWeight="bold" mb={1.2}>
          Amenities
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
          {lounge.amenities.map((a) => (
            <Chip
              key={a}
              label={a}
              sx={{
                bgcolor: "#1a1a1a",
                color: "#D4AF37",
                border: "1px solid #2a2a2a",
                fontSize: 12,
              }}
            />
          ))}
        </Stack>

        {/* EVENTS */}
        {lounge.events.length > 0 && (
          <>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.2}>
              <EventIcon sx={{ fontSize: 16, color: "#D4AF37" }} />
              <Typography fontWeight="bold">Events</Typography>
            </Stack>
            <Stack spacing={1} mb={3}>
              {lounge.events.map((event) => (
                <Box
                  key={event}
                  sx={{
                    bgcolor: "#1a1a1a",
                    px: 2,
                    py: 1.2,
                    borderRadius: 2,
                    borderLeft: "3px solid #D4AF37",
                  }}
                >
                  <Typography fontSize={13} color="#ccc">{event}</Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}

        {/* HUMIDOR */}
        <Typography fontWeight="bold" mb={1}>
          In the Humidor — {lounge.inventory.length} cigars
        </Typography>
        <Typography fontSize={12} color="gray" mb={3}>
          Ask staff for current availability
        </Typography>

        {/* CHECK IN */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => setView("checkin")}
          sx={{
            bgcolor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
            py: 1.8,
            borderRadius: 3,
            fontSize: 15,
            letterSpacing: 0.5,
            "&:hover": { bgcolor: "#c5a030" },
          }}
        >
          Check In Here
        </Button>
      </Box>
    </Box>
  );
}
