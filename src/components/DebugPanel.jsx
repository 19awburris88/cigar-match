import { useState } from "react";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { exportPayload, summarize, clearEvents, deviceId } from "../utils/events";
import { clearAll } from "../utils/storage";
import { tokens } from "../theme";

function Row({ label, value }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", py: 0.55 }}>
      <Typography sx={{ fontSize: 12, color: tokens.textMuted }}>{label}</Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: tokens.text }}>{value}</Typography>
    </Stack>
  );
}

/**
 * Operator-only panel, opened with the #debug hash. It is how session data
 * comes off a phone that has been passed around a lounge — there is no
 * server to send it to.
 *
 * Deliberately not reachable by tapping: a tester poking around the app
 * should never land here.
 */
export default function DebugPanel({ onClose }) {
  const [note, setNote] = useState("");
  const payload = exportPayload();
  const stats = summarize(payload.events);

  const flash = (message) => {
    setNote(message);
    window.setTimeout(() => setNote(""), 2200);
  };

  const copy = async () => {
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      flash("Copied to clipboard");
    } catch {
      // Clipboard needs a secure context and permission; the download always works.
      flash("Clipboard blocked — use Download");
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `humidor-connect-${payload.device.slice(0, 8)}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    flash("Downloaded");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        bgcolor: tokens.bg,
        display: "flex",
        flexDirection: "column",
        px: 2.5,
        pt: 3,
        pb: 3,
        overflowY: "auto",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontSize: 18, flex: 1 }}>
          Session data
        </Typography>
        <IconButton onClick={onClose} aria-label="Close debug panel" sx={{ color: tokens.textMuted }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>

      <Typography sx={{ fontSize: 10.5, color: tokens.textFaint, letterSpacing: 0.4, mb: 2 }}>
        Device {deviceId().slice(0, 8)} · {payload.eventCount} events
      </Typography>

      <Box sx={{ p: 2, borderRadius: "16px", bgcolor: tokens.surface, border: `1px solid ${tokens.line}` }}>
        <Row label="Sessions" value={stats.sessions} />
        <Row label="Onboarding started" value={stats.onboardingStarted} />
        <Row label="Onboarding completed" value={stats.onboardingCompleted} />
        <Row label="Deepest step reached" value={stats.deepestStep} />
        <Row label="Swipes" value={`${stats.swipes}  (${stats.likes}↑ ${stats.passes}↓)`} />
        <Row label="Humidor adds" value={stats.humidorAdds} />
        <Row label="Lounges opened" value={stats.loungesOpened} />
        <Row label="Check-ins" value={stats.checkins} />
      </Box>

      <Stack spacing={1.2} sx={{ mt: 2.5 }}>
        <Button variant="contained" onClick={download} sx={{ py: 1.4, borderRadius: 2.5 }}>
          Download JSON
        </Button>
        <Button
          onClick={copy}
          sx={{ py: 1.3, borderRadius: 2.5, border: `1px solid ${tokens.line}`, color: tokens.copper }}
        >
          Copy to clipboard
        </Button>
      </Stack>

      {note && (
        <Typography sx={{ fontSize: 12, color: tokens.copper, mt: 1.5, textAlign: "center" }}>
          {note}
        </Typography>
      )}

      <Box sx={{ flex: 1 }} />

      <Stack spacing={1.2} sx={{ mt: 3 }}>
        <Button
          onClick={() => {
            clearEvents();
            flash("Event log cleared");
          }}
          sx={{ fontSize: 12.5, color: tokens.textMuted }}
        >
          Clear event log
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("Wipe this device's profile, humidor and events?")) {
              clearAll();
              window.location.reload();
            }
          }}
          sx={{ fontSize: 12.5, color: tokens.textFaint }}
        >
          Reset device for the next tester
        </Button>
      </Stack>
    </Box>
  );
}
