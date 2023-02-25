const PERMISSIONS_GRANTED = "granted";

export async function requestNotificationPermission() {
  await Notification.requestPermission();
}

export async function showTimerNotificationIfGranted(
  title: string,
  body: string
) {
  await requestNotificationPermission();

  if (Notification.permission == PERMISSIONS_GRANTED) {
    const registration = await getRegistration();
    if (!registration) {
      return;
    }

    await registration.showNotification(title, {
      body,
      actions: [],
      vibrate: [300, 100, 300],
      requireInteraction: true,
      tag: "timer",
      icon: "/favicon.ico",
    });
  }
}

export async function closeTimerNotification() {
  const registration = await getRegistration();
  if (!registration) {
    return;
  }

  const notifications = await registration.getNotifications({ tag: "timer" });
  notifications.forEach((notification) => notification.close());
}

export async function getRegistration() {
  return await navigator.serviceWorker.getRegistration();
}
