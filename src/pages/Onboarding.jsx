import { useState } from "react";
import { Box, Button, Typography, Stack, TextField, ButtonBase } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo, { LogoMark } from "../components/Logo";
import { tokens } from "../theme";

const EXPERIENCE = [
  { label: "Beginner", hint: "New to it — keep things smooth" },
  { label: "Intermediate", hint: "A regular ritual, still exploring" },
  { label: "Advanced", hint: "I know my wrappers and vitolas" },
  { label: "Aficionado", hint: "Aged boxes and rare releases" },
];

const STRENGTH = [
  { label: "Mild", hint: "Gentle, easy morning smoke" },
  { label: "Mild-Medium", hint: "Soft with a little backbone" },
  { label: "Medium", hint: "The everyday sweet spot" },
  { label: "Medium-Full", hint: "Rich, but still balanced" },
  { label: "Full", hint: "Bold, powerful, after dinner" },
];

const WRAPPER = [
  { label: "Connecticut", hint: "Pale, creamy, mild" },
  { label: "Maduro", hint: "Dark, sweet, cocoa-forward" },
  { label: "Habano", hint: "Spicy and full of character" },
  { label: "Cameroon", hint: "Toasty with a subtle sweetness" },
  { label: "Corojo", hint: "Peppery and assertive" },
  { label: "Natural", hint: "Clean, classic, well-rounded" },
];

const FLAVOR_OPTIONS = [
  "Cocoa", "Coffee", "Espresso", "Pepper", "Cedar", "Sweet",
  "Earth", "Cream", "Nuts", "Leather", "Spice", "Vanilla",
  "Toast", "Caramel", "Honey",
];

/**
 * Every house in the catalog, so a brand someone picks here can always be
 * matched by `matchesBrand`. Big names first, then the boutique shelf.
 */
const BRAND_OPTIONS = [
  "Padron", "Arturo Fuente", "My Father", "Oliva",
  "Rocky Patel", "Drew Estate", "Cohiba", "Romeo y Julieta",
  "Davidoff", "Montecristo",
  "Atabey", "Foundation", "Crux", "Principle", "Definition",
  "Gran Habano", "Luciano", "La Palina", "Bandolero", "Warped",
  "Aganorsa Leaf", "Illusione", "RoMa Craft", "Dunbarton",
];

const PAIRING_OPTIONS = [
  "Bourbon", "Scotch", "Rum", "Coffee", "Espresso", "Beer", "Red Wine", "Tequila",
];

/* ————— building blocks ————— */

function OptionRow({ label, hint, selected, multi, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        justifyContent: "flex-start",
        textAlign: "left",
        px: 2,
        py: 1.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: selected ? tokens.gold : tokens.line,
        bgcolor: selected ? "rgba(212,175,55,0.09)" : tokens.surface,
        transition: "border-color .18s, background-color .18s",
        "&:hover": { borderColor: selected ? tokens.gold : "rgba(212,175,55,0.35)" },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: selected ? tokens.goldPale : tokens.text }}>
          {label}
        </Typography>
        {hint && (
          <Typography sx={{ fontSize: 12, color: tokens.textFaint, mt: 0.2 }}>
            {hint}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          ml: 1.5,
          width: 22,
          height: 22,
          flexShrink: 0,
          borderRadius: multi ? "6px" : "50%",
          border: "1px solid",
          borderColor: selected ? tokens.gold : "rgba(255,255,255,0.16)",
          bgcolor: selected ? tokens.gold : "transparent",
          display: "grid",
          placeItems: "center",
          transition: "all .18s",
        }}
      >
        {selected && <CheckIcon sx={{ fontSize: 15, color: "#0A0908" }} />}
      </Box>
    </ButtonBase>
  );
}

function TokenChip({ label, selected, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        px: 1.8,
        py: 1,
        borderRadius: 999,
        border: "1px solid",
        borderColor: selected ? tokens.gold : tokens.line,
        bgcolor: selected ? tokens.gold : tokens.surface,
        color: selected ? "#0A0908" : tokens.textMuted,
        fontSize: 13,
        fontWeight: selected ? 700 : 500,
        transition: "all .18s",
        "&:hover": { borderColor: "rgba(212,175,55,0.5)" },
      }}
    >
      {label}
    </ButtonBase>
  );
}

function StepHeading({ title, sub, count }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography variant="h5" sx={{ fontSize: 26, color: tokens.text }}>
        {title}
      </Typography>
      {/* One flowing line so a long hint plus the counter never breaks badly */}
      <Typography sx={{ fontSize: 13, color: tokens.textMuted, mt: 0.6, lineHeight: 1.5 }}>
        {sub}
        {count > 0 && (
          <Typography component="span" sx={{ fontSize: 12.5, fontWeight: 700, color: tokens.gold, ml: 0.8 }}>
            · {count} selected
          </Typography>
        )}
      </Typography>
    </Box>
  );
}

/* ————— screen ————— */

export default function Onboarding({ setUser }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    experience: "",
    strength: [],
    wrapper: [],
    flavors: [],
    brands: [],
    pairings: [],
  });

  const toggle = (field, value) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));

  const steps = [
    {
      key: "name",
      valid: form.name.trim().length > 0,
      render: () => (
        <>
          <StepHeading title="What should we call you?" sub="We'll personalize your whole experience" />
          <TextField
            fullWidth
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && form.name.trim() && setStep(1)}
            autoFocus
            slotProps={{ input: { sx: { fontSize: 16, py: 0.4 } } }}
          />
        </>
      ),
    },
    {
      key: "experience",
      valid: form.experience !== "",
      render: () => (
        <>
          <StepHeading title="How far along are you?" sub="Helps us calibrate recommendations" />
          <Stack spacing={1.2}>
            {EXPERIENCE.map((o) => (
              <OptionRow
                key={o.label}
                {...o}
                selected={form.experience === o.label}
                onClick={() => setForm((f) => ({ ...f, experience: o.label }))}
              />
            ))}
          </Stack>
        </>
      ),
    },
    {
      key: "strength",
      valid: form.strength.length > 0,
      render: () => (
        <>
          <StepHeading
            title="Which strengths do you reach for?"
            sub="Pick as many as you like"
            count={form.strength.length}
          />
          <Stack spacing={1.2}>
            {STRENGTH.map((o) => (
              <OptionRow
                key={o.label}
                {...o}
                multi
                selected={form.strength.includes(o.label)}
                onClick={() => toggle("strength", o.label)}
              />
            ))}
          </Stack>
        </>
      ),
    },
    {
      key: "wrapper",
      valid: form.wrapper.length > 0,
      render: () => (
        <>
          <StepHeading
            title="Favorite wrappers?"
            sub="The wrapper sets most of the character — pick a few"
            count={form.wrapper.length}
          />
          <Stack spacing={1.2}>
            {WRAPPER.map((o) => (
              <OptionRow
                key={o.label}
                {...o}
                multi
                selected={form.wrapper.includes(o.label)}
                onClick={() => toggle("wrapper", o.label)}
              />
            ))}
          </Stack>
        </>
      ),
    },
    {
      key: "flavors",
      valid: form.flavors.length > 0,
      render: () => (
        <>
          <StepHeading
            title="Which notes do you chase?"
            sub="Select everything you enjoy"
            count={form.flavors.length}
          />
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
            {FLAVOR_OPTIONS.map((o) => (
              <TokenChip key={o} label={o} selected={form.flavors.includes(o)} onClick={() => toggle("flavors", o)} />
            ))}
          </Stack>
        </>
      ),
    },
    {
      key: "brands",
      valid: true,
      render: () => (
        <>
          <StepHeading
            title="Any houses you already love?"
            sub="Optional — skip if you're still exploring"
            count={form.brands.length}
          />
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
            {BRAND_OPTIONS.map((o) => (
              <TokenChip key={o} label={o} selected={form.brands.includes(o)} onClick={() => toggle("brands", o)} />
            ))}
          </Stack>
        </>
      ),
    },
    {
      key: "pairings",
      valid: true,
      render: () => (
        <>
          <StepHeading
            title="What's in your glass?"
            sub="We'll suggest a pairing with every cigar"
            count={form.pairings.length}
          />
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
            {PAIRING_OPTIONS.map((o) => (
              <TokenChip key={o} label={o} selected={form.pairings.includes(o)} onClick={() => toggle("pairings", o)} />
            ))}
          </Stack>
        </>
      ),
    },
  ];

  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;
  const optional = !["name", "experience", "strength", "wrapper", "flavors"].includes(current.key);

  /* ————— splash ————— */
  if (!started) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          textAlign: "center",
          background:
            "radial-gradient(520px 340px at 50% 24%, rgba(212,175,55,0.13), transparent 70%), " +
            "radial-gradient(420px 300px at 50% 96%, rgba(242,102,13,0.09), transparent 70%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <Logo size={31} stacked tagline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          style={{ width: "100%" }}
        >
          <Typography variant="h5" sx={{ fontSize: 27, mt: 7, lineHeight: 1.34, color: tokens.text }}
          >
            Find the cigar
            <br />
            that fits your palate.
          </Typography>
          <Typography sx={{ fontSize: 14, color: tokens.textMuted, mt: 2, lineHeight: 1.7 }}>
            Answer seven quick questions. We'll learn your taste, then keep
            sharpening it with every swipe.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setStarted(true)}
            sx={{ mt: 5, py: 1.8, borderRadius: 3, fontSize: 15 }}
          >
            Build my profile
          </Button>
          <Typography sx={{ fontSize: 11, color: tokens.textFaint, mt: 2, letterSpacing: 0.5 }}>
            Takes about a minute · 21+
          </Typography>
        </motion.div>
      </Box>
    );
  }

  /* ————— questions ————— */
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", px: 3, pt: 3, pb: 3 }}>
      {/* header */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 2.5, alignItems: "center" }}>
        <ButtonBase
          onClick={() => (step === 0 ? setStarted(false) : setStep((s) => s - 1))}
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: `1px solid ${tokens.line}`,
            color: tokens.textMuted,
            flexShrink: 0,
            "&:hover": { borderColor: tokens.gold, color: tokens.gold },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 17 }} />
        </ButtonBase>

        <LogoMark size={26} />

        <Box sx={{ flex: 1 }} />

        <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.4, color: tokens.textFaint }}>
          {step + 1} / {total}
        </Typography>
      </Stack>

      {/* segmented progress */}
      <Stack direction="row" spacing={0.6} sx={{ mb: 3.5 }}>
        {steps.map((s, i) => (
          <Box
            key={s.key}
            sx={{
              flex: 1,
              height: 3,
              borderRadius: 3,
              bgcolor: i <= step ? tokens.gold : "rgba(255,255,255,0.09)",
              boxShadow: i === step ? "0 0 10px rgba(212,175,55,0.55)" : "none",
              transition: "background-color .3s, box-shadow .3s",
            }}
          />
        ))}
      </Stack>

      {/* content */}
      <Box sx={{ flex: 1, overflowY: "auto", mx: -0.5, px: 0.5 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            {current.render()}
            <Box sx={{ height: 8 }} />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* actions */}
      <Stack spacing={1} sx={{ mt: 2.5 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!current.valid}
          onClick={() => (isLast ? setUser(form) : setStep((s) => s + 1))}
          sx={{
            py: 1.8,
            borderRadius: 3,
            fontSize: 15,
            "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.06)", color: tokens.textFaint },
          }}
        >
          {isLast ? "Start discovering" : "Continue"}
        </Button>

        {optional && (
          <Button
            fullWidth
            onClick={() => (isLast ? setUser(form) : setStep((s) => s + 1))}
            sx={{ color: tokens.textFaint, fontSize: 13, "&:hover": { color: tokens.gold, bgcolor: "transparent" } }}
          >
            Skip this step
          </Button>
        )}
      </Stack>
    </Box>
  );
}
