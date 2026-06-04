import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/cigar-match-logo.png";

const FLAVOR_OPTIONS = [
  "Cocoa", "Coffee", "Pepper", "Cedar", "Sweet", "Earth",
  "Cream", "Nuts", "Leather", "Spice", "Vanilla", "Toast",
];

const BRAND_OPTIONS = [
  "Padron", "Arturo Fuente", "My Father", "Oliva",
  "Rocky Patel", "Drew Estate", "Cohiba", "Romeo y Julieta",
  "Davidoff", "Montecristo",
];

const PAIRING_OPTIONS = [
  "Bourbon", "Scotch", "Rum", "Coffee", "Espresso", "Beer", "Red Wine", "Tequila",
];

const SelectButton = ({ label, selected, onClick }) => (
  <Button
    fullWidth
    variant={selected ? "contained" : "outlined"}
    onClick={onClick}
    sx={{
      py: 1.8,
      borderRadius: 3,
      bgcolor: selected ? "#D4AF37" : "transparent",
      color: selected ? "#000" : "#fff",
      borderColor: selected ? "#D4AF37" : "#333",
      fontWeight: "bold",
      fontSize: 14,
      "&:hover": {
        bgcolor: selected ? "#c5a030" : "rgba(212,175,55,0.08)",
        borderColor: "#D4AF37",
      },
    }}
  >
    {label}
  </Button>
);

const MultiChip = ({ label, selected, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    sx={{
      bgcolor: selected ? "#D4AF37" : "#1a1a1a",
      color: selected ? "#000" : "#ccc",
      border: "1px solid",
      borderColor: selected ? "#D4AF37" : "#333",
      fontWeight: selected ? "bold" : "normal",
      fontSize: 13,
      height: 36,
      cursor: "pointer",
      "&:hover": { borderColor: "#D4AF37" },
    }}
  />
);

export default function Onboarding({ setUser }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    experience: "",
    strength: "",
    wrapper: "",
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

  const canAdvance = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return form.experience !== "";
    if (step === 2) return form.strength !== "";
    if (step === 3) return form.wrapper !== "";
    if (step === 4) return form.flavors.length > 0;
    return true;
  };

  const TOTAL_STEPS = 7;

  const steps = [
    // 0 — name
    <Box key="name">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        What should we call you?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        We'll personalize your entire experience
      </Typography>
      <TextField
        fullWidth
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        onKeyDown={(e) => e.key === "Enter" && canAdvance() && setStep(1)}
        autoFocus
        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "#1a1a1a", borderRadius: 2, color: "#fff", "& fieldset": { borderColor: "#333" }, "&:hover fieldset": { borderColor: "#D4AF37" }, "&.Mui-focused fieldset": { borderColor: "#D4AF37" } } }}
        InputProps={{ style: { color: "#fff" } }}
      />
    </Box>,

    // 1 — experience
    <Box key="exp">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Your experience level?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        Helps us calibrate recommendations
      </Typography>
      <Stack spacing={1.5}>
        {["Beginner", "Intermediate", "Advanced", "Aficionado"].map((opt) => (
          <SelectButton
            key={opt}
            label={opt}
            selected={form.experience === opt}
            onClick={() => setForm((f) => ({ ...f, experience: opt }))}
          />
        ))}
      </Stack>
    </Box>,

    // 2 — strength
    <Box key="strength">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Preferred strength?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        How bold do you like your smoke?
      </Typography>
      <Stack spacing={1.5}>
        {["Mild", "Mild-Medium", "Medium", "Medium-Full", "Full"].map((opt) => (
          <SelectButton
            key={opt}
            label={opt}
            selected={form.strength === opt}
            onClick={() => setForm((f) => ({ ...f, strength: opt }))}
          />
        ))}
      </Stack>
    </Box>,

    // 3 — wrapper
    <Box key="wrapper">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Favorite wrapper?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        The wrapper defines a lot of the character
      </Typography>
      <Stack spacing={1.5}>
        {["Connecticut", "Maduro", "Habano", "Cameroon", "Corojo", "Natural"].map((opt) => (
          <SelectButton
            key={opt}
            label={opt}
            selected={form.wrapper === opt}
            onClick={() => setForm((f) => ({ ...f, wrapper: opt }))}
          />
        ))}
      </Stack>
    </Box>,

    // 4 — flavors
    <Box key="flavors">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Favorite flavor notes?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        Select all that you enjoy
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1.5}>
        {FLAVOR_OPTIONS.map((opt) => (
          <MultiChip
            key={opt}
            label={opt}
            selected={form.flavors.includes(opt)}
            onClick={() => toggle("flavors", opt)}
          />
        ))}
      </Stack>
    </Box>,

    // 5 — brands
    <Box key="brands">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Favorite brands?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        Select any you already love — optional
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1.5}>
        {BRAND_OPTIONS.map((opt) => (
          <MultiChip
            key={opt}
            label={opt}
            selected={form.brands.includes(opt)}
            onClick={() => toggle("brands", opt)}
          />
        ))}
      </Stack>
    </Box>,

    // 6 — pairings
    <Box key="pairings">
      <Typography variant="h5" fontWeight="bold" mb={1}>
        What do you pair with?
      </Typography>
      <Typography color="gray" fontSize={14} mb={3}>
        We'll suggest perfect pairings for every cigar
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1.5}>
        {PAIRING_OPTIONS.map((opt) => (
          <MultiChip
            key={opt}
            label={opt}
            selected={form.pairings.includes(opt)}
            onClick={() => toggle("pairings", opt)}
          />
        ))}
      </Stack>
    </Box>,
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        px: 3,
        pt: 5,
        pb: 4,
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center" }} mb={4}>
        <Box
          component="img"
          src={logo}
          alt="Cigar Match"
          sx={{ height: 120, mb: 1, objectFit: "contain", display: "block", mx: "auto" }}
        />
        <Typography color="gray" fontSize={12} mt={0.5} letterSpacing={1}>
          STEP {step + 1} OF {TOTAL_STEPS}
        </Typography>
        <Box sx={{ height: 3, bgcolor: "#222", borderRadius: 5, mt: 2 }}>
          <Box
            sx={{
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              height: "100%",
              bgcolor: "#D4AF37",
              borderRadius: 5,
              transition: "width 0.35s ease",
            }}
          />
        </Box>
      </Box>

      {/* STEP CONTENT */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.22 }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* NAV BUTTONS */}
      <Stack direction="row" spacing={2} mt={3}>
        {step > 0 && (
          <Button
            variant="outlined"
            onClick={() => setStep((s) => s - 1)}
            sx={{
              flex: 1,
              py: 1.8,
              borderRadius: 3,
              borderColor: "#333",
              color: "#fff",
              "&:hover": { borderColor: "#D4AF37" },
            }}
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          disabled={!canAdvance()}
          onClick={
            step === TOTAL_STEPS - 1
              ? () => setUser(form)
              : () => setStep((s) => s + 1)
          }
          sx={{
            flex: 1,
            py: 1.8,
            borderRadius: 3,
            bgcolor: "#D4AF37",
            color: "#000",
            fontWeight: "bold",
            fontSize: 15,
            "&:hover": { bgcolor: "#c5a030" },
            "&.Mui-disabled": { bgcolor: "#333", color: "#555" },
          }}
        >
          {step === TOTAL_STEPS - 1 ? "Start Discovering" : "Next"}
        </Button>
      </Stack>
    </Box>
  );
}
