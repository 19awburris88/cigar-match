/**
 * Onboarding lets people pick several strengths and wrappers, so preferences
 * are stored as arrays. These readers also accept the old single-string shape
 * so a profile saved before the change still ranks correctly.
 */
export const asList = (value) =>
  Array.isArray(value) ? value : value ? [value] : [];

export const matchesStrength = (user, cigar) =>
  asList(user?.strength).includes(cigar.strength);

export const matchesWrapper = (user, cigar) =>
  asList(user?.wrapper).includes(cigar.wrapper);

export const matchesBrand = (user, cigar) =>
  asList(user?.brands).includes(cigar.brand);

export const matchingFlavors = (user, cigar) => {
  const wanted = asList(user?.flavors).map((f) => f.toLowerCase());
  return cigar.flavorNotes.filter((note) => wanted.includes(note.toLowerCase()));
};

/**
 * "Full, Medium-Full +1" — for profile summaries. Multi-select can produce
 * long lists, so only the first `max` are named and the rest are counted.
 */
export const listSummary = (value, { max = 2, fallback = "—" } = {}) => {
  const items = asList(value);
  if (!items.length) return fallback;
  const shown = items.slice(0, max).join(", ");
  return items.length > max ? `${shown} +${items.length - max}` : shown;
};
