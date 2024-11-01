const PERMISSIONS_GRANTED: NotificationPermission = "granted";

export async function requestNotificationPermission() {
  return await Notification.requestPermission();
}

export async function showTimerNotificationIfGranted(
  title: string,
  body: string
) {
  const permission = await requestNotificationPermission();

  if (permission !== PERMISSIONS_GRANTED) {
    return;
  }

  const registration = await getRegistration();
  if (!registration) {
    return;
  }

  await registration.showNotification(title, {
    body,
    requireInteraction: false,
    tag: "timer",
    icon: "/favicon.ico",
  });
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
