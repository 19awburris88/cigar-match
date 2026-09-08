import { matchesStrength, matchesWrapper, matchesBrand, matchingFlavors } from "./prefs";

/**
 * Why a cigar surfaced, strongest reason first. Shared by the swipe card and
 * the Profile's suggestions so both explain a pick the same way.
 */
export function matchReasons(cigar, user, liked) {
  const reasons = [];
  if (matchesStrength(user, cigar)) reasons.push(`${cigar.strength} — a strength you picked`);
  if (matchesWrapper(user, cigar)) reasons.push(`${cigar.wrapper} wrapper, one of your favorites`);
  if (matchesBrand(user, cigar)) reasons.push(`${cigar.brand} is a house you follow`);

  const flavors = matchingFlavors(user, cigar);
  if (flavors.length) reasons.push(`Notes of ${flavors.join(" and ")}`);

  if (liked.some((c) => c.wrapper === cigar.wrapper))
    reasons.push("Close to cigars you've liked");

  return reasons;
}

/**
 * The single most specific reason, preferring evidence learned from likes over
 * the answers given at signup.
 */
export function topReason(cigar, user, liked) {
  const fromLikes = liked.find(
    (c) => c.brand === cigar.brand || c.flavorNotes.some((n) => cigar.flavorNotes.includes(n))
  );
  if (fromLikes) {
    if (fromLikes.brand === cigar.brand) return `Another ${fromLikes.brand}, like the one you liked`;
    const shared = cigar.flavorNotes.filter((n) => fromLikes.flavorNotes.includes(n));
    // Reference the house rather than the full blend name — it repeats across rows.
    return `Shares ${shared.join(" and ")} with your ${fromLikes.brand}`;
  }
  return matchReasons(cigar, user, liked)[0] ?? "A well-rated place to start";
}
