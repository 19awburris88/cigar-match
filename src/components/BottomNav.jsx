import { Box, ButtonBase, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";

const TABS = [
  { id: "swipe", label: "Discover", Icon: LocalFireDepartmentIcon },
  { id: "lounges", label: "Lounges", Icon: LocationOnIcon },
  { id: "humidor", label: "Humidor", Icon: Inventory2Icon },
  { id: "profile", label: "Profile", Icon: PersonIcon },
];

export default function BottomNav({ view, setView }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        bgcolor: "#0d0d0d",
        borderTop: "1px solid #1e1e1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = view === id;
        return (
          <ButtonBase
            key={id}
            onClick={() => setView(id)}
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.4,
              color: active ? "#D4AF37" : "#444",
              transition: "color 0.2s",
            }}
          >
            <Icon
              sx={{
                fontSize: 22,
                color: active ? "#D4AF37" : "#444",
                transition: "color 0.2s",
              }}
            />
            <Typography
              fontSize={10}
              fontWeight={active ? "bold" : "normal"}
              color={active ? "#D4AF37" : "#444"}
              sx={{ transition: "color 0.2s", letterSpacing: 0.5 }}
            >
              {label}
            </Typography>
            {active && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: 28,
                  height: 2,
                  bgcolor: "#D4AF37",
                  borderRadius: "2px 2px 0 0",
                }}
              />
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
