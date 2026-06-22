import { useState } from "react";
import { WEEK_LIMIT } from "../../domain/time-constants";

const STORAGE_KEY = "weekLimit";

function readStoredWeekLimit(): number {
  if (typeof window === "undefined") {
    return WEEK_LIMIT;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? Number(stored) : WEEK_LIMIT;
}

export function useWeekLimit() {
  const [weekLimit, setWeekLimitState] = useState(readStoredWeekLimit);

  function setWeekLimit(weeks: number) {
    window.localStorage.setItem(STORAGE_KEY, String(weeks));
    setWeekLimitState(weeks);
  }

  return [weekLimit, setWeekLimit] as const;
}
