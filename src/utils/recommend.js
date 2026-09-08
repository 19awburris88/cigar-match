import { matchesStrength, matchesWrapper, matchesBrand, matchingFlavors } from "./prefs";

export function rankCigars(cigars, user, liked, inventory = null) {
  let pool = inventory
    ? cigars.filter((c) => inventory.includes(c.id))
    : cigars;

  // Exclude cigars already in the liked list
  pool = pool.filter((c) => !liked.some((l) => l.id === c.id));

  return pool
    .map((cigar) => {
      let score = 0;

      // Onboarding preferences — any selected strength or wrapper counts
      if (matchesStrength(user, cigar)) score += 3;
      if (matchesWrapper(user, cigar)) score += 3;

      // Favorite brands from onboarding
      if (matchesBrand(user, cigar)) score += 4;

      // Flavor preferences from onboarding
      score += matchingFlavors(user, cigar).length * 2;

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
