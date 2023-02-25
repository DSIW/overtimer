export async function requestNotificationPermission() {
  await Notification.requestPermission();
}

export async function showTimerNotificationIfGranted(
  title: string,
  body: string,
  actions: NotificationAction[],
  isPersistent: boolean
) {
  if (Notification.permission == "granted") {
    const reg = await navigator.serviceWorker.getRegistration();
    reg &&
      reg.showNotification(title, {
        body,
        actions: actions,
        vibrate: [300, 100, 300],
        requireInteraction: isPersistent,
        tag: "timer",
      });
  }
}

export async function closeTimerNotification() {
  const reg = await navigator.serviceWorker.getRegistration();
  const notifications = reg ? await reg.getNotifications({ tag: "timer" }) : [];
  notifications && notifications.forEach((not) => not.close());
}
