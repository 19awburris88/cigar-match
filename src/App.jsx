import { useState } from "react";
import { Box } from "@mui/material";
import Onboarding from "./pages/Onboarding";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";
import CheckIn from "./pages/CheckIn";
import Lounges from "./pages/Lounges";
import Humidor from "./pages/Humidor";
import BottomNav from "./components/BottomNav";
import { tokens } from "./theme";

const MAIN_VIEWS = ["swipe", "lounges", "humidor", "profile"];

/** Phone-shaped frame the whole app lives inside. */
function Shell({ children }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "stretch", sm: "center" },
        py: { xs: 0, sm: 3 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: 430,
          height: { xs: "100%", sm: "min(920px, 100%)" },
          bgcolor: tokens.bg,
          color: tokens.text,
          borderRadius: { xs: 0, sm: "28px" },
          border: { xs: "none", sm: `1px solid ${tokens.line}` },
          boxShadow: { xs: "none", sm: "0 30px 90px rgba(0,0,0,0.7)" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState([]);
  const [humidor, setHumidor] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [view, setView] = useState("swipe");

  if (!user) {
    return (
      <Shell>
        <Onboarding setUser={setUser} />
      </Shell>
    );
  }

  const pages = {
    swipe: (
      <Swipe
        user={user}
        liked={liked}
        setLiked={setLiked}
        humidor={humidor}
        setHumidor={setHumidor}
        setView={setView}
      />
    ),
    lounges: <Lounges setView={setView} />,
    humidor: <Humidor humidor={humidor} setHumidor={setHumidor} setView={setView} />,
    profile: (
      <Profile
        user={user}
        liked={liked}
        humidor={humidor}
        setHumidor={setHumidor}
        setView={setView}
      />
    ),
  };

  return (
    <Shell>
      {MAIN_VIEWS.includes(view) ? (
        <>
          <Box sx={{ height: "calc(100% - 72px)", overflow: "hidden" }}>{pages[view]}</Box>
          <BottomNav view={view} setView={setView} humidorCount={humidor.length} />
        </>
      ) : (
        <CheckIn
          user={user}
          liked={liked}
          checkins={checkins}
          setCheckins={setCheckins}
          setView={setView}
        />
      )}
    </Shell>
  );
}

export default App;
