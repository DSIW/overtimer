import { useState } from "react";
import { DEFAULT_TIME_RANGE_OPTION_ID } from "../../domain/time-constants";

const STORAGE_KEY = "timeRangeOption";
const LEGACY_WEEK_LIMIT_STORAGE_KEY = "weekLimit";

function readStoredTimeRangeOptionId(): string {
  if (typeof window === "undefined") {
    return DEFAULT_TIME_RANGE_OPTION_ID;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return stored;
  }
  const legacyWeeks = window.localStorage.getItem(
    LEGACY_WEEK_LIMIT_STORAGE_KEY
  );
  return legacyWeeks ? `w${legacyWeeks}` : DEFAULT_TIME_RANGE_OPTION_ID;
}

export function useTimeRangeOption() {
  const [timeRangeOptionId, setTimeRangeOptionIdState] = useState(
    readStoredTimeRangeOptionId
  );

  function setTimeRangeOptionId(id: string) {
    window.localStorage.setItem(STORAGE_KEY, id);
    setTimeRangeOptionIdState(id);
  }

  return [timeRangeOptionId, setTimeRangeOptionId] as const;
}
