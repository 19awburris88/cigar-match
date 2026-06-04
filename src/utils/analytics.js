export function getTasteProfile(liked) {
  const total = liked.length;

  if (total === 0) return null;

  const strengthCount = {};
  const wrapperCount = {};
  const flavorCount = {};

  liked.forEach((cigar) => {
    // Strength
    strengthCount[cigar.strength] =
      (strengthCount[cigar.strength] || 0) + 1;

    // Wrapper
    wrapperCount[cigar.wrapper] =
      (wrapperCount[cigar.wrapper] || 0) + 1;

    // Flavor Notes
    cigar.flavorNotes.forEach((note) => {
      flavorCount[note] = (flavorCount[note] || 0) + 1;
    });
  });

  const toPercent = (count) =>
    Math.round((count / total) * 100);

  const topStrength = Object.entries(strengthCount).map(
    ([key, value]) => ({
      label: key,
      percent: toPercent(value),
    })
  );

  const topWrapper = Object.entries(wrapperCount).map(
    ([key, value]) => ({
      label: key,
      percent: toPercent(value),
    })
  );

  const topFlavors = Object.entries(flavorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key]) => key);

  return {
    total,
    topStrength,
    topWrapper,
    topFlavors,
  };
}