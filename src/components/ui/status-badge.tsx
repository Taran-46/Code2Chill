import React from "react";
import { Badge } from "./badge";
import { RegistrationState, EventTemporalStatus } from "@/types";
import { getRegistrationBadgeInfo } from "@/lib/utils/event-status";

interface StatusBadgeProps {
  type: "temporal" | "registration";
  status: EventTemporalStatus | RegistrationState;
  className?: string;
}

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  if (type === "temporal") {
    const temporal = status as EventTemporalStatus;
    switch (temporal) {
      case "upcoming":
        return (
          <Badge variant="brand" className={className}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Upcoming Event
          </Badge>
        );
      case "ongoing":
        return (
          <Badge variant="success" className={className}>
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping" />
            Live Now
          </Badge>
        );
      case "past":
      default:
        return (
          <Badge variant="subtle" className={className}>
            Past Event
          </Badge>
        );
    }
  }

  // Registration Badge
  const regState = status as RegistrationState;
  const { label, variant } = getRegistrationBadgeInfo(regState);

  switch (variant) {
    case "open":
      return (
        <Badge variant="success" className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
          {label}
        </Badge>
      );
    case "closed":
      return (
        <Badge variant="subtle" className={className}>
          {label}
        </Badge>
      );
    case "full":
      return (
        <Badge variant="warning" className={className}>
          {label}
        </Badge>
      );
    case "upcoming":
      return (
        <Badge variant="accent" className={className}>
          {label}
        </Badge>
      );
    case "not_required":
    default:
      return (
        <Badge variant="subtle" className={className}>
          {label}
        </Badge>
      );
  }
}
