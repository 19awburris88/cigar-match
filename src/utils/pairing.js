export function getPairing(cigar) {
  const notes = cigar.flavorNotes;

  if (notes.some((n) => ["cocoa", "coffee", "espresso"].includes(n))) {
    return {
      drink: "Bourbon",
      recommendation: "Woodford Reserve or Elijah Craig",
      vibe: "Rich, late-night smoke",
    };
  }

  if (notes.some((n) => ["pepper", "spice", "leather"].includes(n))) {
    return {
      drink: "Rye Whiskey",
      recommendation: "Bulleit Rye or WhistlePig",
      vibe: "Bold and energizing",
    };
  }

  if (notes.some((n) => ["earth", "wood", "cedar"].includes(n))) {
    return {
      drink: "Scotch",
      recommendation: "Glenfiddich or Macallan 12",
      vibe: "Earthy and contemplative",
    };
  }

  if (notes.some((n) => ["cream", "vanilla", "honey", "floral"].includes(n))) {
    return {
      drink: "Coffee",
      recommendation: "Espresso or Cappuccino",
      vibe: "Smooth and relaxing",
    };
  }

  if (notes.some((n) => ["sweet", "cinnamon", "toast"].includes(n))) {
    return {
      drink: "Rum",
      recommendation: "Diplomatico Reserva or Zaya",
      vibe: "Sweet and indulgent",
    };
  }

  if (notes.some((n) => ["nuts"].includes(n))) {
    return {
      drink: "Cognac",
      recommendation: "Hennessy VSOP or Rémy Martin",
      vibe: "Smooth and luxurious",
    };
  }

  return {
    drink: "Whiskey",
    recommendation: "Your favorite pour",
    vibe: "Balanced and easygoing",
  };
}
