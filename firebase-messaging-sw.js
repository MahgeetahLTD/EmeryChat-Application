importScripts('https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDjszPGc44XFJdmjJ5gfrV9Fnva64vcYWk",
  authDomain: "emerychat-702cb.firebaseapp.com",
  databaseURL: "https://emerychat-702cb-default-rtdb.firebaseio.com/",
  projectId: "emerychat-702cb",
  storageBucket: "emerychat-702cb.firebasestorage.app",
  messagingSenderId: "762065364447",
  appId: "1:762065364447:web:133ff50d6c918f0ca3506a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'EmeryChat';
  const options = {
    body: (payload.notification && payload.notification.body) || 'New message',
    icon: './icon-192.png',
    badge: './icon-192.png'
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
