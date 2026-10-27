/*
  Facts about Bekir shown in several places (system line, Home header and stats,
  command line, ID card, Contact). Change them here, not in the components.
  Long-form copy (About summary, Home README) stays in its page.
*/
export const PROFILE = {
  name: "Bekir Kasan",
  fullName: "Bekir Sadik Kasan",
  role: "Software Developer",
  tagline:
    "Building reliable full-stack applications with performance, accessibility, and scalability in mind.",
  experience: "3+ YRS",
  openToWork: true,
  city: "Espoo",
  countryCode: "FI",
  site: "bskasan.dev",
  /** First year shown in the © line. */
  since: 2022,
  coreStack: ["TypeScript", "Next.js", "Azure"],
} as const;

/** "2022–2026": first year to the current year (evaluated when the page is built). */
export const COPYRIGHT_YEARS = `${PROFILE.since}–${new Date().getFullYear()}`;

/** "ESPOO/FI" */
export const LOCATION_CODE = `${PROFILE.city.toUpperCase()}/${PROFILE.countryCode}`;
