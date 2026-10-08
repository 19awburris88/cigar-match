import { useState, useEffect, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import Onboarding from "./pages/Onboarding";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";
import CheckIn from "./pages/CheckIn";
import Lounges from "./pages/Lounges";
import Humidor from "./pages/Humidor";
import AgeGate from "./pages/AgeGate";
import BottomNav from "./components/BottomNav";
import DebugPanel from "./components/DebugPanel";
import cigars from "./data/cigars";
import { usePersistentState } from "./utils/storage";
import { track, deviceId } from "./utils/events";
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
          boxShadow: { xs: "none", sm: "0 24px 70px rgba(19,18,16,0.22)" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/**
 * Collections are persisted as ids and rehydrated from the catalog on load,
 * never as whole cigar objects. A tester's saved humidor then always reflects
 * the current catalog instead of carrying a stale copy of a blend's details,
 * and anything dropped from the catalog simply disappears.
 */
function useCigarCollection(name) {
  const [ids, setIds] = usePersistentState(name, []);

  const value = useMemo(
    () => ids.map((id) => cigars.find((c) => c.id === id)).filter(Boolean),
    [ids]
  );

  // Children work in cigar objects; only the storage layer knows about ids.
  const setValue = useCallback(
    (updater) =>
      setIds((prevIds) => {
        const prev = prevIds.map((id) => cigars.find((c) => c.id === id)).filter(Boolean);
        const next = typeof updater === "function" ? updater(prev) : updater;
        return next.map((c) => c.id);
      }),
    [setIds]
  );

  return [value, setValue];
}

function App() {
  const [ageOk, setAgeOk] = usePersistentState("ageVerified", false);
  const [user, setUser] = usePersistentState("user", null);
  const [checkins, setCheckins] = usePersistentState("checkins", []);
  const [view, setView] = usePersistentState("view", "swipe");

  const [liked, setLiked] = useCigarCollection("liked");
  const [humidor, setHumidor] = useCigarCollection("humidor");
  const [passed, setPassed] = useCigarCollection("passed");

  const [debugOpen, setDebugOpen] = useState(
    () => typeof window !== "undefined" && window.location.hash === "#debug"
  );

  useEffect(() => {
    deviceId();
    track("session_start", {
      ua: navigator.userAgent.slice(0, 120),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
  }, []);

  // #debug is the operator's way in; nothing in the UI links to it.
  useEffect(() => {
    const onHash = () => setDebugOpen(window.location.hash === "#debug");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const closeDebug = () => {
    window.location.hash = "";
    setDebugOpen(false);
  };

  const changeView = (next) => {
    setView(next);
    track("tab", { view: next });
  };

  const debug = debugOpen ? <DebugPanel onClose={closeDebug} /> : null;

  if (!ageOk) {
    return (
      <Shell>
        <AgeGate
          onPass={(age) => {
            track("age_gate_pass", { age });
            setAgeOk(true);
          }}
          onBlock={(age) => track("age_gate_block", { age })}
        />
        {debug}
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <Onboarding setUser={setUser} />
        {debug}
      </Shell>
    );
  }

  const pages = {
    swipe: (
      <Swipe
        user={user}
        liked={liked}
        setLiked={setLiked}
        passed={passed}
        setPassed={setPassed}
        humidor={humidor}
        setHumidor={setHumidor}
        setView={changeView}
      />
    ),
    lounges: <Lounges setView={changeView} />,
    humidor: <Humidor humidor={humidor} setHumidor={setHumidor} setView={changeView} />,
    profile: (
      <Profile
        user={user}
        liked={liked}
        humidor={humidor}
        setHumidor={setHumidor}
        setView={changeView}
      />
    ),
  };

  return (
    <Shell>
      {MAIN_VIEWS.includes(view) ? (
        <>
          <Box sx={{ height: "calc(100% - 72px)", overflow: "hidden" }}>{pages[view]}</Box>
          <BottomNav view={view} setView={changeView} humidorCount={humidor.length} />
        </>
      ) : (
        <CheckIn
          user={user}
          liked={liked}
          checkins={checkins}
          setCheckins={setCheckins}
          setView={changeView}
        />
      )}
      {debug}
    </Shell>
  );
}

export default App;
