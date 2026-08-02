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
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || "Vodoměr", {
    body: body || "Je čas odečíst vodoměr.",
    icon: "icons/icon-192.png",
    badge: "icons/icon-192.png",
  });
});
