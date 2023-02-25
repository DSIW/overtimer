export async function requestNotificationPermission() {
  await Notification.requestPermission();
}

export async function showTimerNotificationIfGranted(
  title: string,
  body: string,
  actions: NotificationAction[],
  isPersistent: boolean
) {
  await requestNotificationPermission();

  if (Notification.permission == "granted") {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      return;
    }

    reg.showNotification(title, {
      body,
      actions: actions,
      vibrate: [300, 100, 300],
      requireInteraction: isPersistent,
      tag: "timer",
      icon: "/favicon.ico",
    });
  }
}

export async function closeTimerNotification() {
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) {
    return;
  }

  const notifications = await reg.getNotifications({ tag: "timer" });
  notifications && notifications.forEach((not) => not.close());
}
