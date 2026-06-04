import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export default function Humidor({ humidor, setHumidor }) {
  const remove = (id) => setHumidor((h) => h.filter((c) => c.id !== id));

  if (humidor.length === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          px: 3,
          textAlign: "center",
        }}
      >
        <Inventory2Icon sx={{ fontSize: 56, color: "#333", mb: 2 }} />
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Your Humidor is Empty
        </Typography>
        <Typography color="gray" fontSize={14} lineHeight={1.6}>
          While swiping, tap the humidor icon on a card to add cigars to your
          collection
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", color: "#fff", px: 2, pt: 3, pb: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={0.5}>
        My Humidor
      </Typography>
      <Typography color="gray" fontSize={13} mb={3}>
        {humidor.length} cigar{humidor.length !== 1 ? "s" : ""} in your collection
      </Typography>

      <Grid container spacing={2}>
        {humidor.map((cigar) => (
          <Grid item xs={6} key={cigar.id}>
            <Card
              sx={{
                bgcolor: "#111",
                color: "#fff",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #1e1e1e",
              }}
            >
              <img
                src={cigar.image}
                alt={cigar.name}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  filter: "brightness(0.8)",
                  display: "block",
                }}
              />
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography fontSize={12} fontWeight="bold" noWrap>
                  {cigar.name}
                </Typography>
                <Typography fontSize={11} sx={{ color: "#D4AF37" }} mt={0.2}>
                  {cigar.brand}
                </Typography>
                <Typography fontSize={10} color="gray" mt={0.2}>
                  {cigar.wrapper} · {cigar.strength}
                </Typography>
                {cigar.price && (
                  <Typography fontSize={10} color="#666" mt={0.2}>
                    {cigar.price}
                  </Typography>
                )}
                <Button
                  size="small"
                  onClick={() => remove(cigar.id)}
                  sx={{
                    mt: 0.8,
                    p: 0,
                    minWidth: 0,
                    color: "#444",
                    fontSize: 10,
                    textTransform: "none",
                    "&:hover": { color: "#888" },
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
