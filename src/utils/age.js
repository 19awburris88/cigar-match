/** Minimum age to use the app, in years. */
export const MINIMUM_AGE = 21;

/** Whole years between a date of birth and today. */
export function ageOn(dob, today = new Date()) {
  let years = today.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (beforeBirthday) years -= 1;
  return years;
}

/** Parse the `<input type="date">` value, returning null if it isn't a date. */
export function parseDob(value) {
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
