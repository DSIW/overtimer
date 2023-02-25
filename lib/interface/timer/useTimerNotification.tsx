import { useEffect } from "react";
import {
  closeTimerNotification,
  showTimerNotificationIfGranted,
} from "../../infrastructure/Notification";
import Duration from "../../domain/analysis/Duration";
import * as Sentry from "@sentry/browser";

export default function useTimerNotification(
  isRunning: boolean,
  remainingMillis: number
) {
  useEffect(() => {
    if (isRunning) {
      showTimerNotificationIfGranted(
        "Timer is running",
        `Remaining: ${new Duration(remainingMillis).getFormatted(true)}`
      ).catch((error: unknown) => Sentry.captureException(error));
    } else {
      closeTimerNotification().catch((error: unknown) =>
        Sentry.captureException(error)
      );
    }
  }, [isRunning, remainingMillis]);
}
