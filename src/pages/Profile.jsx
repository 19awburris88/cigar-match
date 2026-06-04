import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { getTasteProfile } from "../utils/analytics";
import { getPairing } from "../utils/pairing";

const EXPERIENCE_COLOR = {
  Beginner: "#4caf50",
  Intermediate: "#ff9800",
  Advanced: "#f44336",
  Aficionado: "#D4AF37",
};

function StatBar({ label, percent }) {
  return (
    <Box mb={1}>
      <Stack direction="row" justifyContent="space-between" mb={0.4}>
        <Typography fontSize={13} color="#ccc">{label}</Typography>
        <Typography fontSize={12} color="#D4AF37">{percent}%</Typography>
      </Stack>
      <Box sx={{ height: 5, bgcolor: "#222", borderRadius: 5 }}>
        <Box
          sx={{
            width: `${percent}%`,
            height: "100%",
            bgcolor: "#D4AF37",
            borderRadius: 5,
            transition: "width 0.6s ease",
          }}
        />
      </Box>
    </Box>
  );
}

export default function Profile({ user, liked }) {
  const profile = getTasteProfile(liked);

  const samplePairings =
    liked.length > 0
      ? [...new Set(liked.map((c) => getPairing(c).drink))].slice(0, 4)
      : user.pairings?.slice(0, 4) ?? [];

  return (
    <Box sx={{ height: "100%", color: "#fff", overflowY: "auto", pb: 3 }}>
      {/* USER HEADER */}
      <Box
        sx={{
          px: 2.5,
          pt: 4,
          pb: 3,
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.name || "Cigar Lover"}
            </Typography>
            <Typography color="gray" fontSize={13} mt={0.3}>
              {user.strength} · {user.wrapper} Wrapper
            </Typography>
          </Box>
          {user.experience && (
            <Chip
              label={user.experience}
              size="small"
              sx={{
                bgcolor: "transparent",
                color: EXPERIENCE_COLOR[user.experience] || "#D4AF37",
                border: `1px solid ${EXPERIENCE_COLOR[user.experience] || "#D4AF37"}`,
                fontWeight: "bold",
                fontSize: 11,
              }}
            />
          )}
        </Stack>

        {/* PAIRING PREFERENCES */}
        {samplePairings.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.8} mt={2}>
            {samplePairings.map((p) => (
              <Chip
                key={p}
                label={p}
                size="small"
                sx={{
                  bgcolor: "#1a1a1a",
                  color: "#aaa",
                  border: "1px solid #2a2a2a",
                  fontSize: 11,
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      <Box sx={{ px: 2.5, pt: 3 }}>
        {/* TASTE PROFILE */}
        {profile ? (
          <Box
            sx={{
              bgcolor: "#111",
              p: 2.5,
              borderRadius: 4,
              mb: 3,
              border: "1px solid #1e1e1e",
            }}
          >
            <Typography
              fontWeight="bold"
              color="#D4AF37"
              mb={2}
              fontSize={15}
            >
              Taste Profile — {profile.total} liked
            </Typography>

            {/* STRENGTH */}
            <Typography fontWeight="bold" fontSize={12} color="#666" letterSpacing={1} mb={1}>
              STRENGTH
            </Typography>
            {profile.topStrength.map((item) => (
              <StatBar key={item.label} label={item.label} percent={item.percent} />
            ))}

            {/* WRAPPER */}
            <Typography fontWeight="bold" fontSize={12} color="#666" letterSpacing={1} mt={2.5} mb={1}>
              WRAPPER
            </Typography>
            {profile.topWrapper.map((item) => (
              <StatBar key={item.label} label={item.label} percent={item.percent} />
            ))}

            {/* FLAVORS */}
            <Typography fontWeight="bold" fontSize={12} color="#666" letterSpacing={1} mt={2.5} mb={1}>
              TOP FLAVORS
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} mt={0.5}>
              {profile.topFlavors.map((flavor) => (
                <Chip
                  key={flavor}
                  label={flavor}
                  size="small"
                  sx={{
                    bgcolor: "#1a1a1a",
                    color: "#D4AF37",
                    border: "1px solid #2a2a2a",
                    fontSize: 12,
                  }}
                />
              ))}
            </Stack>
          </Box>
        ) : (
          <Box
            sx={{
              bgcolor: "#111",
              p: 2.5,
              borderRadius: 4,
              mb: 3,
              border: "1px solid #1e1e1e",
              textAlign: "center",
            }}
          >
            <Typography color="gray" fontSize={14}>
              Start swiping to build your taste profile
            </Typography>
          </Box>
        )}

        {/* LIKED CIGARS */}
        <Typography fontWeight="bold" fontSize={15} mb={2}>
          Liked Cigars
          {liked.length > 0 && (
            <Typography component="span" color="gray" fontSize={13} ml={1}>
              ({liked.length})
            </Typography>
          )}
        </Typography>

        {liked.length === 0 ? (
          <Typography color="gray" fontSize={14} textAlign="center" mt={2}>
            No likes yet — head to Discover
          </Typography>
        ) : (
          <Grid container spacing={1.5}>
            {liked.map((cigar) => (
              <Grid item xs={6} key={cigar.id}>
                <Card
                  sx={{
                    bgcolor: "#111",
                    color: "#fff",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid #1e1e1e",
                  }}
                >
                  <img
                    src={cigar.image}
                    alt={cigar.name}
                    style={{
                      width: "100%",
                      height: 100,
                      objectFit: "cover",
                      filter: "brightness(0.8)",
                      display: "block",
                    }}
                  />
                  <CardContent sx={{ p: 1.2, "&:last-child": { pb: 1.2 } }}>
                    <Typography fontSize={12} fontWeight="bold" noWrap>
                      {cigar.name}
                    </Typography>
                    <Typography fontSize={11} sx={{ color: "#D4AF37" }} mt={0.2}>
                      {cigar.brand}
                    </Typography>
                    <Typography fontSize={10} color="gray" mt={0.2}>
                      {cigar.wrapper} · {cigar.strength}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
