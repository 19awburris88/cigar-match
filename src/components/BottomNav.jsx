import { Box, ButtonBase, Typography } from "@mui/material";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import StyleIcon from "@mui/icons-material/Style";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { tokens } from "../theme";

const TABS = [
  { id: "swipe", label: "Discover", Icon: StyleOutlinedIcon, ActiveIcon: StyleIcon },
  { id: "lounges", label: "Lounges", Icon: LocationOnOutlinedIcon, ActiveIcon: LocationOnIcon },
  { id: "humidor", label: "Humidor", Icon: Inventory2OutlinedIcon, ActiveIcon: Inventory2Icon },
  { id: "profile", label: "Profile", Icon: PersonOutlinedIcon, ActiveIcon: PersonIcon },
];

export default function BottomNav({ view, setView, humidorCount = 0 }) {
  return (
    <Box
      component="nav"
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        display: "flex",
        alignItems: "stretch",
        bgcolor: "rgba(10,9,8,0.88)",
        backdropFilter: "blur(18px)",
        borderTop: `1px solid ${tokens.line}`,
      }}
    >
      {TABS.map(({ id, label, Icon, ActiveIcon }) => {
        const active = view === id;
        const Glyph = active ? ActiveIcon : Icon;
        const badge = id === "humidor" && humidorCount > 0;

        return (
          <ButtonBase
            key={id}
            onClick={() => setView(id)}
            aria-current={active ? "page" : undefined}
            sx={{
              flex: 1,
              flexDirection: "column",
              gap: 0.5,
              position: "relative",
              color: active ? tokens.gold : tokens.textFaint,
              transition: "color .2s",
              "&:hover": { color: active ? tokens.gold : tokens.textMuted },
            }}
          >
            {active && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  width: 26,
                  height: 2,
                  borderRadius: "0 0 3px 3px",
                  bgcolor: tokens.gold,
                  boxShadow: "0 0 12px rgba(212,175,55,0.7)",
                }}
              />
            )}

            <Box sx={{ position: "relative", display: "flex" }}>
              <Glyph sx={{ fontSize: 21 }} />
              {badge && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -3,
                    right: -7,
                    minWidth: 15,
                    height: 15,
                    px: 0.4,
                    borderRadius: 999,
                    bgcolor: tokens.gold,
                    color: "#0A0908",
                    fontSize: 9,
                    fontWeight: 700,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {humidorCount}
                </Box>
              )}
            </Box>

            <Typography sx={{ fontSize: 9.5, fontWeight: active ? 700 : 500, letterSpacing: 0.6, color: "inherit" }}>
              {label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
