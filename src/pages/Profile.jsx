import { Box, Typography, Stack, Chip, Button, ButtonBase } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckIcon from "@mui/icons-material/Check";
import cigars from "../data/cigars";
import { getTasteProfile } from "../utils/analytics";
import { getPairing } from "../utils/pairing";
import { rankCigars } from "../utils/recommend";
import { topReason } from "../utils/reasons";
import { asList, listSummary } from "../utils/prefs";
import CigarTile from "../components/CigarTile";
import { tokens } from "../theme";

const EXPERIENCE_COLOR = {
  Beginner: "#7BAE7F",
  Intermediate: "#D9A441",
  Advanced: "#D2703A",
  Aficionado: tokens.gold,
};

function StatBar({ label, percent }) {
  return (
    <Box sx={{ mb: 1.1 }}>
      <Stack direction="row" sx={{ mb: 0.5, justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 12.5, color: tokens.text }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: tokens.gold }}>
          {percent}%
        </Typography>
      </Stack>
      <Box sx={{ height: 4, borderRadius: 4, bgcolor: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <Box
          sx={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: 4,
            background: `linear-gradient(90deg, #8E6F1C, ${tokens.gold})`,
            transition: "width .6s ease",
          }}
        />
      </Box>
    </Box>
  );
}

function SectionLabel({ children, mt = 0 }) {
  return (
    <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.6, color: tokens.textFaint, mt: mt, mb: 1.2 }}>
      {children}
    </Typography>
  );
}

function Suggestion({ cigar, reason, inHumidor, onAdd }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        p: 1.4,
        borderRadius: "16px",
        bgcolor: tokens.surface,
        border: `1px solid ${tokens.line}`,
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={cigar.image}
        alt=""
        loading="lazy"
        sx={{ width: 52, height: 52, borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, color: tokens.gold }} noWrap>
          {cigar.brand.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, mt: 0.2 }} noWrap>
          {cigar.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: tokens.textMuted, mt: 0.3, lineHeight: 1.45 }}>
          {reason}
        </Typography>
      </Box>

      <ButtonBase
        onClick={onAdd}
        disabled={inHumidor}
        aria-label={inHumidor ? "Already in your humidor" : `Add ${cigar.name} to humidor`}
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          flexShrink: 0,
          border: `1px solid ${inHumidor ? tokens.gold : tokens.line}`,
          bgcolor: inHumidor ? tokens.gold : "transparent",
          color: inHumidor ? "#0A0908" : tokens.textMuted,
          "&:hover": { borderColor: tokens.gold, color: inHumidor ? "#0A0908" : tokens.gold },
        }}
      >
        {inHumidor ? <CheckIcon sx={{ fontSize: 16 }} /> : <Inventory2OutlinedIcon sx={{ fontSize: 16 }} />}
      </ButtonBase>
    </Stack>
  );
}

function Panel({ children }) {
  return (
    <Box sx={{ p: 2.2, borderRadius: "18px", bgcolor: tokens.surface, border: `1px solid ${tokens.line}`, mb: 2.5 }}>
      {children}
    </Box>
  );
}

export default function Profile({ user, liked, humidor = [], setHumidor, setView }) {
  const profile = getTasteProfile(liked);

  // Same engine that drives the deck, so suggestions stay consistent with it.
  const suggestions = rankCigars(cigars, user, liked).slice(0, 3);

  const pairings =
    liked.length > 0
      ? [...new Set(liked.map((c) => getPairing(c).drink))].slice(0, 4)
      : asList(user.pairings).slice(0, 4);

  const stats = [
    { label: "Liked", value: liked.length },
    { label: "Humidor", value: humidor.length },
    { label: "Notes", value: profile ? profile.topFlavors.length : asList(user.flavors).length },
  ];

  return (
    <Box sx={{ height: "100%", overflowY: "auto", pb: 3 }}>
      {/* header */}
      <Box sx={{ px: 2.5, pt: 4, pb: 2.5, borderBottom: `1px solid ${tokens.line}` }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ fontSize: 28 }}>
              {user.name || "Cigar Lover"}
            </Typography>
            <Typography sx={{ color: tokens.textMuted, fontSize: 12.5, mt: 0.5, lineHeight: 1.6 }}>
              {listSummary(user.strength)} · {listSummary(user.wrapper)}
            </Typography>
          </Box>
          {user.experience && (
            <Chip
              label={user.experience}
              size="small"
              sx={{
                flexShrink: 0,
                bgcolor: "transparent",
                color: EXPERIENCE_COLOR[user.experience] || tokens.gold,
                border: `1px solid ${EXPERIENCE_COLOR[user.experience] || tokens.gold}`,
                fontWeight: 700,
                fontSize: 10.5,
                letterSpacing: 0.4,
              }}
            />
          )}
        </Stack>

        {/* counters */}
        <Stack direction="row" spacing={3} sx={{ mt: 2.5 }}>
          {stats.map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontFamily: tokens.serif, fontSize: 24, fontWeight: 600, color: tokens.goldPale, lineHeight: 1 }}>
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: 9.5, letterSpacing: 1.2, color: tokens.textFaint, mt: 0.5 }}>
                {s.label.toUpperCase()}
              </Typography>
            </Box>
          ))}
        </Stack>

        {pairings.length > 0 && (
          <Stack direction="row" sx={{ mt: 2.5, gap: 0.8, flexWrap: "wrap" }}>
            {pairings.map((p) => (
              <Box
                key={p}
                sx={{
                  px: 1.2,
                  py: 0.5,
                  borderRadius: 999,
                  border: `1px solid ${tokens.line}`,
                  fontSize: 11,
                  color: tokens.textMuted,
                }}
              >
                {p}
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Box sx={{ px: 2.5, pt: 3 }}>
        {/* What to smoke next — ranked by the same engine that builds the deck */}
        {suggestions.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1.5 }}
            >
              <Typography variant="h6" sx={{ fontSize: 17 }}>
                Suggested for you
              </Typography>
              <Typography sx={{ fontSize: 11, color: tokens.textFaint }}>
                {liked.length > 0 ? `from ${liked.length} like${liked.length !== 1 ? "s" : ""}` : "from your setup"}
              </Typography>
            </Stack>

            <Stack spacing={1.2}>
              {suggestions.map((cigar) => (
                <Suggestion
                  key={cigar.id}
                  cigar={cigar}
                  reason={topReason(cigar, user, liked)}
                  inHumidor={humidor.some((c) => c.id === cigar.id)}
                  onAdd={() => setHumidor?.((h) => (h.some((c) => c.id === cigar.id) ? h : [...h, cigar]))}
                />
              ))}
            </Stack>

            <Button
              fullWidth
              onClick={() => setView?.("swipe")}
              sx={{
                mt: 1.2,
                py: 1.2,
                borderRadius: 2.5,
                border: `1px solid ${tokens.line}`,
                color: tokens.gold,
                fontSize: 13,
                "&:hover": { borderColor: tokens.gold, bgcolor: "rgba(212,175,55,0.06)" },
              }}
            >
              Keep discovering
            </Button>
          </Box>
        )}

        {profile ? (
          <Panel>
            <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography variant="h6" sx={{ fontSize: 17, color: tokens.goldPale }}>
                Taste Profile
              </Typography>
              <Typography sx={{ fontSize: 11, color: tokens.textFaint }}>
                from {profile.total} like{profile.total !== 1 ? "s" : ""}
              </Typography>
            </Stack>

            <SectionLabel>STRENGTH</SectionLabel>
            {profile.topStrength.map((item) => (
              <StatBar key={item.label} {...item} />
            ))}

            <SectionLabel mt={2.5}>WRAPPER</SectionLabel>
            {profile.topWrapper.map((item) => (
              <StatBar key={item.label} {...item} />
            ))}

            <SectionLabel mt={2.5}>TOP NOTES</SectionLabel>
            <Stack direction="row" sx={{ gap: 0.9, flexWrap: "wrap" }}>
              {profile.topFlavors.map((flavor) => (
                <Box
                  key={flavor}
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
                  {flavor}
                </Box>
              ))}
            </Stack>
          </Panel>
        ) : (
          <Panel>
            <Typography sx={{ color: tokens.textMuted, fontSize: 13, py: 1, textAlign: "center", lineHeight: 1.7 }}>
              Swipe a few cigars and your taste profile builds itself here.
            </Typography>
          </Panel>
        )}

        <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "baseline" }}>
          <Typography variant="h6" sx={{ fontSize: 17 }}>
            Liked Cigars
          </Typography>
          {liked.length > 0 && (
            <Typography sx={{ fontSize: 12, color: tokens.textFaint }}>
              {liked.length}
            </Typography>
          )}
        </Stack>

        {liked.length === 0 ? (
          <Typography sx={{ color: tokens.textFaint, fontSize: 13, mt: 3, textAlign: "center" }}>
            Nothing liked yet — head to Discover.
          </Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            {liked.map((cigar) => (
              <CigarTile key={cigar.id} cigar={cigar} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
