importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBnrU7HrOAZy7WdsmTMRGThZ1wKvBoaOVM",
  authDomain: "vodomer434.firebaseapp.com",
  projectId: "vodomer434",
  storageBucket: "vodomer434.firebasestorage.app",
  messagingSenderId: "299950311854",
  appId: "1:299950311854:web:d4f8f325d2c23a80a4603f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.data || {};
  self.registration.showNotification(title || "Vodoměr", {
    body: body || "Je čas odečíst vodoměr.",
    icon: "icons/icon-192.png",
    badge: "icons/icon-192.png",
  });
  if (navigator.setAppBadge) {
    navigator.setAppBadge(1).catch(() => {});
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (navigator.clearAppBadge) navigator.clearAppBadge().catch(() => {});
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("./index.html");
    })
  );
});
