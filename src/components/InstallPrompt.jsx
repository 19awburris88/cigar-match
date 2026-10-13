import { useState, useEffect, useSyncExternalStore } from "react";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import { subscribe, canPromptNatively, promptInstall, isStandalone, isIOS } from "../utils/install";
import { read, write } from "../utils/storage";
import { track } from "../utils/events";
import { tokens } from "../theme";

/**
 * Dismissible nudge to put the app on the home screen.
 *
 * Only shown once someone has a profile — asking a stranger to install
 * before they have seen anything is how banners get ignored. A dismissal
 * is remembered, so it is asked once, not every session.
 */
export default function InstallPrompt() {
  const nativeReady = useSyncExternalStore(subscribe, canPromptNatively, () => false);
  const [dismissed, setDismissed] = useState(() => read("installDismissed", false));
  const [showIosSteps, setShowIosSteps] = useState(false);

  const ios = isIOS();
  const visible = !isStandalone() && !dismissed && (nativeReady || ios);

  useEffect(() => {
    if (visible) track("install_prompt_shown", { platform: ios ? "ios" : "android" });
  }, [visible, ios]);

  const dismiss = () => {
    track("install_prompt_dismissed", { platform: ios ? "ios" : "android" });
    write("installDismissed", true);
    setDismissed(true);
  };

  const install = async () => {
    if (ios) {
      setShowIosSteps((open) => !open);
      track("install_ios_steps_opened");
      return;
    }
    const outcome = await promptInstall();
    track("install_prompt_result", { outcome });
    if (outcome === "accepted") setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", left: 12, right: 12, bottom: 84, zIndex: 15 }}
        >
          <Box
            sx={{
              px: 1.8,
              py: 1.5,
              borderRadius: "16px",
              bgcolor: tokens.surface,
              border: `1px solid ${tokens.line}`,
              boxShadow: "0 10px 30px rgba(19,18,16,0.16)",
            }}
          >
            <Stack direction="row" spacing={1.4} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  bgcolor: tokens.copper,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <AddToHomeScreenIcon sx={{ fontSize: 18, color: tokens.cream }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                  Keep it on your home screen
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: tokens.textFaint, mt: 0.2 }}>
                  Opens full screen, works offline
                </Typography>
              </Box>

              <Button
                onClick={install}
                variant="contained"
                sx={{ flexShrink: 0, px: 1.8, py: 0.7, borderRadius: 2, fontSize: 12.5 }}
              >
                {ios ? "How" : "Install"}
              </Button>

              <IconButton onClick={dismiss} aria-label="Dismiss" sx={{ color: tokens.textFaint, p: 0.4 }}>
                <CloseIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Stack>

            {ios && showIosSteps && (
              <Stack
                direction="row"
                spacing={0.8}
                sx={{ mt: 1.4, pt: 1.4, borderTop: `1px solid ${tokens.lineSoft}`, alignItems: "center" }}
              >
                <IosShareIcon sx={{ fontSize: 16, color: tokens.copper, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 11.5, color: tokens.textMuted, lineHeight: 1.5 }}>
                  Tap the Share button in Safari, then <strong>Add to Home Screen</strong>.
                </Typography>
              </Stack>
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
