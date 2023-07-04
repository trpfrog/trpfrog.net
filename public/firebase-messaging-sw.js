importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// API Keys of Firebase App is public information.
// So we can write it in the source code.
firebase.initializeApp({
  apiKey: 'AIzaSyBKjhKaniQ5RGm3mgj1TEDBmK5Nzo0-OBE',
  authDomain: 'trpfrog-net-5ac1a.firebaseapp.com',
  projectId: 'trpfrog-net-5ac1a',
  storageBucket: 'trpfrog-net-5ac1a.appspot.com',
  messagingSenderId: '701844819092',
  appId: '1:701844819092:web:39f38d92c7a27b11bb3881',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicons/android-chrome-192x192.png',
  })
});
