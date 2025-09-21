// Import the Firebase scripts for the v8 SDK
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrSuvTsTd_o9quBiyq-GHkXKU3nYJPp7c",
  authDomain: "parisbakerynotify.firebaseapp.com",
  projectId: "parisbakerynotify",
  storageBucket: "parisbakerynotify.firebasestorage.app",
  messagingSenderId: "356112603370",
  appId: "1:356112603370:web:36648e91bbe5b20f8b9f93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Optional: You can add this to handle messages when the app is in the background.
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/your-icon.png' // Optional: Add an icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
