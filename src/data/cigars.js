/**
 * Photography: hand-picked Unsplash frames, one per cigar so no two cards
 * repeat. These are editorial cigar photographs, not manufacturer product
 * shots — they set the mood for the blend rather than depict that exact stick.
 */
const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PHOTO = {
  maduroPour: "1612659429327-8f59b894959b",   // dark maduro resting by a whisky glass
  singleOnWood: "1612659429508-b429d6b07ac1", // banded cigar upright on weathered wood
  torchLight: "1577931170527-cb5c8f39020c",   // lighting up with a torch flame
  lightWrapper: "1637248990333-e66e027538f4", // pale wrapper beside a rocks glass
  cutter: "1577931061564-e746adda00ec",       // guillotine cut, close up
  openBoxPale: "1514514589924-94eda1732498",  // pale cigars packed in an open box
  smokeRing: "1520644204196-4a478546826f",    // lit cigar trailing smoke, signet ring
  cedarBox: "1694716438178-c6f34bddd64d",     // open cedar box, banded rows
  luxeSpread: "1547652577-b4fe2f34d7ee",      // cigars, cutter and case laid out
  flame: "1592505690387-24e71ca99897",        // match flame in the dark
  shopShelf: "1592860819253-fc983565e44a",    // shop shelf lined with boxes
  agingRoom: "1592862080230-fe0a3b380f21",    // cigars ageing in cedar racks
  bundled: "1694716479704-459f025d0793",      // bundled feet, ready to band
  leafHands: "1649779117064-107e63b88758",    // cured leaf in a roller's hands
  fieldLeaf: "1528446558593-05d60f8d4ae9",    // tobacco hanging in the barn
};

const cigars = [
  {
    id: 1,
    name: "Padron 1964 Anniversary Maduro",
    brand: "Padron",
    wrapper: "Maduro",
    strength: "Full",
    flavorNotes: ["cocoa", "coffee", "pepper"],
    origin: "Nicaragua",
    price: "$28",
    rating: 96,
    image: img(PHOTO.maduroPour),
  },
  {
    id: 2,
    name: "Arturo Fuente Hemingway",
    brand: "Arturo Fuente",
    wrapper: "Cameroon",
    strength: "Medium",
    flavorNotes: ["cedar", "sweet", "spice"],
    origin: "Dominican Republic",
    price: "$18",
    rating: 93,
    image: img(PHOTO.singleOnWood),
  },
  {
    id: 3,
    name: "My Father Le Bijou 1922",
    brand: "My Father",
    wrapper: "Habano",
    strength: "Full",
    flavorNotes: ["earth", "pepper", "espresso"],
    origin: "Nicaragua",
    price: "$22",
    rating: 95,
    image: img(PHOTO.torchLight),
  },
  {
    id: 4,
    name: "Macanudo Cafe",
    brand: "Macanudo",
    wrapper: "Connecticut",
    strength: "Mild",
    flavorNotes: ["cream", "nuts", "wood"],
    origin: "Dominican Republic",
    price: "$8",
    rating: 88,
    image: img(PHOTO.lightWrapper),
  },
  {
    id: 5,
    name: "Oliva Serie V Melanio",
    brand: "Oliva",
    wrapper: "Habano",
    strength: "Full",
    flavorNotes: ["cocoa", "earth", "cedar"],
    origin: "Nicaragua",
    price: "$24",
    rating: 97,
    image: img(PHOTO.cutter),
  },
  {
    id: 6,
    name: "Rocky Patel Vintage 1990",
    brand: "Rocky Patel",
    wrapper: "Connecticut",
    strength: "Medium",
    flavorNotes: ["cream", "cedar", "vanilla"],
    origin: "Honduras",
    price: "$12",
    rating: 91,
    image: img(PHOTO.openBoxPale),
  },
  {
    id: 7,
    name: "Liga Privada No. 9",
    brand: "Drew Estate",
    wrapper: "Maduro",
    strength: "Full",
    flavorNotes: ["coffee", "leather", "spice"],
    origin: "Nicaragua",
    price: "$22",
    rating: 96,
    image: img(PHOTO.smokeRing),
  },
  {
    id: 8,
    name: "Romeo y Julieta Reserva Real",
    brand: "Romeo y Julieta",
    wrapper: "Connecticut",
    strength: "Mild",
    flavorNotes: ["cream", "honey", "floral"],
    origin: "Dominican Republic",
    price: "$10",
    rating: 89,
    image: img(PHOTO.cedarBox),
  },
  {
    id: 9,
    name: "Cohiba Behike 54",
    brand: "Cohiba",
    wrapper: "Habano",
    strength: "Medium-Full",
    flavorNotes: ["cedar", "earth", "coffee"],
    origin: "Cuba",
    price: "$45",
    rating: 98,
    image: img(PHOTO.luxeSpread),
  },
  {
    id: 10,
    name: "Alec Bradley Prensado",
    brand: "Alec Bradley",
    wrapper: "Corojo",
    strength: "Full",
    flavorNotes: ["pepper", "spice", "nuts"],
    origin: "Honduras",
    price: "$14",
    rating: 94,
    image: img(PHOTO.flame),
  },
  {
    id: 11,
    name: "Perdomo Champagne",
    brand: "Perdomo",
    wrapper: "Connecticut",
    strength: "Mild-Medium",
    flavorNotes: ["cream", "toast", "nuts"],
    origin: "Nicaragua",
    price: "$10",
    rating: 90,
    image: img(PHOTO.shopShelf),
  },
  {
    id: 12,
    name: "Montecristo No. 2",
    brand: "Montecristo",
    wrapper: "Natural",
    strength: "Medium",
    flavorNotes: ["earth", "wood", "cinnamon"],
    origin: "Cuba",
    price: "$30",
    rating: 94,
    image: img(PHOTO.agingRoom),
  },
  {
    id: 13,
    name: "Ashton VSG",
    brand: "Ashton",
    wrapper: "Habano",
    strength: "Medium-Full",
    flavorNotes: ["cedar", "coffee", "pepper"],
    origin: "Dominican Republic",
    price: "$20",
    rating: 93,
    image: img(PHOTO.bundled),
  },
  {
    id: 14,
    name: "CAO Flathead V660",
    brand: "CAO",
    wrapper: "Natural",
    strength: "Medium",
    flavorNotes: ["toast", "earth", "nuts"],
    origin: "Nicaragua",
    price: "$11",
    rating: 91,
    image: img(PHOTO.leafHands),
  },
  {
    id: 15,
    name: "Davidoff Millennium Blend",
    brand: "Davidoff",
    wrapper: "Connecticut",
    strength: "Mild-Medium",
    flavorNotes: ["cream", "vanilla", "floral"],
    origin: "Dominican Republic",
    price: "$25",
    rating: 92,
    image: img(PHOTO.fieldLeaf),
  },
];

export default cigars;
