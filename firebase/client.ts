'use client';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyBKjhKaniQ5RGm3mgj1TEDBmK5Nzo0-OBE',
  authDomain: 'trpfrog-net-5ac1a.firebaseapp.com',
  projectId: 'trpfrog-net-5ac1a',
  storageBucket: 'trpfrog-net-5ac1a.appspot.com',
  messagingSenderId: '701844819092',
  appId: '1:701844819092:web:39f38d92c7a27b11bb3881',
  measurementId: 'G-2NBPGX905Q'
});


export async function requestNotificationPermission() {
  const firestore = getFirestore(app);
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.FCM_VAPID_KEY,
    });

    if (token) {
      console.log(`Notification token: ${token}`);
      await addDoc(collection(firestore, "notification"), { token: token });
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
}
