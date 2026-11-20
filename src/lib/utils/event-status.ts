import { EventItem, EventTemporalStatus, RegistrationState } from "@/types";

/**
 * Derive temporal status (upcoming, ongoing, past) based on event dates
 * This is always calculated, not hardcoded into database tables.
 */
export function getEventTemporalStatus(
  startAt: string | Date,
  endAt?: string | Date | null,
  referenceNow: Date = new Date()
): EventTemporalStatus {
  const start = typeof startAt === "string" ? new Date(startAt) : startAt;
  const now = referenceNow.getTime();

  if (isNaN(start.getTime())) return "upcoming";

  // If event hasn't started yet
  if (now < start.getTime()) {
    return "upcoming";
  }

  // If endAt is specified
  if (endAt) {
    const end = typeof endAt === "string" ? new Date(endAt) : endAt;
    if (!isNaN(end.getTime())) {
      if (now <= end.getTime()) {
        return "ongoing";
      }
      return "past";
    }
  }

  // Fallback if endAt is not provided: assume event duration is 3 hours
  const assumedEndTime = start.getTime() + 3 * 60 * 60 * 1000;
  if (now <= assumedEndTime) {
    return "ongoing";
  }

  return "past";
}

/**
 * Derive registration state for an event
 * Logic handles:
 * - 'none' mode -> 'not_required'
 * - event past or cancelled -> 'closed'
 * - deadline passed -> 'closed'
 * - capacity reached -> 'full'
 * - valid external link / open internal -> 'open'
 */
export function getEventRegistrationState(
  event: Pick<EventItem, "registrationMode" | "registrationUrl" | "registrationDeadline" | "startAt" | "endAt" | "status" | "capacity">,
  registeredCount: number = 0,
  referenceNow: Date = new Date()
): RegistrationState {
  if (event.status === "cancelled") {
    return "closed";
  }

  if (event.registrationMode === "none") {
    return "not_required";
  }

  const now = referenceNow.getTime();
  const start = new Date(event.startAt).getTime();

  // If event already started or concluded, registration is closed
  if (!isNaN(start) && now >= start) {
    return "closed";
  }

  // If deadline has passed
  if (event.registrationDeadline) {
    const deadline = new Date(event.registrationDeadline).getTime();
    if (!isNaN(deadline) && now > deadline) {
      return "closed";
    }
  }

  // If capacity is explicitly enforced and reached
  if (event.capacity && registeredCount >= event.capacity) {
    return "full";
  }

  // For external mode, registration is open if a valid URL is provided
  if (event.registrationMode === "external") {
    return event.registrationUrl ? "open" : "closed";
  }

  if (event.registrationMode === "internal") {
    return "open";
  }

  return "not_required";
}

/**
 * Helper to get human-friendly badge label and style variant for registration state
 */
export function getRegistrationBadgeInfo(state: RegistrationState): {
  label: string;
  variant: "open" | "closed" | "not_required" | "upcoming" | "full";
} {
  switch (state) {
    case "open":
      return { label: "Register Now", variant: "open" };
    case "closed":
      return { label: "Registration Closed", variant: "closed" };
    case "full":
      return { label: "Capacity Full", variant: "full" };
    case "upcoming":
      return { label: "Registration Opening Soon", variant: "upcoming" };
    case "not_required":
    default:
      return { label: "Open to All (No RSVP)", variant: "not_required" };
  }
}
