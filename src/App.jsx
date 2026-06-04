import { useState } from "react";
import { Box } from "@mui/material";
import Onboarding from "./pages/Onboarding";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";
import CheckIn from "./pages/CheckIn";
import Lounges from "./pages/Lounges";
import Humidor from "./pages/Humidor";
import BottomNav from "./components/BottomNav";

const MAIN_VIEWS = ["swipe", "lounges", "humidor", "profile"];

function App() {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState([]);
  const [humidor, setHumidor] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [view, setView] = useState("swipe");

  if (!user) {
    return (
      <Box
        sx={{
          maxWidth: 420,
          margin: "0 auto",
          height: "100vh",
          bgcolor: "#0b0b0b",
          overflow: "hidden",
        }}
      >
        <Onboarding setUser={setUser} />
      </Box>
    );
  }

  const isMainView = MAIN_VIEWS.includes(view);

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
    lounges: (
      <Lounges
        setView={setView}
      />
    ),
    humidor: (
      <Humidor
        humidor={humidor}
        setHumidor={setHumidor}
      />
    ),
    profile: (
      <Profile
        user={user}
        liked={liked}
      />
    ),
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "0 auto",
        height: "100vh",
        bgcolor: "#0b0b0b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isMainView ? (
        <>
          <Box sx={{ height: "calc(100% - 70px)", overflowY: "auto" }}>
            {pages[view]}
          </Box>
          <BottomNav view={view} setView={setView} />
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
    </Box>
  );
}

export default App;
