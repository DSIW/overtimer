import { useEffect } from "react";
import {
  closeTimerNotification,
  requestNotificationPermission,
  showTimerNotificationIfGranted,
} from "../../infrastructure/Notification";
import * as Sentry from "@sentry/browser";

export default function useTimerNotification(isRunning: boolean, body: string) {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (isRunning) {
      showTimerNotificationIfGranted("Timer is running", body).catch(
        (error: unknown) => Sentry.captureException(error)
      );
    } else {
      closeTimerNotification().catch((error: unknown) =>
        Sentry.captureException(error)
      );
    }
  }, [isRunning, body]);
}
