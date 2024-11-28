importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDSqNCgSK7mtkPYoDA2CaDfz8ubO97CjSU",
  authDomain: "fir-project-9e7eb.firebaseapp.com",
  databaseURL: "https://fir-project-9e7eb-default-rtdb.firebaseio.com",
  projectId: "fir-project-9e7eb",
  storageBucket: "fir-project-9e7eb.appspot.com",
  messagingSenderId: "1010234250070",
  appId: "1:1010234250070:web:1c1358c0581acdf60e3cf7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;


  self.registration.showNotification(notificationTitle, notificationBody);
});
self.addEventListener('push', function (event) {
  console.log('Received a push notification');

  // Extract data payload from the incoming message
  const notificationData = event.data.json();
  console.log('Notification data:', notificationData);

  // Handle the notification data as needed
  // For example, display a notification to the user
  const { title, body } = notificationData;
  self.registration.showNotification(title, {
    body: body,
    // Add other options as needed
  });
});