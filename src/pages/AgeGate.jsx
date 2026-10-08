import { useState } from "react";
import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { LogoMark } from "../components/Logo";
import { MINIMUM_AGE, ageOn, parseDob } from "../utils/age";
import { tokens } from "../theme";

/**
 * Tobacco age gate. Stands in front of everything — onboarding included —
 * and a pass is remembered on the device so it is asked once, not daily.
 *
 * A refusal is deliberately not stored: a mistyped year should not lock
 * somebody out of the app permanently.
 */
export default function AgeGate({ onPass, onBlock }) {
  const [dob, setDob] = useState("");
  const [blocked, setBlocked] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const submit = () => {
    const parsed = parseDob(dob);
    if (!parsed) return;
    const age = ageOn(parsed);
    if (age >= MINIMUM_AGE) {
      onPass(age);
    } else {
      setBlocked(true);
      onBlock?.(age);
    }
  };

  if (blocked) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 4,
        }}
      >
        <LogoMark size={40} />
        <Typography variant="h5" sx={{ fontSize: 24, mt: 3.5 }}>
          Come back when you're {MINIMUM_AGE}.
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 13.5, mt: 1.4, lineHeight: 1.7 }}>
          Humidor Connect is for adults of legal smoking age. Thanks for
          stopping by.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 4,
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack sx={{ alignItems: "center" }}>
          <LogoMark size={46} />
        </Stack>

        <Typography variant="h5" sx={{ fontSize: 25, mt: 3.5, lineHeight: 1.3 }}>
          Are you {MINIMUM_AGE} or older?
        </Typography>
        <Typography sx={{ color: tokens.textMuted, fontSize: 13.5, mt: 1.2, lineHeight: 1.7 }}>
          Enter your date of birth to continue.
        </Typography>

        <TextField
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          fullWidth
          inputProps={{ max: today, "aria-label": "Date of birth" }}
          sx={{ mt: 3.5 }}
        />

        <Button
          fullWidth
          variant="contained"
          disabled={!dob}
          onClick={submit}
          sx={{
            mt: 2.5,
            py: 1.7,
            borderRadius: 3,
            fontSize: 15,
            "&.Mui-disabled": { bgcolor: tokens.lineSoft, color: tokens.textFaint },
          }}
        >
          Enter
        </Button>

        <Typography sx={{ fontSize: 11, color: tokens.textFaint, mt: 2.5, lineHeight: 1.6 }}>
          We keep this on your device and never send it anywhere.
        </Typography>
      </motion.div>
    </Box>
  );
}
