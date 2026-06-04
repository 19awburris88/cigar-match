export function rankCigars(cigars, user, liked, inventory = null) {
  let pool = inventory
    ? cigars.filter((c) => inventory.includes(c.id))
    : cigars;

  // Exclude cigars already in the liked list
  pool = pool.filter((c) => !liked.some((l) => l.id === c.id));

  return pool
    .map((cigar) => {
      let score = 0;

      // Onboarding preferences
      if (cigar.strength === user.strength) score += 3;
      if (cigar.wrapper === user.wrapper) score += 3;

      // Favorite brands from onboarding
      if (user.brands?.includes(cigar.brand)) score += 4;

      // Flavor preferences from onboarding
      if (user.flavors) {
        const userFlavors = user.flavors.map((f) => f.toLowerCase());
        cigar.flavorNotes.forEach((note) => {
          if (userFlavors.includes(note.toLowerCase())) score += 2;
        });
      }

      // Behavior learning from swipe history
      liked.forEach((likedCigar) => {
        if (cigar.strength === likedCigar.strength) score += 2;
        if (cigar.wrapper === likedCigar.wrapper) score += 2;
        if (cigar.brand === likedCigar.brand) score += 1;
        cigar.flavorNotes.forEach((note) => {
          if (likedCigar.flavorNotes.includes(note)) score += 1;
        });
      });

      return { ...cigar, score };
    })
    .sort((a, b) => b.score - a.score);
}
