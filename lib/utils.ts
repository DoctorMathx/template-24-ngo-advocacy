import { siteConfig } from "./site-config";

/** Unsplash helper — swap for your own photography in production. */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function formatNaira(value: number) {
  return `${siteConfig.donation.currency}${Math.round(value).toLocaleString("en-NG")}`;
}
export const formatPrice = formatNaira;

/** ₦4.2m / ₦850k style for big headline numbers. */
export function compactNaira(value: number) {
  const c = siteConfig.donation.currency;
  if (value >= 1_000_000_000) return `${c}${trim(value / 1_000_000_000)}bn`;
  if (value >= 1_000_000) return `${c}${trim(value / 1_000_000)}m`;
  if (value >= 1_000) return `${c}${trim(value / 1_000)}k`;
  return `${c}${value}`;
}
function trim(n: number) {
  return n >= 100 ? Math.round(n).toString() : n.toFixed(1).replace(/\.0$/, "");
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-NG");
}

export function percent(raised: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

/** Days remaining relative to the build/request date. */
export function daysLeft(endDate: string) {
  const end = new Date(endDate + "T23:59:59").getTime();
  return Math.max(0, Math.ceil((end - Date.now()) / 86_400_000));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(iso + (iso.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-NG", opts);
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Client-side reference generator for simulated receipts, e.g. HV-261028-4K7Q. */
export function makeRef(prefix: string = siteConfig.donation.referencePrefix) {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
export function isPhone(v: string) {
  return /^\+?[0-9\s-]{10,16}$/.test(v.trim());
}
/** Positive whole naira only. */
export function parseAmount(v: string | number | null | undefined) {
  if (v === null || v === undefined || v === "") return 0;
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
