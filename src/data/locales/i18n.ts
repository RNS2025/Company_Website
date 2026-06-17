import { da } from "./da";
import { en } from "./en";

export type Locale = "da" | "en";

export const defaultLocale: Locale = "da";

export function useTranslations(locale: string | undefined) {
  const cleanLocale = locale === "en" ? "en" : "da";
  return cleanLocale === "en" ? en : da;
}

export function getLocaleLink(path: string, locale: string | undefined) {
  if (!path) return "";
  
  // Do not modify external, email, or telephone links
  if (
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const cleanLocale = locale === "en" ? "en" : "da";

  if (cleanLocale === "da") {
    // Return path, strip leading /en/ if somehow present
    if (path.startsWith("/en/")) {
      return path.substring(3) || "/";
    }
    if (path === "/en") {
      return "/";
    }
    return path;
  } else {
    // English
    if (path.startsWith("/en/") || path === "/en") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/en${path}`;
    }
    return `/en/${path}`;
  }
}
