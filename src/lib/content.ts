/**
 * Central content configuration.
 *
 * Admin-friendly: every piece of editable site content lives here so a future
 * Admin Panel can update these values without touching component code.
 * Localized strings for text live in `src/locales/{hu,ro}.json`.
 */

import img1 from "@/assets/hero/img1.webp";
import img2 from "@/assets/hero/img2.webp";
import img3 from "@/assets/hero/img3.webp";
import img4 from "@/assets/hero/img4.webp";
import img5 from "@/assets/hero/img5.webp";

export const SITE_IMAGES = {
  img1,
  img2,
  img3,
  img4,
  img5,
} as const;

/** Ordered list used by the hero background slider (3s per slide). */
export const HERO_SLIDES: { src: string; alt: string }[] = [
  { src: img1, alt: "ITP Paizs DNS Auto — station" },
  { src: img2, alt: "ITP Paizs DNS Auto — inspection" },
  { src: img3, alt: "ITP Paizs DNS Auto — workshop" },
  { src: img4, alt: "ITP Paizs DNS Auto — equipment" },
  { src: img5, alt: "ITP Paizs DNS Auto — team" },
];

export const HERO_SLIDE_INTERVAL_MS = 3000;

/** Company social/external links. */
export const SOCIAL = {
  facebook:
    "https://www.facebook.com/profile.php?id=100063563737873&rdid=7gVfNZ5Z5gmN44FQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Crt9cJ8AA%2F",
} as const;

/**
 * All phone-style CTAs across the site route users to the Contact section
 * instead of dialing directly. The Contact section lists every phone
 * number with the responsible person.
 */
export const PHONE_CTA_HREF = "#contact";

/** Vehicle / service cards. Add or reorder here — no component changes needed. */
export const SERVICE_ITEMS: { key: string; icon: string }[] = [
  { key: "cars", icon: "Car" },
  { key: "moto", icon: "Bike" },
  { key: "trucks", icon: "Truck" },
  { key: "trailers", icon: "Caravan" },
  { key: "agri", icon: "Tractor" },
  { key: "comm", icon: "Package" },
  { key: "power", icon: "Cog" },
];
