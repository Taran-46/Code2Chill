/**
 * Timezone-aware date utilities for Code2Chill
 * Standardized on Asia/Kolkata (Indian Standard Time, UTC+5:30)
 */

export const DEFAULT_TIMEZONE = "Asia/Kolkata";

/**
 * Format date in IST (e.g., "Saturday, Nov 22, 2026")
 */
export function formatEventDate(
  dateInput: string | Date,
  timeZone: string = DEFAULT_TIMEZONE,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "Date to be announced";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
    ...options,
  };

  return new Intl.DateTimeFormat("en-IN", defaultOptions).format(date);
}

/**
 * Format time in IST (e.g., "10:30 AM IST")
 */
export function formatEventTime(
  dateInput: string | Date,
  timeZone: string = DEFAULT_TIMEZONE,
  includeTimezone: boolean = true
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const timeStr = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);

  return includeTimezone ? `${timeStr} IST` : timeStr;
}

/**
 * Format a human-readable date & time range
 * e.g. "Nov 22, 2026 · 10:00 AM – 4:00 PM IST"
 */
export function formatEventDateTimeRange(
  startInput: string | Date,
  endInput?: string | Date | null,
  timeZone: string = DEFAULT_TIMEZONE
): string {
  const startDate = typeof startInput === "string" ? new Date(startInput) : startInput;
  if (isNaN(startDate.getTime())) return "Schedule to be confirmed";

  const datePart = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(startDate);

  const startTimePart = formatEventTime(startDate, timeZone, false);

  if (!endInput) {
    return `${datePart} · ${startTimePart} IST`;
  }

  const endDate = typeof endInput === "string" ? new Date(endInput) : endInput;
  if (isNaN(endDate.getTime())) {
    return `${datePart} · ${startTimePart} IST`;
  }

  const isSameDay =
    startDate.toLocaleDateString("en-CA", { timeZone }) ===
    endDate.toLocaleDateString("en-CA", { timeZone });

  if (isSameDay) {
    const endTimePart = formatEventTime(endDate, timeZone, true);
    return `${datePart} · ${startTimePart} – ${endTimePart}`;
  }

  const endDatePart = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(endDate);

  const endTimePart = formatEventTime(endDate, timeZone, true);
  return `${datePart}, ${startTimePart} – ${endDatePart}, ${endTimePart}`;
}

/**
 * Calculate countdown units between target date and current time
 */
export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  totalMs: number;
}

export function calculateCountdown(targetDateInput: string | Date, nowInput: Date = new Date()): CountdownResult {
  const target = typeof targetDateInput === "string" ? new Date(targetDateInput) : targetDateInput;
  const totalMs = target.getTime() - nowInput.getTime();

  if (isNaN(totalMs) || totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true, totalMs: 0 };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isComplete: false, totalMs };
}
