import type { ContactKind, SiteConfig } from "@/types/site";

// საერთაშორისო ფორმატი: +, ქვეყნის კოდი და ნომერი (8–15 ციფრი).
export function validPhone(value: string | null): string | null {
  if (!value || !/^\+[\d\s()-]+$/.test(value)) return null;
  const normalized = value.replace(/[\s()-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}
export function httpsUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export function contactHref(
  kind: ContactKind,
  contacts: SiteConfig["contacts"],
): string | null {
  if (kind === "facebook" || kind === "instagram") {
    const href = httpsUrl(contacts[kind]);
    return href ? contacts[kind] : null;
  }
  const phone = validPhone(
    kind === "phone" ? contacts.phone : contacts.whatsappNumber,
  );
  if (!phone) return null;
  return kind === "phone" ? `tel:${phone}` : `https://wa.me/${phone.slice(1)}`;
}
export function mapHref(location: SiteConfig["location"]): string | null {
  const suppliedUrl = httpsUrl(location.mapUrl);
  if (suppliedUrl) return suppliedUrl;
  const point = location.coordinates;
  if (
    !point ||
    !Number.isFinite(point.latitude) ||
    !Number.isFinite(point.longitude) ||
    Math.abs(point.latitude) > 90 ||
    Math.abs(point.longitude) > 180
  )
    return null;
  return `https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`;
}
