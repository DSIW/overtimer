import { useEffect } from "react";
import {
  closeTimerNotification,
  showTimerNotificationIfGranted,
} from "../../infrastructure/notification/Notification";
import Duration from "../../domain/analysis/Duration";

export default function useTimerNotification(
  isRunning: boolean,
  value: number
) {
  useEffect(() => {
    if (isRunning) {
      showTimerNotificationIfGranted(
        "Timer is running",
        `Remaining: ${new Duration(value).getFormatted(true)}`,
        [],
        true
      );
    } else {
      closeTimerNotification();
    }
  }, [isRunning, value]);
}
